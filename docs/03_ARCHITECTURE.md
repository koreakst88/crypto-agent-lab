# Architecture

This document describes the conceptual architecture of Crypto Agent Lab. It defines the responsibilities, boundaries, and relationships of the major components that participate in the processing of information and the formation, control, simulation, and evaluation of decisions.

The document establishes what each architectural layer is responsible for and what must remain outside that responsibility. It does not prescribe internal implementation. Its purpose is to preserve a shared understanding of the system as it evolves and to prevent responsibilities from becoming mixed, duplicated, or hidden.

## 1. Architectural Philosophy

Crypto Agent Lab follows a layered architecture. Information moves through a sequence of clearly separated stages, and each stage performs one distinct type of work. A layer receives an explicit input, applies only the responsibility assigned to it, and produces an explicit output for the next layer. This structure makes the path from external information to an observable result understandable from end to end.

Separation of responsibilities is the primary rule. Collection is separate from validation, analysis is separate from decision formation, strategy interpretation is separate from risk permission, and simulated execution is separate from performance evaluation. These distinctions are not merely organizational. They prevent one concern from silently influencing another and make it possible to assess the correctness of each stage on its own terms.

Boundaries are explicit. A component may rely on what another component promises to provide, but it may not rely on how that result is produced internally. Inputs, outputs, responsibilities, and prohibited behavior define the boundary. When a boundary is clear, a component can evolve without requiring unrelated components to change with it.

Modularity follows from these boundaries. Each layer is a replaceable and independently understandable unit of responsibility. Modularity does not mean dividing the system without reason. It means keeping together the behavior that belongs to one concern and keeping unrelated behavior outside it.

Explainability is an architectural property. The system must preserve enough context to show how information was transformed, which assessments contributed to a decision, how a strategy interpreted that decision, and why risk control allowed or rejected a proposed action. A result that cannot be traced through the pipeline is architecturally incomplete.

Reproducibility is equally fundamental. Given the same prepared information, the same declared conditions, and the same component behavior, the system should be able to produce a comparable result. Every layer must avoid hidden context that would make its output impossible to reconstruct or evaluate later.

The architecture evolves incrementally. New capability is introduced only when its responsibility and place in the existing flow are clear. Architectural growth must preserve established boundaries instead of weakening them for short-term convenience. A small extension that respects the model is preferred to a broad change that mixes concerns.

Interaction is contract-based. Layers communicate through defined expectations about the meaning of inputs and outputs. Contracts separate observable behavior from internal workings, support independent verification, and ensure that changes are deliberate. The architecture depends on these contracts rather than on informal knowledge about neighboring components.

## 2. High-Level Processing Pipeline

The system is organized around the following forward processing flow:

```text
External Data Sources
        ↓
Data Collection
        ↓
Validation & Normalization
        ↓
Storage
        ↓
Indicators & Features
        ↓
Analysis Agents
        ↓
Decision Engine
        ↓
Strategy Engine
        ↓
Risk Manager
        ↓
Paper Execution
        ↓
Performance Analytics
        ↓
Interfaces
```

The pipeline turns external observations into controlled, explainable, and measurable outcomes. It begins with information that originates outside the system. That information is collected without interpretation, checked and prepared into a consistent form, retained as a reliable record, and transformed into derived observations. Independent analysis then produces domain-specific assessments. Those assessments are aggregated into a coherent view, interpreted as a possible strategic action, evaluated against risk constraints, simulated, measured, and finally presented through interfaces.

Each layer performs exactly one type of responsibility. The pipeline is intentionally explicit about the difference between preparing information, interpreting information, deciding whether an opportunity exists, expressing a strategic response, granting permission under risk constraints, simulating execution, and evaluating results. Combining these responsibilities would make it difficult to determine why a result occurred or where an error entered the process.

The sequence also establishes the direction of authority. Earlier layers describe and prepare the state of the world. Middle layers assess and interpret that state. Later layers constrain, simulate, evaluate, and expose the result. No layer is permitted to assume the authority of a later layer or retroactively alter the output of an earlier one.

## 3. Layer Responsibilities

### 3.1 External Data Sources

**Purpose.** External Data Sources represent information produced outside Crypto Agent Lab. They are the origin of observations used by the rest of the pipeline and are treated as external facts with varying quality, availability, and reliability.

**Responsibility.** This layer makes external information available to the collection stage. Its responsibility ends at the boundary of the system. The architecture assumes that external information may be incomplete, delayed, inconsistent, duplicated, or temporarily unavailable.

**Expected input.** This layer does not receive pipeline input. Its inputs arise from external activity and conditions beyond the control of Crypto Agent Lab.

**Expected output.** It provides raw external observations together with whatever source context is available and relevant to their interpretation by the collection stage.

**Must not do.** External Data Sources must not be treated as validated, normalized, stored, analyzed, or approved for decision-making. Their information must not bypass collection and preparation stages or be presented as an internal conclusion.

### 3.2 Data Collection

**Purpose.** Data Collection brings external observations into the controlled processing flow. It creates a clear boundary between information originating outside the system and information accepted for internal preparation.

**Responsibility.** The layer acquires available observations, preserves their source context, identifies the collection occurrence, and passes the collected material forward without assigning analytical meaning to it. It records what was received rather than what the information is believed to imply.

**Expected input.** Raw observations and associated context from External Data Sources.

**Expected output.** Collected information represented in a form suitable for validation and normalization, with enough context to trace it back to its origin and collection conditions.

**Must not do.** Data Collection must not correct values based on assumptions, calculate indicators, assess market meaning, form decisions, apply strategy rules, or grant permission for action. It must not hide missing or failed collection as if valid information had been received.

### 3.3 Validation & Normalization

**Purpose.** Validation & Normalization establishes whether collected information is acceptable for further use and expresses acceptable information in a consistent conceptual form.

**Responsibility.** The layer evaluates completeness, consistency, ordering, duplication, and basic integrity according to declared expectations. It distinguishes accepted information from rejected or questionable information and normalizes representational differences without changing the underlying meaning.

**Expected input.** Collected information with source and collection context.

**Expected output.** Prepared market information with an explicit quality status, consistent representation, and preserved traceability to the collected input. Rejections and uncertainties remain visible rather than being silently discarded.

**Must not do.** Validation & Normalization must not infer missing facts without an explicit rule, produce analytical conclusions, create strategy signals, or decide whether an action should occur. It must not conceal quality problems to keep the pipeline moving.

### 3.4 Storage

**Purpose.** Storage preserves accepted information and the context required for later retrieval, reproducibility, comparison, and audit.

**Responsibility.** The layer retains prepared information faithfully, maintains its identity and ordering, and makes the retained record available to authorized downstream processing. It protects the distinction between original prepared observations and later derived results.

**Expected input.** Validated and normalized information together with its quality and provenance context.

**Expected output.** A stable, retrievable record of prepared information that can be supplied consistently to the next stage and used to reconstruct prior processing conditions.

**Must not do.** Storage must not reinterpret information, calculate derived meaning, choose what is favorable to an analysis, change previously accepted observations without traceability, or participate in decisions. Retention must not become a hidden source of business rules.

### 3.5 Indicators & Features

**Purpose.** Indicators & Features derives defined observations from prepared market information. It converts retained facts into consistent measurements that can support independent analysis.

**Responsibility.** The layer applies declared transformations to appropriate prepared information and produces derived observations with clear meaning and traceable inputs. It distinguishes direct observations from derived values and preserves the conditions under which each result was produced.

**Expected input.** Prepared market information retrieved from Storage, including the context necessary to interpret its quality and sequence.

**Expected output.** A consistent set of indicators and features, accompanied by sufficient context to identify their source information, meaning, and validity conditions.

**Must not do.** Indicators & Features must not determine whether the market is favorable, combine domain assessments, identify a trading opportunity, select a strategy, or approve an action. A derived measurement is evidence for analysis, not a decision.

### 3.6 Analysis Agents

**Purpose.** Analysis Agents independently assess prepared market information from distinct analytical domains. Together, they provide multiple bounded perspectives without blending responsibilities.

**Responsibility.** Each agent evaluates exactly one domain, uses the same prepared market information made available for the analysis occurrence, and returns a structured assessment. An assessment expresses the agent's conclusion, relevant evidence, confidence or uncertainty, and applicable limitations within its assigned domain.

**Expected input.** The common prepared market information, including relevant indicators, features, quality context, and analysis context.

**Expected output.** Independent structured assessments that can be compared and aggregated without requiring access to the agent's internal workings.

**Must not do.** Analysis Agents must not communicate directly with one another, modify another agent's assessment, aggregate the complete analytical picture, declare a trading opportunity, select a strategy, apply risk permission, or cause execution. They must not use hidden inputs unavailable to the shared analysis context.

### 3.7 Decision Engine

**Purpose.** The Decision Engine is the single aggregation point for independent analytical assessments. It determines what the combined evidence means at the decision level.

**Responsibility.** The layer receives structured assessments, evaluates their agreement, conflict, strength, uncertainty, and relevance, and forms an explainable decision about whether the analytical evidence supports a trading opportunity. It preserves the contribution of each assessment so that the decision can be traced and reviewed.

**Expected input.** The complete set of independent structured assessments produced for the same prepared market context.

**Expected output.** A structured decision that states whether an opportunity is supported, unsupported, or unresolved, together with the reasoning and uncertainty behind that conclusion.

**Must not do.** The Decision Engine must not perform the agents' domain analyses, define how an opportunity should be acted upon, grant permission to trade, simulate execution, or evaluate performance. It must not suppress conflicting evidence merely to produce a decisive result.

### 3.8 Strategy Engine

**Purpose.** The Strategy Engine translates an analytical opportunity into an intended course of action under declared strategic rules.

**Responsibility.** The layer interprets the Decision Engine's result and determines whether that result corresponds to a defined strategic response. It expresses the proposed action and the conditions that give the proposal meaning, while keeping the proposal separate from permission to proceed.

**Expected input.** An explainable decision from the Decision Engine, including its supporting context and uncertainty.

**Expected output.** A structured action proposal or an explicit determination that no strategic action applies. The output represents intent, not authorization.

**Must not do.** The Strategy Engine must not redo market analysis, alter the decision to fit a desired action, override uncertainty, grant risk permission, or execute the proposal. It must not treat the existence of an opportunity as automatic permission to act.

### 3.9 Risk Manager

**Purpose.** The Risk Manager is the mandatory permission boundary between a proposed action and simulated execution.

**Responsibility.** The layer evaluates the action proposal against explicit risk constraints and the relevant current context. It determines whether the proposal is permitted, rejected, or requires restriction. Its authority is protective: lack of sufficient information or a violated constraint results in refusal or limitation rather than assumption.

**Expected input.** A structured action proposal with its decision context, strategic conditions, and the information required to evaluate risk constraints.

**Expected output.** An explainable risk determination that either authorizes a bounded simulated action, restricts it within defined limits, or rejects it with a clear reason.

**Must not do.** The Risk Manager must not create opportunities, choose a strategy, improve a proposal to make it pass, perform execution, or alter earlier analytical conclusions. It must never be bypassed, and it must not infer permission from missing information.

### 3.10 Paper Execution

**Purpose.** Paper Execution simulates the handling of an action that has received explicit risk permission. It provides an observable outcome without treating the proposal itself as the result.

**Responsibility.** The layer accepts only authorized, bounded actions and simulates their execution under declared conditions. It records what was requested, what was permitted, what occurred in the simulation, and any difference between intended and simulated outcomes.

**Expected input.** An action proposal accompanied by explicit authorization and limits from the Risk Manager.

**Expected output.** A structured execution record describing the simulated outcome, status, timing context, and any relevant variance or failure.

**Must not do.** Paper Execution must not change the strategy, reinterpret the decision, relax risk limits, create authorization, or modify preceding records. It must not proceed when permission is absent, expired, ambiguous, or inconsistent with the proposed action.

### 3.11 Performance Analytics

**Purpose.** Performance Analytics evaluates the behavior and outcomes of the completed processing cycle over time.

**Responsibility.** The layer measures results, compares expectations with observed simulated outcomes, identifies patterns of stability or degradation, and produces evidence for review. It preserves the distinction between descriptive evaluation and authority to alter system behavior.

**Expected input.** Completed simulated execution records together with the related decisions, proposals, risk determinations, and relevant context needed for meaningful evaluation.

**Expected output.** Structured performance assessments that describe outcomes, quality, consistency, uncertainty, and observable changes over appropriate evaluation periods.

**Must not do.** Performance Analytics must not modify execution records, retroactively change decisions, tune strategy behavior during evaluation, grant permission for future actions, or directly control any preceding layer. Its findings inform review; they do not silently rewrite the pipeline.

### 3.12 Interfaces

**Purpose.** Interfaces expose information from the system and accept permitted external interactions at a controlled boundary.

**Responsibility.** The layer presents status, assessments, decisions, risk determinations, execution outcomes, and performance information in an understandable form. It conveys valid user intent to the appropriate boundary without taking over the responsibility of internal processing layers.

**Expected input.** Approved information and outcomes produced by the pipeline, together with permitted external requests that can be represented without embedding domain behavior in the interface.

**Expected output.** Clear representations of system state and results, plus properly conveyed user intent where interaction is allowed.

**Must not do.** Interfaces must not contain business logic, perform analysis, form decisions, apply strategy rules, grant risk permission, or execute actions. They must not bypass the pipeline or present an unverified intermediate result as a final conclusion.

## 4. Independent Analysis Agents

Analysis is divided among independent agents with deliberately narrow domains. Every agent analyses only one domain. This restriction keeps each assessment conceptually coherent and makes it possible to identify which kind of evidence produced a particular conclusion. An agent is not a smaller copy of the whole decision process; it is a specialist responsible for one bounded analytical perspective.

Agents never communicate directly. One agent cannot request another agent's opinion, modify another agent's context, or adapt its assessment in response to another assessment. Direct interaction would create order-dependent behavior, hidden influence, and conclusions that could not be attributed to a single analytical domain.

All agents receive the same prepared market information for a given analysis occurrence. The common input establishes a shared factual basis and prevents differences caused by inconsistent preparation or timing. An individual agent uses only the portion relevant to its responsibility, but it must not introduce hidden market information that is absent from the shared prepared context.

Each agent returns a structured assessment. The assessment expresses the conclusion within the assigned domain, the evidence that supports it, the level and source of uncertainty, and any condition that limits its interpretation. A structured assessment allows the rest of the architecture to reason about meaning without depending on how the agent reached the result internally.

The Decision Engine is the only aggregation point. It receives the independent assessments and is solely responsible for interpreting their combined meaning. No agent may aggregate the group, and no alternative path may combine selected assessments outside the Decision Engine. This guarantees that all analytical contributions are evaluated at one explicit boundary.

The arrangement improves maintainability because each agent can be understood, verified, and evolved within one domain. A change to one analytical responsibility does not require changes to peer agents, provided the shared contract remains satisfied. Failures and regressions can be isolated more readily because the source assessment remains identifiable.

It also improves explainability. The final decision can show which independent assessments supported it, which opposed it, and where uncertainty remained. The system avoids an opaque collective conclusion and instead preserves the chain from common prepared information, through separate domain judgments, to a single explicit aggregation step.

## 5. Contract-Based Interaction

Every layer has explicit inputs and produces explicit outputs. The contract at a boundary defines the meaning and expectations of that exchange: what kind of information is accepted, what guarantees accompany it, what result may be produced, and how uncertainty or failure is represented. The architecture depends on this declared behavior rather than on informal assumptions.

A layer never depends on another layer's internal implementation. It may depend only on the result promised at their shared boundary. This allows internal behavior to change without forcing consumers to change, as long as the observable meaning of the contract remains stable.

Communication occurs only through defined contracts. Shared hidden state, undocumented side effects, and direct access to internal workings violate the architectural boundary. If one layer needs additional information from another, that need must be examined and represented explicitly rather than satisfied through an exception.

Contracts also establish accountability. When an output does not meet expectations, the system can distinguish whether the producing layer violated its obligation, the consuming layer interpreted valid information incorrectly, or the contract itself is insufficient. Without an explicit boundary, these failures become blended and difficult to diagnose.

Contract changes are deliberate architectural changes. They require an identified need, an assessment of affected layers, and preservation of the responsibilities on both sides. A contract must not grow merely to expose internal convenience or allow one layer to perform work that belongs to another.

This document does not define the actual contracts. It establishes the principle that all interactions must be explicit, limited, interpretable, and independent of internal workings.

## 6. One-Way Data Flow

Information always moves forward through the architectural pipeline. Each layer receives the completed output of the preceding stage, performs its own responsibility, and passes a new result to the next stage. This creates a traceable progression from external observation to presented outcome.

Layers never bypass earlier stages. Raw external information cannot reach analysis without collection, validation, normalization, and retention. A strategic proposal cannot reach simulated execution without an explicit decision and risk determination. Convenience, urgency, or confidence in the source does not justify a shorter route.

No later layer modifies the authoritative output of an earlier layer. If later processing identifies a problem, it records a new finding or rejects the current progression. It does not rewrite history to make the pipeline appear consistent. Corrections enter through an explicit new processing occurrence with preserved traceability.

Interfaces never execute business logic. They expose information and convey permitted intent, while responsibility for interpretation and control remains within the appropriate layers. An interface cannot create a decision or grant permission simply because it is the point at which a user interacts with the system.

Execution never changes strategy. Paper Execution reports how an authorized proposal was simulated; it does not revise the proposal in response to conditions encountered during execution. Any difference between intent and outcome remains visible for evaluation rather than being hidden through strategic reinterpretation.

Analytics never changes execution. Performance Analytics observes completed records and produces assessments. It cannot revise outcomes, retry actions, or alter previous behavior to improve measured results. Findings may inform a later, separately governed change, but they do not flow backward as direct control.

Predictable forward flow reduces complexity by limiting the directions in which influence can travel. The source of a result can be traced through a stable sequence, failures can be localized to a boundary, and the number of possible interactions remains controlled. The architecture favors explicit new processing over backward mutation.

## 7. Decision Separation

The central decision path contains four independent responsibilities:

```text
Analysis Agents
        ↓
Decision Engine
        ↓
Strategy Engine
        ↓
Risk Manager
```

Analysis Agents describe what is observed within separate analytical domains. Their assessments may express supporting evidence, opposing evidence, uncertainty, or lack of sufficient information. They do not determine the combined meaning of all domains and do not propose an action.

The Decision Engine determines whether the combined analytical evidence supports a trading opportunity. It resolves the relationship among independent assessments without changing their content. Its conclusion concerns the existence and quality of an opportunity, not how to act on it.

The Strategy Engine determines whether a supported opportunity corresponds to a declared strategic response. It translates a decision into a proposed action with relevant conditions. A proposal is an expression of intended behavior, not authorization.

The Risk Manager determines whether the proposed action is permitted under explicit constraints and current relevant context. It may authorize, restrict, or reject the proposal. Its judgment concerns acceptable exposure and permission, not whether the analysis was persuasive or the strategy was desirable.

These responsibilities express a critical distinction:

```text
Market analysis ≠ Trading opportunity ≠ Permission to trade
```

Market analysis can be valid while the combined evidence does not support an opportunity. An opportunity can exist while no strategy applies. A strategy can propose an action while risk constraints deny permission. Keeping these outcomes separate prevents analytical confidence from being mistaken for operational authority and makes every refusal or progression explainable.

## 8. Event-Driven Processing

The architecture reacts to meaningful events rather than arbitrary commands that reach into internal layers. An event represents a completed fact relevant to the next stage, such as the arrival of new market data, completed validation, finished analysis, or completed execution.

Events advance work through established boundaries. New market data allows collection and preparation to begin. Completed validation makes accepted information eligible for retention and further processing. Finished analysis makes a complete set of assessments available to the Decision Engine. Completed execution makes an outcome available for performance evaluation.

An event announces that something has occurred; it does not transfer the responsibility of the emitting layer to the receiving layer. The receiving layer decides how to perform its own responsibility within its contract. This preserves separation while allowing the pipeline to progress in response to observable state changes.

Event-driven processing also makes incomplete and failed work explicit. A layer must not announce completion when its required result is absent or ambiguous. Failure, rejection, and insufficient information are meaningful outcomes and must remain distinguishable from successful completion.

The principle supports traceability because each processing step can be associated with the event that enabled it and the result it produced. It also prevents external commands from bypassing the pipeline by instructing a later layer to act without the required preceding outcomes.

This architectural principle does not prescribe how events are transported or represented. Its concern is the meaning of progression: work advances because a declared state transition has occurred, not because an uncontrolled instruction invokes behavior at an arbitrary point.

## 9. Architectural Constraints

Each layer has one responsibility. A layer may perform all behavior necessary to fulfill that responsibility, but it may not absorb the responsibility of a neighboring or distant layer. Convenience is not a sufficient reason to cross a boundary.

Dependencies must be explicit and limited to defined contracts. Hidden dependencies, shared implicit context, and assumptions about another layer's internal workings are not permitted. A required dependency that cannot be described clearly indicates an unresolved architectural problem.

Interfaces contain no business logic. They present results and convey permitted intent without performing analysis, decision formation, strategic interpretation, risk evaluation, execution, or analytics.

Analysis Agents do not communicate directly. They operate from the same prepared market information, return independent structured assessments, and rely on the Decision Engine as the only aggregation point.

The Risk Manager cannot be bypassed. No action reaches Paper Execution without an explicit risk determination for that action and context. Missing, ambiguous, or invalid permission is equivalent to no permission.

Later layers do not modify the outputs of previous layers. New facts may cause a new processing occurrence or a recorded rejection, but never a silent backward correction. Historical outputs remain traceable as they were produced.

Every important decision remains explainable. The system preserves the contributing information, assessment context, aggregation reasoning, strategic interpretation, risk determination, and observable outcome needed to understand the processing chain. Hidden reasoning is not an acceptable architectural shortcut.

The architecture evolves incrementally. Extensions must solve an identified need, respect current responsibilities, use defined boundaries, and remain reviewable as a bounded change. Broad restructuring is not justified when a compatible extension can satisfy the requirement.

These constraints apply even when crossing them appears to reduce immediate effort. Their purpose is to protect long-term predictability, maintainability, and the integrity of the decision process.

## 10. Future Evolution

The architecture is intentionally designed for extension. Future capability may be introduced through new modules that occupy a clearly justified responsibility and interact through established contracts. Extension should add a bounded capability without changing the meaning of existing responsibilities.

An existing layer may evolve internally as long as it continues to honor its contract and architectural role. Consumers should not need to understand or adapt to internal changes that do not alter the promised input, output, or meaning. This preserves independent evolution and limits the effect of change.

When a future need cannot be satisfied within an existing responsibility, the architecture may introduce a new module at an appropriate boundary. The new module must have a distinct purpose, explicit inputs and outputs, and a defined place in the one-way flow. It must not become a general exception that bypasses established layers.

Existing boundaries should not be weakened to accelerate an extension. In particular, new capability must preserve independent analysis, single-point aggregation, separation of decision and permission, mandatory risk control, immutable prior outcomes, and the absence of business logic in interfaces.

Contract evolution must be deliberate and compatible with the responsibilities on both sides. Where a contract must change, the change should be limited to the identified need and should not expose internal workings. Established consumers and producers should retain their conceptual independence.

Incremental evolution allows the architecture to grow while remaining understandable. Each extension can be evaluated by the same questions: what responsibility it owns, what information it accepts, what result it produces, which boundaries it respects, and how its behavior remains explainable and reproducible.

The long-term objective is not to preserve every current form unchanged. It is to preserve the architectural meaning of the system while allowing its capabilities to mature. Evolution is successful when the platform gains capability without breaking the clarity, direction, or accountability of the existing processing flow.
