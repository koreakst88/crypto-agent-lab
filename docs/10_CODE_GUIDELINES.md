# Code Guidelines

## 1. Purpose

This document defines the shared rules for writing and reviewing code in Crypto Agent Lab. It converts the project's approved engineering principles into practical expectations that apply to every future change.

The guidelines exist to keep the codebase understandable, predictable, and maintainable as its capabilities grow. They establish a common standard across contributors and reduce local conventions that could weaken domain meaning or architectural boundaries.

These rules do not replace PROJECT_VISION, ARCHITECTURE, DOMAIN_MODEL, CONTRACTS, or DEVELOPMENT_RULES. Those documents remain authoritative for project direction, responsibilities, concepts, obligations, and engineering culture. If this document appears to conflict with a governing document, the governing document takes precedence and this document must be corrected.

Every contributor is expected to apply these guidelines while designing, implementing, reviewing, and refactoring changes. Completion includes conformance to these rules, not only successful compilation or visible behavior.

## 2. General Principles

Simplicity is preferred to excessive flexibility. Code should solve the current confirmed requirement with the least complexity necessary to preserve correctness and approved boundaries. Possible future needs do not justify additional abstractions, configuration, or extension points by themselves.

Explicit code is preferred to implicit behavior. Inputs, outputs, state transitions, failures, assumptions, and authority boundaries should be visible from the relevant types and control flow. A reader should not need hidden context to understand why a result is produced.

Coupling must be minimized. A component should depend on the smallest stable public surface required by its responsibility. Knowledge of another component's internal structure, naming, or construction choices is prohibited.

Composition is preferred to inheritance. Behavior should be assembled from independently understandable responsibilities rather than organized through deep or speculative hierarchies. Inheritance is acceptable only when the relationship is genuine, stable, and clearer than composition.

Abstractions are introduced only after a repeated and meaningful concept is understood. Similar-looking code is not automatically the same concept. Premature abstraction can hide important differences and create a dependency before its responsibility is clear.

Every addition must have a reason. A new type, file, abstraction, dependency, or behavior must address an identified requirement. Code is not added because it might be useful later.

Correctness and explainability take precedence over brevity. Short code is not simpler when it hides domain meaning, combines responsibilities, or makes failure behavior difficult to follow.

Uncertainty and partial outcomes must remain explicit. Missing information must not be replaced with convenient defaults, and an incomplete result must not be presented as complete.

## 3. Simplicity Rule

Before adding a new type, abstraction, interface, dependency, or helper, first determine whether the requirement can be satisfied by removing unnecessary code, simplifying an existing concept, or extending an existing responsibility without weakening its boundary.

Deletion is preferred over addition whenever it preserves correctness, contract compatibility, domain meaning, and clarity. A smaller solution has fewer assumptions, dependencies, and long-term maintenance obligations.

Extending existing code is appropriate only when the new requirement belongs to the same established responsibility. This rule must not be used to turn a focused module or abstraction into a container for unrelated behavior.

If addition remains necessary, its purpose must be explicit and its scope must be the smallest that fully satisfies the confirmed requirement.

## 4. Module Boundaries

Every module has one public entry point: `index.ts`. External consumers import only names exported from that entry point. A module's public surface must be intentional, minimal, and limited to concepts that other modules are allowed to use.

Importing an internal file from another module is prohibited. A path that reaches past another module's `index.ts` creates hidden coupling even when the imported declaration is exported from its original file.

Each module owns one architectural responsibility. Its contract, types, implementation, and internal support code must remain within that responsibility. Convenience does not justify performing work assigned to another layer.

Internal files are private to the module. They may change without affecting consumers as long as the public contract remains satisfied. Internal names must not become dependencies through indirect access or duplicated declarations.

A module may re-export an existing shared type to preserve a stable public contract, but it must not redeclare that type. The canonical declaration remains in its shared location.

Public exports must not expose internal construction details. Export only what a consumer needs to interact with the module's approved responsibility. An exported declaration is a compatibility commitment and should be treated accordingly.

Empty modules remain empty until their architectural stage begins. Placeholder behavior, speculative types, and unused abstractions must not be added merely to make a module appear complete.

## 5. Type Rules

Existing types must be reused before new types are created. Contributors must search the relevant module, `core/domain`, `core/contracts`, and `core/result` before introducing a declaration.

Duplicate types are prohibited. Two declarations with equivalent domain meaning create ambiguity even when their structures happen to match. The shared concept must have one canonical declaration.

General domain concepts belong in `core/domain`. A type belongs there when its meaning is defined by the Domain Model and it is useful across multiple modules without depending on one module's responsibility.

Cross-cutting contract concepts belong in `core/contracts` only when they genuinely govern more than one module boundary. Module-specific request, output, status, limitation, and failure types remain within the owning module.

Types should be immutable by default. Use `readonly` for properties and collections whenever mutation is not an explicit and justified part of the responsibility. A consumer should not be able to change historical input or output accidentally.

Use discriminated unions when variants have different meanings, required data, or authority. Discriminants must make valid states clear and allow exhaustive reasoning. Do not use a broad object with optional properties to represent mutually exclusive outcomes.

Generic types are used when a concept is stable but its payload varies legitimately. A generic parameter must represent a meaningful variation, not uncertainty about the design. Excessive generic parameters should be reduced when they make the contract harder to understand.

Do not use `any`. It removes guarantees at the exact boundary where clarity is required. When the shape of a value is not yet established, the owning contract must define the needed constraint before the value is used.

Avoid unsafe assertions. An assertion does not validate a value and must not be used to bypass an unresolved type mismatch. Correct the source type, narrow through explicit evidence, or refine the contract.

Names must reflect domain meaning rather than incidental representation. A structurally convenient type must not be presented as a domain concept unless it satisfies the approved Domain Model meaning.

## 6. Contract Rules

Every module begins with a contract before operational behavior is added. The contract defines responsibility, accepted input, produced output, preconditions, guarantees, postconditions, failure conditions, forbidden responsibilities, and related domain concepts.

An implementation must satisfy its contract exactly. It may be narrower internally, but it must not weaken guarantees, hide failures, expand authority, or change the meaning of accepted input and produced output.

Contracts are expressed through explicit, strictly typed boundaries. Consumers depend on the contract and not on a particular implementation. An implementation-specific detail must not leak into the public contract unless the approved requirement genuinely changes.

Failure behavior is part of the contract. A component must distinguish an operational failure from a valid negative, absent, partial, unsupported, rejected, or unresolved outcome.

Contracts change only when requirements change. Refactoring, implementation convenience, or local difficulty does not justify modifying a contract. A contract change requires review of affected consumers, architectural boundaries, compatibility, and governing documentation.

No implementation may silently add authority. Analysis cannot become Decision, Decision cannot become Strategy, Strategy cannot become permission, and Execution cannot revise earlier history.

Minimal unavailable implementations must report their state honestly. They return an explicit typed failure without fabricated data and without pretending that the contract's substantive responsibility has been completed.

## 7. Architecture Decision Rule

Create a new Architecture Decision Record when a decision:

- changes architectural boundaries;
- introduces a new shared abstraction;
- affects multiple modules;
- changes dependency direction;
- introduces a new project-wide convention;
- changes public contracts.

The record must preserve the decision's context, considered alternatives, rationale, consequences, and relationship to existing decisions. Approval follows the lifecycle defined by the engineering decision log.

Implementation details, bug fixes, behavior-preserving refactoring, and local optimizations do not require an Architecture Decision Record when they have no architectural impact.

When the impact is uncertain, evaluate whether future contributors would need the reasoning to understand a boundary, shared concept, dependency, convention, or public commitment. If they would, the decision should be recorded.

## 8. Result Rules

Operations that can succeed, fail, return no value, or return a partial value use the shared `Result` model. Module-specific result types specialize the shared model rather than reproduce its outcome structure.

Exceptions are not the primary mechanism for expected control flow. Expected inability to fulfill a contract is represented as a typed failure result. Callers must be able to reason about that outcome from the declared return type.

Successful and unsuccessful outcomes must be explicit. A missing value, empty collection, false-like value, or absent side effect must not be used as an undocumented failure signal.

Failure reasons are typed and meaningful within the owning contract. They must identify why the operation could not fulfill its responsibility without claiming authority from another layer.

Valid negative outcomes remain distinct from failures. An unresolved Decision, unavailable Indicator, rejected permission, or inconclusive research finding may be a correct domain result when the contract was fulfilled.

Partial results must be marked as partial. They must preserve the available value and the reason or limitation that prevents completeness. A partial result cannot satisfy a precondition that requires a complete result.

Uncertainty belongs in the domain payload where its meaning is defined. The shared `Result` indicates operational outcome and value state; it must not be used to erase or replace domain uncertainty.

Result handling must preserve source context and failure information. A later layer must not convert failure or uncertainty into apparent success merely to continue processing.

## 9. Dependency Rules

Circular dependencies are prohibited. A dependency cycle makes ownership unclear and prevents independent evolution. When a cycle appears, responsibilities or shared concepts must be reconsidered rather than hidden through indirect imports.

Each architectural layer may know only the approved shared core and the public contract of the immediately preceding layer when that dependency is required by the pipeline. It must not import from later layers or bypass an intermediate responsibility.

Allowed shared dependencies are limited to approved locations such as `core/domain`, `core/contracts`, `core/result`, and narrowly justified shared definitions. Shared placement is not a shortcut for unrelated convenience code.

Imports from another module must resolve through that module's `index.ts`. Direct imports from its contract file, result file, implementation file, or other internal path are forbidden.

Type-only dependencies should use type-only imports. This makes the dependency's purpose explicit and avoids creating runtime coupling where only compile-time meaning is needed.

Implementations depend on contracts, not on other implementations. A module must not require a concrete class from another layer when the approved contract is sufficient.

External dependencies require an identified need and explicit approval. A dependency must not be introduced for convenience when the requirement can be met clearly with the project foundation.

## 10. Refactoring Rules

Refactoring must not change observable behavior. Inputs, outputs, failure reasons, authority, side effects, and public contracts remain stable unless the task explicitly authorizes a behavioral change.

Compatibility must be preserved. Public exports and established type meanings remain available to existing consumers. If a type moves to a canonical shared location, the previous public module may re-export it where compatibility requires.

Before creating a new type, search for an existing domain or contract concept. A new declaration is justified only when it represents a meaning that does not already exist.

Refactoring should reduce complexity, coupling, duplication, or ambiguity. Moving code without improving one of these qualities is not sufficient justification.

Make refactoring changes small and reviewable. Avoid mixing structural cleanup with new behavior. Separate changes make it possible to verify that behavior remained unchanged.

After refactoring, compile the complete project and review dependency paths. Successful compilation alone does not prove that module boundaries remain correct.

Documentation is updated only when conceptual meaning or an approved rule changes. A behavior-preserving internal refactor should not rewrite authoritative documents to match incidental code organization.

## 11. Naming Rules

Names must be explicit and describe responsibility. A reader should understand whether a declaration represents a request, result, output, status, failure reason, contract, or implementation from its name.

Avoid abbreviations unless they are established domain language and cannot be misunderstood. Saving characters is not a reason to reduce clarity.

Use the canonical terminology from DOMAIN_MODEL and CONTRACTS. Do not introduce synonyms for established concepts in public declarations.

Contract names end with `Contract`. Request and result boundaries use `Request` and `Result`. Produced domain payloads may use `Output` when that distinguishes them from the operational Result wrapper.

An unavailable minimal implementation should be named according to its honest behavior. Its name must not imply that substantive processing occurs when it only reports unavailability.

File names should match the primary declaration or responsibility they contain. A file should not become a miscellaneous container for unrelated declarations.

Boolean names, when needed, should express a clear proposition. Status variants should use domain language and must not overlap in meaning.

## 12. No TODO Rule

TODO comments are prohibited. They create undocumented future obligations without scope, ownership, validation criteria, or an approved place in project evolution.

Future work belongs in the appropriate governing process:

- ROADMAP for approved future evolution and dependency order;
- DECISIONS for significant architectural or engineering choices;
- RESEARCH & IDEAS JOURNAL for unvalidated concepts and open investigation.

Production code must describe current behavior and current constraints. It must not contain informal promises that something may be completed, corrected, or reconsidered later.

If unfinished work is required for the current scope, the work remains incomplete. It is not made acceptable by leaving a TODO comment.

## 13. Project Workflow

The recommended development cycle is:

```text
Feature
  ↓
Review
  ↓
Refactor
  ↓
Commit
```

### Feature

Feature means one bounded, complete change that satisfies an approved requirement. The change begins from the relevant domain concept and contract, respects the current architectural stage, and introduces no unrelated capability.

The feature step includes the smallest necessary types, contract updates when explicitly authorized, implementation, and verification. Incomplete work is not advanced merely because its central path exists.

### Review

Review verifies correctness, contract conformance, domain terminology, dependency direction, failure behavior, simplicity, and compilation. It examines both what the change does and what authority it must not acquire.

Review findings are resolved before the change proceeds. A review is not complete while known architectural or typing concerns remain open inside the agreed scope.

### Refactor

Refactor improves the completed behavior without changing it. This step removes duplication, clarifies names, reduces coupling, simplifies types, and confirms that shared concepts are placed correctly.

Refactoring follows review because a working bounded result provides a stable baseline. It remains separate from adding more capability.

### Commit

Commit records one coherent and verified change. The committed state must compile, contain no unrelated modifications, and be understandable from its scope and description.

A commit is not a storage point for unfinished work. It represents a complete engineering step that another contributor can review and build upon safely.

## 14. Code Review Checklist

The following checklist is mandatory after every new implementation and significant refactor:

- [ ] Does the change satisfy one clearly stated responsibility?
- [ ] Does the code conform to the relevant CONTRACTS obligations?
- [ ] Does the code use DOMAIN_MODEL terminology consistently?
- [ ] Are module boundaries preserved?
- [ ] Do cross-module imports use only public `index.ts` exports?
- [ ] Does the layer depend only on approved core locations and the required preceding public contract?
- [ ] Are circular or backward dependencies absent?
- [ ] Are existing types reused instead of duplicated?
- [ ] Are shared concepts located in the correct core area?
- [ ] Are module-specific types kept inside their owning module?
- [ ] Are properties and collections `readonly` where mutation is unnecessary?
- [ ] Is `any` absent?
- [ ] Are unsafe assertions absent or explicitly justified?
- [ ] Are success, failure, absence, and partial values represented explicitly?
- [ ] Are failure reasons typed and explainable?
- [ ] Is uncertainty preserved rather than hidden?
- [ ] Does the implementation avoid fabricated data and silent defaults?
- [ ] Can the solution be made simpler without weakening correctness?
- [ ] Was deletion or simplification considered before adding new code?
- [ ] Are abstractions limited to demonstrated needs?
- [ ] Are hidden dependencies and implementation leaks absent?
- [ ] Does any architectural impact require a new Architecture Decision Record?
- [ ] Are TODO comments absent?
- [ ] Has behavior remained unchanged when the task is a refactor?
- [ ] Are public exports compatible with existing consumers?
- [ ] Is unrelated work absent from the change?
- [ ] Does the complete project compile successfully?
- [ ] Does the root project behavior remain unchanged unless explicitly required?
- [ ] Is documentation still consistent with the resulting code?

A failed checklist item blocks completion unless the governing task explicitly authorizes the deviation and the reason is documented.

## 15. Closing

These guidelines define the default coding standard for Crypto Agent Lab. Future tasks should apply them together with the approved domain, architecture, contracts, and development rules.

The document is living and may be refined as the project develops. Changes should clarify proven needs, preserve compatibility with governing documents, and avoid reacting to temporary convenience.

The standard remains constant in intent: code should be explicit, minimal, correctly bounded, strictly typed, explainable, and safe for future contributors to extend.
