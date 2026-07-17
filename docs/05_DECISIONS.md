# Engineering Decisions

Important engineering decisions must remain understandable long after they are made. A decision that appears obvious in its original context can become unclear when assumptions change, contributors move on, or later work exposes consequences that were not initially visible.

This document is the permanent engineering decision log for Crypto Agent Lab. Every major architectural or engineering decision should be recorded with enough context to explain why it was made, which meaningful alternatives were considered, and what consequences follow from the chosen direction.

The log preserves reasoning rather than activity. It is not a changelog, meeting record, roadmap, or description of implementation. Routine changes do not belong here unless they establish or alter a durable rule, boundary, responsibility, or constraint that affects future engineering work.

## 1. Decision Philosophy

Engineering decisions shape more than the immediate change that follows them. They determine which assumptions become shared, which boundaries future work must respect, and which trade-offs the project accepts. Recording only the final choice removes the reasoning needed to judge whether that choice remains appropriate later.

The first purpose of decision documentation is to preserve reasoning. A useful record explains the problem as it was understood, the conditions that influenced the choice, the alternatives that were seriously considered, and the consequences the team knowingly accepted. This makes the decision intelligible without requiring access to the original discussion or the people who participated in it.

Preserved reasoning reduces repeated discussions. A question may return when a new contributor encounters an established constraint or when a familiar alternative appears attractive again. The decision log should make clear whether the subject has already been examined, what evidence mattered at the time, and which facts would need to change before reconsideration becomes useful. The goal is not to prevent discussion, but to ensure that new discussion begins from accumulated knowledge rather than from a blank state.

Decision records make assumptions explicit. Every significant choice rests on beliefs about the problem, expected behavior, uncertainty, and acceptable trade-offs. Assumptions that remain implicit are difficult to validate and easy to forget. When they are recorded, future contributors can determine whether the original conditions still hold and whether new evidence affects the validity of the decision.

The log supports contributors who were not present when a choice was made. A project should not depend on oral history or individual memory to explain why an important boundary exists. A well-formed record allows a contributor to understand the intent of the decision, work within it confidently, and identify when a proposed change would contradict it.

Decision documentation also enables informed revision. A decision can be changed responsibly only when the team understands what it is replacing and why the original choice was reasonable. The record provides a baseline against which new evidence, changed constraints, and new alternatives can be assessed. Without that baseline, revision risks becoming a reaction to temporary inconvenience.

A decision may evolve, but its history remains visible. An approved record is not rewritten to make the past appear consistent with the present. If a later decision changes or replaces it, the original record retains its original context, choice, and consequences, while its status and relationship to the replacement are made explicit. This preserves the causal history of the project.

The level of detail should match the significance of the decision. A broad architectural constraint requires enough context to support long-term understanding. A narrower engineering rule may need less explanation. In both cases, the record should contain only information that helps a future reader understand the choice and its implications. Length alone does not make a decision well documented.

The decision log is authoritative for recorded decisions. When current practice appears inconsistent with an approved decision, the inconsistency must be investigated. The appropriate response is either to restore alignment or to revise the decision through the defined lifecycle. Silent divergence is not an acceptable form of evolution.

## 2. Decision Record Format

Every future decision record follows a common structure. Consistent records make decisions easier to compare, review, reference, and revise. The format separates the problem from the choice and the choice from its consequences, preventing the record from becoming a retrospective justification without visible alternatives.

The standard record contains the following fields.

### ID

The ID is the permanent identifier of the decision. It allows the record to be referenced unambiguously from documentation, reviews, and related decisions. Once assigned, an ID is never reused, even if the decision is later deprecated or superseded. The identifier preserves continuity across the full history of the project.

An ID establishes identity, not importance or execution order. Its sequence indicates the order in which records were created, not priority, dependency, or architectural position.

### Title

The title is a concise statement of the subject or chosen direction. It should allow a reader to recognize the decision without reading the complete record. A title names the decision rather than describing the work required to carry it out.

The title should remain accurate throughout the decision's lifecycle. If the proposed decision changes so substantially during review that the original title becomes misleading, the record should be corrected before approval.

### Status

The status identifies the current lifecycle state of the decision. It shows whether the record is being considered, reviewed, approved, put into effect, deprecated, or replaced. Status prevents a proposal from being mistaken for an active rule and makes the authority of the record clear.

Status changes are explicit. A record does not become approved through informal agreement, and it does not become obsolete merely because current work no longer follows it. The lifecycle described later in this document governs status transitions.

### Date

The date records when the decision entered its current significant state, normally when it was proposed or approved according to the team's recording convention. It provides temporal context for the evidence, assumptions, and constraints described in the record.

The date should not be used as a substitute for decision history. When later events revise the status or meaning of a record, those changes should remain visible through explicit relationships and recorded transitions rather than by replacing the original context.

### Context

The context defines the problem that requires a decision. It describes the relevant conditions, constraints, known facts, uncertainty, and forces that make the choice significant. A reader should be able to understand why leaving the question unresolved would affect the project.

Context must not be written to make the chosen answer appear inevitable. It should fairly represent the situation at the time of the decision, including important limitations in available evidence. The context describes the problem; it does not conceal the choice inside the problem statement.

### Decision

The decision states the chosen direction precisely. It defines what the project will treat as the governing rule, boundary, or approach. The statement should be specific enough to guide future work and to identify when a later proposal conflicts with it.

The decision describes the outcome of reasoning, not implementation activity. It should avoid unrelated detail and remain limited to the scope established by the context.

### Alternatives Considered

This field records the meaningful alternatives that received serious consideration. For each alternative, the record should explain why it was not selected under the conditions that existed at the time. The purpose is to preserve the comparison, not to create an exhaustive list of every imaginable option.

An alternative should be represented fairly. Dismissing an option through a weak description makes the reasoning less trustworthy and gives future readers little help when the same option returns under different conditions. The option of making no change should be included when it was a genuine alternative.

### Consequences

Consequences describe what becomes true because of the decision. They include intended benefits, accepted limitations, new obligations, constraints placed on future work, and meaningful risks. A decision record is incomplete if it describes only positive effects.

Consequences are not predictions presented as certainty. Where an effect is expected but not yet validated, the record should identify it as an expectation. When later evidence reveals an important consequence that was not initially known, that knowledge should be preserved without rewriting the original reasoning.

### Related Decisions

This field identifies decisions that depend on, constrain, refine, deprecate, or supersede the current record. It makes the relationships among durable choices visible and prevents each record from being interpreted in isolation.

A decision with no known relationship may state that explicitly. When a later decision changes the authority or interpretation of an earlier one, both records should make the relationship clear.

### Standard Template

Future records use the following conceptual template. The template defines the information to capture and does not represent a decision itself.

```text
ID:
Title:
Status:
Date:

Context:

Decision:

Alternatives Considered:

Consequences:

Related Decisions:
```

Fields should be completed with sufficient detail to support independent understanding. A field should not be omitted merely because the answer appears obvious to current contributors. If information is genuinely unavailable or not applicable, the record should state that directly rather than leaving ambiguity.

## 3. Initial Approved Decisions

The following records capture the three architectural decisions already approved for Crypto Agent Lab. Their scope is intentionally limited to the principles established in the approved architecture. They do not define implementation or introduce additional decisions.

### ADR-001 — Pipeline-Based Processing Architecture

**Status:** Approved

Crypto Agent Lab processes information through a defined, one-way pipeline. Each stage receives the explicit result of the preceding stage, performs its assigned responsibility, and passes an explicit result forward. Earlier stages prepare and describe information; later stages interpret, control, simulate, evaluate, and present outcomes according to their separate responsibilities.

This decision preserves a predictable processing order and prevents later responsibilities from bypassing required foundations. Layers do not modify the authoritative outputs of previous layers. The pipeline makes the origin of a result traceable and limits the directions in which influence can travel.

### ADR-002 — Independent Analysis Agents

**Status:** Approved

Each analysis agent evaluates exactly one analytical domain. All agents receive the same prepared market information for a given analysis occurrence, operate independently, and produce structured assessments that preserve their evidence, uncertainty, and limitations.

Analysis agents do not communicate directly and do not aggregate one another's conclusions. The Decision Engine is the only aggregation point. This decision keeps analytical responsibilities isolated, prevents hidden influence among agents, and allows a final decision to remain explainable in terms of its independent contributing assessments.

### ADR-003 — Contract-Driven Layered Architecture

**Status:** Approved

Crypto Agent Lab is organized as layers with explicit responsibilities and boundaries. Every layer accepts explicit inputs, produces explicit outputs, and interacts with other layers only through defined contracts. A layer depends on the meaning promised at a boundary rather than on the internal workings of another layer.

This decision preserves separation of responsibilities and supports independent evolution and validation. Contracts make dependencies visible, prevent hidden coupling, and allow changes within one layer without requiring unrelated layers to understand those changes, provided the established boundary remains satisfied.

## 4. Decision Lifecycle

A decision moves through explicit states. The lifecycle distinguishes an idea under consideration from an approved rule and preserves the status of decisions whose role changes over time.

```text
Proposed
    ↓
Under Review
    ↓
Approved
    ↓
Implemented
    ↓
Deprecated (optional)
    ↓
Superseded (optional)
```

The final two states are optional and express different forms of later change. A decision may remain implemented indefinitely, may become discouraged while still relevant to existing work, or may be explicitly replaced by another decision.

### Proposed

A Proposed decision has been recorded because a significant engineering question requires resolution. Its context and initial direction are sufficiently clear to support discussion, but the record has no authority over project work. Alternatives, consequences, and assumptions may still be incomplete.

Proposal creates a place for structured reasoning. It does not imply endorsement. Work that would make the proposal difficult to reverse should not rely on it as if approval were guaranteed.

### Under Review

Under Review means the record is complete enough for substantive evaluation. Review examines whether the problem is correctly framed, relevant evidence is represented, alternatives are treated fairly, consequences are understood, and the proposed choice is consistent with approved architecture and engineering principles.

During review, the record may be refined. Material changes to context or decision should remain visible to reviewers and may require renewed evaluation. A decision remains non-authoritative until review concludes with explicit approval.

### Approved

Approved means the decision has passed review and is accepted as the governing direction for its stated scope. Future work must respect it unless a new decision explicitly revises or replaces it.

Approval confirms the quality of the reasoning available at that time; it does not claim that the decision can never be wrong. Assumptions and expected consequences continue to be observable and may later provide grounds for revision.

### Implemented

Implemented means the approved decision is reflected in the actual state and behavior of the project within its agreed scope. This status distinguishes agreement about direction from completion of the work needed to make that direction real.

Moving to Implemented requires evidence that the decision has been applied consistently and that related documentation remains aligned. The status does not imply that every possible extension of the decision is complete.

### Deprecated

Deprecated is an optional state for a decision that remains part of the existing project but is no longer preferred for new work. Deprecation requires an explicit reason and clear guidance about the scope in which the decision still applies.

A deprecated decision is not erased or silently ignored. Its constraints remain authoritative where they still govern existing behavior until an approved replacement or removal resolves them.

### Superseded

Superseded is an optional state indicating that another approved decision has explicitly replaced this decision. The original record remains unchanged as historical context, while its status and Related Decisions field identify the replacement.

The superseding record must explain the problem with the previous direction, the evidence for change, and the consequences of replacement. Supersession is a traceable transition, not a deletion of history.

Not every decision will pass through Deprecated before Superseded. The appropriate path depends on whether the earlier decision remains temporarily valid for some scope or is directly replaced as a governing rule.

## 5. Revising Decisions

Engineering decisions are durable, but they are not immutable. A decision represents the best justified direction under a specific set of facts, assumptions, and constraints. When those conditions materially change or evidence shows that the decision no longer serves its purpose, revision may be necessary.

Revision begins with an identified problem. Temporary inconvenience, personal preference, or the attraction of a different approach is not sufficient. The problem should describe where the existing decision fails, which assumption is no longer valid, which consequence has become unacceptable, or which new constraint requires reconsideration.

The reason for revision is documented. The new record must connect current evidence to the limitation of the existing decision and explain why the issue cannot be addressed while keeping the original direction. This creates a clear distinction between improvement within an approved decision and replacement of the decision itself.

Revision requires review. The proposed replacement is assessed against the same standards as an original decision, with additional attention to existing dependencies and transition consequences. The team must understand what current work relies on the old decision and how the new direction affects those commitments.

Replacement is explicit. The new record identifies the earlier decision it supersedes or deprecates, and the earlier record identifies the new one through its status and relationship. There must be no period in which readers must infer which of two conflicting records is authoritative.

Old decisions remain part of project history. Their original context, alternatives, choice, and consequences are preserved. They explain why the project took its earlier form and help future contributors avoid judging past work using information that was not available at the time.

Revision should not rewrite the old record to match current understanding. If later evidence reveals an unexpected consequence, that evidence belongs in the revising decision or an explicitly associated note. Preserving the original reasoning is necessary for an honest and useful history.

When a proposed revision does not pass review, the existing approved decision remains authoritative. The rejected proposal may be retained when its reasoning is valuable, but its status must make clear that it did not replace the approved direction.

## 6. Principles for Good Decisions

A good engineering decision is evidence-based. It distinguishes known facts from assumptions, identifies uncertainty, and uses the best relevant information available at the time. Evidence does not need to eliminate uncertainty, but the record must not present confidence or preference as proof.

A good decision has limited scope. It resolves the identified problem without establishing unrelated rules or predicting needs that have not been demonstrated. Limited scope makes consequences easier to understand and allows later decisions to address new problems without undoing an unnecessarily broad commitment.

A good decision is explainable. A contributor who did not participate in the original discussion should be able to understand the context, reasoning, choice, and trade-offs from the record. Explainability requires clear language and an honest account of uncertainty and negative consequences.

A good decision is reviewable. Its claim is precise enough to evaluate, its assumptions can be examined, and its relationship to existing principles is visible. A statement that is too vague to disagree with cannot provide useful engineering direction.

A good decision is consistent with the approved architecture. It preserves established responsibilities, explicit boundaries, contract-based interaction, one-way flow, explainability, and reproducibility. A decision that changes one of these principles must identify itself as an architectural revision and follow the corresponding level of review.

A good decision avoids unnecessary complexity. It chooses the simplest direction that adequately addresses the current problem and known constraints. Flexibility, generality, and optimization are not benefits when their need cannot be demonstrated. Any added complexity should have an explicit purpose and a proportionate value.

A good decision treats alternatives fairly. It does not weaken competing options to make the selected choice appear inevitable. The record acknowledges where an alternative may be stronger and explains why the chosen trade-off is still appropriate for the project's current conditions.

A good decision makes consequences visible. Benefits, costs, constraints, risks, and future obligations belong in the same record. A decision that lists only advantages is advocacy rather than engineering reasoning.

A good decision can be revised without losing history. Its scope, assumptions, and relationships are clear enough for a later contributor to determine what new evidence would justify change. Durability comes from explicit reasoning, not from presenting a choice as permanent.

The quality of a decision is judged by the clarity and discipline of its reasoning, not only by whether later events produce the expected outcome. A well-reasoned decision may need revision as conditions change. A favorable outcome does not make undocumented or accidental reasoning acceptable.
