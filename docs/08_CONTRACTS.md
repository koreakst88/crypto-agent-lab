# System Contracts

A contract defines what one layer may expect from another without depending on that layer's internal implementation. It states the responsibility accepted at a boundary, the domain information that may cross that boundary, the result that must be produced, and the conditions under which the obligation can or cannot be fulfilled.

Contracts protect the architectural boundaries of Crypto Agent Lab. They prevent a layer from gaining hidden authority, make failure behavior visible, and allow components to evolve independently while preserving stable domain meaning. Internal implementation may change, but the obligations described here remain authoritative until they are deliberately revised.

This document describes conceptual contracts. It does not prescribe technical representations, internal design, or construction choices.

## 1. Purpose of Contracts

Explicit contracts create stable boundaries between responsibilities. A producing layer knows what result it must provide, and a consuming layer knows what it may rely on. Neither side needs private knowledge about how the other performs its work.

Stable boundaries support independent implementation. A component may change internally without forcing unrelated components to change, provided its accepted input, produced output, guarantees, failure behavior, and authority remain consistent with the contract.

Contracts make behavior predictable. They define not only the successful path but also partial results, uncertainty, rejection, and failure. Predictability means that consumers can distinguish a valid result, a valid absence of a result, and a failure to fulfill the contract.

Explicit obligations improve testability. A contract provides observable expectations against which a component can be evaluated without examining its internal workings. Verification can focus on whether preconditions are respected, guarantees hold, outputs retain their meaning, and prohibited responsibilities remain absent.

Contracts enable controlled failure. Failure is not an unspecified exception to normal behavior; it is part of the boundary. A layer must report when it cannot meet its obligation, preserve available context, and avoid producing a misleading substitute merely to keep the pipeline moving.

Defined boundaries reduce hidden coupling. A layer may depend only on information and guarantees declared by the contract. Shared assumptions, undocumented context, and reliance on another layer's internal behavior are prohibited because they make independent evolution unsafe.

Contracts protect domain meaning. Market Data must not silently become an Assessment, Evidence must not become a Decision, and Strategy must not become permission. Every transition adds only the meaning assigned to the responsible layer.

Contracts describe obligations, not implementation. They define what must remain true at a boundary while leaving internal methods free to evolve within the approved architecture and domain model.

## 2. Contract Principles

Each contract has one responsibility. It may include every obligation necessary to complete that responsibility, but it may not absorb work assigned to another layer. A useful result does not justify crossing an authority boundary.

Input and output are explicit. A layer receives declared domain information and returns a declared domain result or an explicit failure. Information that is not part of the accepted input cannot silently influence the outcome.

Hidden dependencies are forbidden. A contract must not depend on undocumented state, an unspoken ordering assumption, or private knowledge of another component's internal workings. If additional context is necessary, it belongs in the conceptual input or preconditions.

Required layers cannot be bypassed. Information moves through the approved one-way pipeline, and each boundary must be satisfied before the next responsibility may act. Convenience and urgency do not create alternate paths.

Failure is part of every contract. Failure conditions state when the layer cannot fulfill its responsibility. A failure must remain distinguishable from a valid negative, unavailable, unsupported, rejected, or unresolved domain result.

Uncertainty remains visible. A layer may reduce uncertainty only through the responsibility it owns and only when supported by evidence. It may not convert missing context into certainty or use ambiguity to gain additional authority.

Contracts preserve domain terminology. Inputs and outputs use the meanings established by the Domain Model. A local representation or internal label cannot redefine a domain concept at the boundary.

A contract does not grant additional authority. Producing an Indicator does not authorize Analysis, producing an Assessment does not authorize a Decision, and producing a Strategy does not authorize Execution. Authority remains limited to the stated responsibility.

Source context remains traceable. Outputs must retain a meaningful relationship to the inputs and conditions that produced them. Later layers must be able to understand origin and limitations without reaching into earlier internal behavior.

Equivalent input should produce equivalent behavior where reproducibility is guaranteed. Equivalence concerns domain meaning and declared conditions, not incidental internal activity.

## 3. Standard Contract Format

Every contract in this document follows a common structure. The sections describe conceptual obligations and do not define technical fields.

### Contract Name

The Contract Name identifies the boundary and the responsibility it governs. It should describe the domain transition clearly and remain stable while internal implementation evolves.

### Responsibility

Responsibility states the single type of work owned by the contract. It defines the reason the contract exists and the authority granted to the producing layer.

### Accepted Input

Accepted Input describes the domain information and context the layer may receive. It establishes what the layer is allowed to rely on without prescribing representation.

### Produced Output

Produced Output describes the domain result, contextual findings, status, and limitations returned by the layer. It defines what a consumer may expect when the contract is fulfilled.

### Preconditions

Preconditions state what must already be true before the responsibility can be performed. If a precondition is absent, the layer must not pretend that ordinary processing is valid.

### Guarantees

Guarantees are obligations that hold whenever the layer produces a result under the contract. They protect meaning, traceability, authority boundaries, and predictable behavior.

### Postconditions

Postconditions describe the state that is true after a successful or validly completed contract outcome. They clarify what may proceed to the next layer and what remains unchanged.

### Failure Conditions

Failure Conditions identify circumstances in which the contract cannot be fulfilled as requested. They define the difference between controlled failure and a legitimate negative or inconclusive domain outcome.

### Forbidden Responsibilities

Forbidden Responsibilities state what the layer must not do. These prohibitions prevent authority from expanding silently and preserve separation of responsibilities.

### Related Domain Concepts

Related Domain Concepts identifies the concepts whose approved meanings are used by the contract. The contract may relate them but may not redefine them.

## 4. Data Collection Contract

### Responsibility

Collect external market observations and deliver them for validation while preserving the available source context. Collection reports what was observed and does not interpret or correct it.

### Accepted Input

The contract accepts a collection request with an Asset scope, Timeframe scope, time range, and source context. The request must make the intended collection boundary understandable and distinguish required scope from optional context.

### Produced Output

The contract produces collected Market Data, collection context, collection status, and observed source limitations. Partial results remain identifiable as partial and retain the scope they actually cover.

### Preconditions

The requested Asset, Timeframe, and time range must be conceptually valid and sufficiently clear to attempt collection. Source context must identify the origin and relevant conditions of the observations. The request must remain within the collection responsibility.

### Guarantees

Collection performs no interpretation and no silent normalization. It invents no values, preserves source context, and identifies partial results. It distinguishes an unavailable observation from an observed value and does not present an interruption as complete collection.

### Postconditions

Every returned observation is associated with the collection context in which it was received. The result is ready for validation only as collected Market Data; it has not yet been accepted for domain use. Any limitation known at collection remains visible.

### Failure Conditions

Failure may result from an unavailable source, incomplete result when completeness is required, unsupported scope, inconsistent source response, or collection interruption. The failure states what could not be collected and preserves any valid partial context without representing it as complete.

### Forbidden Responsibilities

Collection must not perform validation, produce Indicators, conduct Analysis, form Decisions, determine storage policy, create Strategy, or cause Execution. It must not repair questionable observations through assumption.

### Related Domain Concepts

Market, Asset, Timeframe, Market Data, and Observation provide the domain language for this contract.

## 5. Validation and Normalization Contract

### Responsibility

Determine whether collected Market Data is structurally and semantically suitable for domain use and produce normalized, domain-consistent information without changing its underlying meaning.

### Accepted Input

The contract accepts collected Market Data, source context, the expected Asset, expected Timeframe, and declared validation rules. The input retains the collection status and limitations needed to interpret completeness.

### Produced Output

The contract produces validated Market Data, identifiable rejected observations, validation findings, an explicit normalization record, and a quality status. Accepted and rejected material remain distinguishable.

### Preconditions

Collected information must retain its source and collection context. Expected identity and temporal scope must be declared. Validation rules must be applicable to the requested domain context and must not contain analytical conclusions.

### Guarantees

Original information is not silently rewritten. Rejected data remains identifiable, normalization is explicit, and uncertainty and incompleteness remain visible. No analytical interpretation is added. Every accepted result can be related to the collected information from which it came.

### Postconditions

Accepted Market Data is suitable for preservation and later domain preparation within its stated quality limits. Rejected observations cannot be mistaken for accepted information. Normalized meaning remains equivalent to the source observation where acceptance is granted.

### Failure Conditions

Failure may result from invalid structure, impossible values, temporal inconsistency, identity mismatch, duplicate conflict, or missing required context. Where only part of the input is affected, the contract identifies whether controlled partial acceptance is valid or the complete request must fail.

### Forbidden Responsibilities

Validation and normalization must not perform collection, determine storage policy, produce Indicators, conduct Analysis, form Decisions, create Strategy, or cause Execution.

### Related Domain Concepts

Asset, Timeframe, Market Data, Candle, Observation, and Evidence are relevant to the meaning and limits of validation.

## 6. Storage Contract

### Responsibility

Preserve validated domain information and make it retrievable without changing its meaning or historical context.

### Accepted Input

The contract accepts validated Market Data, domain context, provenance, and a preservation request. For retrieval, it accepts a conceptually valid request that identifies the required preserved context without changing it.

### Produced Output

The contract produces a preservation result, retrieval reference, conflict result, and historical status. Retrieval produces domain-equivalent information together with the context needed to understand its preserved state.

### Preconditions

Information submitted for preservation must have a valid quality status and provenance. Its identity and historical context must be sufficiently clear to distinguish a new record, an equivalent repeated request, and a conflict.

### Guarantees

Historical records are not silently overwritten. Provenance is preserved, retrieval returns domain-equivalent information, and repeated preservation is handled predictably. The contract does not reinterpret domain concepts or alter their authority.

### Postconditions

Successfully preserved information remains retrievable with its provenance and historical meaning intact. A conflict leaves the prior historical state unchanged unless a separately governed correction is explicitly authorized.

### Failure Conditions

Failure may result from unavailable preservation, a conflicting historical claim, integrity failure, retrieval failure, or an inconsistent historical state. Failure does not create a substitute record or conceal which obligation could not be met.

### Forbidden Responsibilities

Storage must not collect, validate, normalize, derive analytical meaning, form Decisions, create Strategy, perform Risk Assessment, or cause Execution.

### Related Domain Concepts

Market Data, Dataset, Evidence, Knowledge, and the historical meaning of all preserved domain concepts are relevant to this contract.

## 7. Dataset Preparation Contract

### Responsibility

Create a bounded Dataset from validated, preserved Market Data for a declared analytical or research purpose.

### Accepted Input

The contract accepts a Dataset request, Asset scope, Timeframe scope, time range, completeness requirements, and declared purpose. The request defines the intended boundary without selecting information according to a desired conclusion.

### Produced Output

The contract produces a Dataset, inclusion context, explicit exclusions, completeness status, and known limitations. The result shows which requested scope is represented and where gaps remain.

### Preconditions

The relevant Market Data must be validated, preserved, and retrievable. Scope and purpose must be compatible and sufficiently specific to evaluate completeness. The request must not require favorable selection or hidden filtering.

### Guarantees

Selection criteria are explicit, Dataset scope is reproducible, missing information is visible, and no favorable selection is performed. Original Market Data remains unchanged and traceable from the Dataset.

### Postconditions

The Dataset is a coherent, bounded body of information suitable for its declared analytical or research purpose within stated limitations. Its existence does not claim that it is sufficient for every later conclusion.

### Failure Conditions

Failure may result from insufficient data, conflicting scope, unsupported request, unmet completeness requirements, or an unavailable historical range. A Dataset is not produced when the declared purpose cannot be supported without concealing a material gap.

### Forbidden Responsibilities

Dataset preparation must not produce Indicators or Features, conduct Analysis, form Decisions, create Strategy, grant risk permission, or cause Execution.

### Related Domain Concepts

Asset, Timeframe, Market Data, Candle, Dataset, Research, Hypothesis, and Experiment define the conceptual context of this contract.

## 8. Indicator Contract

### Responsibility

Produce a reproducible Indicator from a valid Dataset according to a declared indicator definition and calculation context.

### Accepted Input

The contract accepts a Dataset, indicator definition, and calculation context. The Dataset includes the quality and completeness context required to determine whether the measurement is valid.

### Produced Output

The contract produces an Indicator, validity context, unavailable periods, and calculation findings. The result distinguishes valid measurement from unavailable or undefined measurement.

### Preconditions

The Dataset must be valid for the intended definition and provide the required history and observations. The definition must have unambiguous conceptual meaning and the calculation context must not introduce hidden analytical interpretation.

### Guarantees

Equivalent valid input and definition produce equivalent output. Missing prerequisites are not replaced silently, the result remains traceable to the Dataset, and the Indicator carries no trading authority. No analytical conclusion is created.

### Postconditions

A produced Indicator is available as a measurement with explicit validity and limitation context. The Dataset remains unchanged, and unavailable periods remain distinguishable from measured values.

### Failure Conditions

Failure may result from insufficient history, an incompatible Dataset, invalid definition, undefined calculation, or unavailable required observations. Failure does not produce an invented or assumed measurement.

### Forbidden Responsibilities

The Indicator contract must not select the Dataset, assign Feature interpretation, conduct Analysis, form a Decision, create Strategy, or cause Execution.

### Related Domain Concepts

Dataset, Indicator, Observation, Evidence, and Timeframe are central to this contract.

## 9. Feature Preparation Contract

### Responsibility

Give Indicators or other derived characteristics an explicit analytical role for a defined question.

### Accepted Input

The contract accepts Indicators, Dataset context, an analytical purpose, and a feature definition. The purpose identifies why a characteristic is relevant without predetermining an Assessment.

### Produced Output

The contract produces Features, relevance context, transformation findings, and limitations. Each Feature retains a traceable relationship to its origin and declared analytical role.

### Preconditions

The Indicators and Dataset context must be valid and compatible with the feature definition. The analytical purpose must be bounded, and any transformation must have defined meaning under the available context.

### Guarantees

The analytical role is explicit, origin remains traceable, and transformation does not create Evidence automatically. Features do not become Assessments, and unsupported transformations fail visibly.

### Postconditions

Produced Features are available to support a defined Analysis within their relevance and limitation context. Their sources remain unchanged, and no analytical conclusion or authority is added.

### Failure Conditions

Failure may result from an incompatible Indicator, missing context, undefined transformation, or unsupported analytical purpose. A failure leaves the original Indicators and Dataset meaning unchanged.

### Forbidden Responsibilities

Feature preparation must not conduct Analysis, produce an Assessment, form a Decision, create Strategy, perform Risk Assessment, or cause Execution.

### Related Domain Concepts

Dataset, Indicator, Feature, Observation, Analysis, and Evidence define this contract's domain boundary.

## 10. Analysis Agent Contract

### Responsibility

Perform one bounded domain of independent Analysis and produce one explainable Assessment.

### Accepted Input

The contract accepts the shared Dataset, prepared Indicators, prepared Features, relevant Observations, available Evidence, relevant Knowledge, and an analysis context. The prepared context is common to peer Analysis Agents for the same analytical occurrence.

### Produced Output

The contract produces an Assessment, references to supporting Evidence, confidence, uncertainty, limitations, and analysis status. The outcome may state that a justified conclusion cannot be formed.

### Preconditions

The analytical responsibility must be singular and explicit. The prepared input must be internally compatible, share the intended context, and retain its quality limitations. The Analysis Agent must not rely on information unavailable to the declared input.

### Guarantees

The contract preserves one bounded analytical responsibility, independent reasoning, and no communication with peer agents. It uses the same prepared input context, produces an explainable conclusion, keeps uncertainty visible, and grants no action authority.

### Postconditions

The Assessment represents only the assigned analytical domain and is suitable for later aggregation with peer Assessments from the same context. Inputs and peer behavior remain unchanged. Inability to justify a conclusion is recorded as a valid analytical result when the contract was performed correctly.

### Failure Conditions

Failure may result from insufficient Evidence, unsupported context, contradictory input, an unavailable required Feature, or inability to perform the assigned Analysis reliably. Inability to justify a conclusion is not necessarily a system failure; it is a valid result when it truthfully represents the Evidence and uncertainty.

### Forbidden Responsibilities

An Analysis Agent must not aggregate peer Assessments, form a Decision, create Strategy, grant risk permission, or cause Execution.

### Related Domain Concepts

Dataset, Indicator, Feature, Observation, Analysis, Analysis Agent, Assessment, Evidence, and Knowledge define this contract.

## 11. Decision Engine Contract

### Responsibility

Aggregate independent Assessments from one shared context and produce one explainable Decision.

### Accepted Input

The contract accepts Assessments for one shared context, an aggregation policy, and decision context. Each Assessment retains its independent conclusion, Evidence references, confidence, uncertainty, and limitations.

### Produced Output

The contract produces a Decision, agreement state, conflict state, combined confidence, uncertainty, supporting Assessment references, and decision status. Conceptually, status supports at least supported, unsupported, and unresolved outcomes.

### Preconditions

Assessments must be identifiable, independent, and compatible with the same decision context. The aggregation policy must be valid for that context, and required Assessments must be present or explicitly identified as missing.

### Guarantees

Disagreement is preserved, missing Assessments are visible, and uncertainty is not converted into permission. The Decision remains separate from Strategy and is explainable through its contributing Assessments and aggregation reasoning.

### Postconditions

One Decision exists for the evaluated Assessment context, or a controlled failure explains why aggregation could not occur. A supported, unsupported, or unresolved Decision is a complete domain result. Source Assessments remain unchanged.

### Failure Conditions

Failure may result from incompatible Assessment contexts, missing required Assessments, an invalid aggregation policy, or insufficient basis for aggregation. An unresolved Decision is not a failure when aggregation was valid but the combined Evidence does not justify a supported or unsupported conclusion.

### Forbidden Responsibilities

The Decision Engine must not perform domain Analysis, modify Assessments, create Strategy, grant risk permission, or cause Execution.

### Related Domain Concepts

Assessment, Decision, Evidence, Observation, Analysis Agent, and Knowledge are related to this contract.

## 12. Strategy Contract

### Responsibility

Translate a supported Decision into a proposed strategic response under explicit strategic context and constraints.

### Accepted Input

The contract accepts a Decision, strategy context, applicable strategic Knowledge, and proposal constraints. The Decision retains its status, reasoning, uncertainty, and relationship to contributing Assessments.

### Produced Output

The contract produces a proposed Strategy, declared conditions, explicit assumptions, expected invalidation conditions, and strategy status. It may produce no Strategy when requirements are not satisfied.

### Preconditions

The Decision must be supported and applicable to the declared strategy context. Strategic Knowledge and proposal constraints must be available and mutually consistent enough to justify a response.

### Guarantees

The Strategy references its Decision, assumptions are explicit, and the proposal is not permission. No Strategy is created when requirements are not satisfied, and an expected outcome is not represented as certainty.

### Postconditions

A justified proposal is ready for independent Risk Assessment, or the outcome explicitly states that no Strategy is available. The Decision remains unchanged. Producing no Strategy is a valid outcome when the contract correctly identifies absent justification.

### Failure Conditions

An unsupported or unresolved Decision, missing strategic context, contradictory constraints, or absence of a justified proposal prevents Strategy production. Unsupported or unresolved Decisions normally produce no Strategy rather than a fabricated failure workaround.

### Forbidden Responsibilities

The Strategy contract must not change the Decision, perform Risk Assessment, grant permission, or cause Execution.

### Related Domain Concepts

Decision, Strategy, Knowledge, Evidence, and Risk Assessment define the contract's meaning and authority boundary.

## 13. Risk Assessment Contract

### Responsibility

Evaluate a proposed Strategy against explicit risk constraints and determine whether it is permitted, restricted, or rejected.

### Accepted Input

The contract accepts a Strategy, risk context, exposure context, risk constraints, and current permission state. The Strategy includes its Decision relationship, conditions, assumptions, and invalidation conditions.

### Produced Output

The contract produces a Risk Assessment, permission status, restrictions, rejection reasons, uncertainty, and assessment status. Permission, restriction, rejection, and inability to establish permission remain distinguishable.

### Preconditions

The Strategy must be valid and complete enough for risk evaluation. Applicable constraints and exposure context must be explicit and current for the requested permission context. Existing permission state must be known where it affects the evaluation.

### Guarantees

Absence of rejection is not permission. Permission and restrictions are explicit, the Strategy is not rewritten, uncertainty cannot increase authority, and rejection remains explainable. The contract defaults to no permission when sufficient basis is absent.

### Postconditions

The proposed Strategy has an explicit permission outcome. Only an approving or restricting Risk Assessment can make the proposal eligible for Paper Execution, and only within the stated restrictions. Rejection and no-permission outcomes leave the Strategy unexecuted.

### Failure Conditions

Failure may result from missing risk context, invalid Strategy, conflicting constraints, insufficient basis for permission, or unavailable exposure information. Inability to establish permission always results in no permission, whether represented as rejection, unresolved assessment, or controlled failure.

### Forbidden Responsibilities

Risk Assessment must not create or improve Strategy, change a Decision, cause Execution, or change historical Evidence.

### Related Domain Concepts

Strategy, Risk Assessment, Decision, Evidence, Execution, and Performance are related to this contract.

## 14. Paper Execution Contract

### Responsibility

Simulate an authorized Strategy strictly within the permission and restrictions granted by its Risk Assessment.

### Accepted Input

The contract accepts a Strategy, an approving or restricting Risk Assessment, execution context, current simulated state, and relevant Market Data. Permission must apply to the same proposal and context.

### Produced Output

The contract produces an Execution, execution status, simulated outcome, deviation record, and failure record. The result distinguishes intended action, permitted bounds, attempted behavior, and observed simulated outcome.

### Preconditions

Explicit permission must be valid, current, and compatible with the Strategy and execution context. Restrictions must be interpretable and enforceable. Simulated state and relevant Market Data must be sufficient for controlled execution.

### Guarantees

There is no Execution without explicit permission. Restrictions are enforced, historical Market Data is unchanged, and Strategy is not rewritten. Simulated behavior remains distinguishable from real-world behavior, and failures remain recorded.

### Postconditions

The Execution record truthfully represents what occurred within simulation, including deviations and failures. Strategy, Risk Assessment, Decision, Evidence, and historical Market Data retain their prior meaning. The outcome becomes eligible for Performance evaluation.

### Failure Conditions

Failure may result from missing permission, expired or incompatible permission, unavailable execution context, violated restriction, insufficient market information, or invalid simulated state. A failed attempt remains recorded and cannot be represented as a successful Execution.

### Forbidden Responsibilities

Paper Execution must not conduct Analysis, form a Decision, create Strategy, grant risk permission, or revise history.

### Related Domain Concepts

Strategy, Risk Assessment, Execution, Market Data, Observation, and Performance define this contract.

## 15. Performance Analytics Contract

### Responsibility

Evaluate completed Executions and produce qualified Performance understanding.

### Accepted Input

The contract accepts Executions, associated Decisions, associated Strategies, associated Risk Assessments, and an evaluation context. Historical relationships and limitations remain part of the input.

### Produced Output

The contract produces Performance, Observations, evaluation findings, limitations, and comparison context. The output distinguishes descriptive results from interpretations and preserves uncertainty.

### Preconditions

Executions must be complete enough for the declared evaluation and retain their relationships to Decisions, Strategies, and Risk Assessments. The evaluation context must define a coherent comparison without favorable selection.

### Guarantees

Historical events remain unchanged, favorable outcomes are not treated as proof, and evaluation context is explicit. Missing context remains visible, and Performance grants no future permission.

### Postconditions

Completed outcomes have an explainable Performance interpretation within declared limits. Resulting Observations may contribute to Research, while prior Executions and their decision chain remain unchanged.

### Failure Conditions

Failure may result from insufficient Execution history, incompatible evaluation context, missing historical relationships, or incomplete outcome information. Insufficient basis may produce a limited or inconclusive finding when that result can be stated honestly.

### Forbidden Responsibilities

Performance Analytics must not modify Execution, change Strategy, change Decision, or authorize future action.

### Related Domain Concepts

Execution, Performance, Observation, Evidence, Decision, Strategy, Risk Assessment, and Research are related to this contract.

## 16. Research Contract

### Responsibility

Evaluate Hypotheses through bounded Experiments and Evidence and produce qualified Knowledge.

### Accepted Input

The contract accepts a Hypothesis, research question, Dataset or Performance context, experiment conditions, evaluation criteria, and existing Knowledge. Inputs retain their limitations and historical meaning.

### Produced Output

The contract produces an Experiment result, Evidence, research finding, Knowledge candidate, uncertainty, and limitations. Supportive, negative, and inconclusive outcomes remain distinguishable.

### Preconditions

The Hypothesis must be testable within a bounded question. Experiment conditions and evaluation criteria must be explicit before interpretation. The Dataset or Performance context must be suitable for the question and preserve relevant limitations.

### Guarantees

Negative findings are preserved, inconclusive results remain inconclusive, and history is not rewritten. Evidence remains distinguishable from interpretation, Knowledge remains qualified, and Research creates no direct execution authority.

### Postconditions

The research question has an explicit finding or a controlled explanation of why it could not be answered. Evidence and limitations remain available for review. Any Knowledge candidate requires qualification consistent with the strength and scope of the Evidence.

### Failure Conditions

Failure may result from an untestable Hypothesis, insufficient Evidence, invalid experiment conditions, non-reproducible result, or unsupported generalization. Negative or inconclusive findings are valid outcomes rather than failures when the Experiment itself was sound.

### Forbidden Responsibilities

Research must not change historical records, create Decisions for current Execution, grant risk permission, or cause direct Execution.

### Related Domain Concepts

Research, Hypothesis, Experiment, Dataset, Performance, Evidence, Observation, and Knowledge define this contract.

## 17. Cross-Contract Rules

Every output preserves its source context. A consumer must be able to relate the result to the domain information, declared conditions, quality status, and limitations that produced it. Traceability must not require access to hidden internal behavior.

Later layers cannot modify earlier historical outputs. New findings may qualify future interpretation or produce a new processing occurrence, but they do not rewrite Market Data, Datasets, Indicators, Assessments, Decisions, Strategies, Risk Assessments, or Executions already produced.

Every failure is explicit. A layer states that it could not fulfill its obligation and preserves available context. Failure is never disguised as an empty success, a default value, or an unsupported domain result.

Partial results are identified. The output states which part of the requested responsibility was fulfilled and which part was not. A partial result cannot satisfy a precondition that requires completeness.

Uncertainty is preserved across boundaries. A later layer may evaluate uncertainty within its own responsibility but cannot silently remove it. Missing information, conflicting Evidence, and unresolved conclusions remain visible.

No layer silently expands its authority. A component may produce only the domain meaning assigned to its contract. Additional usefulness does not create additional permission.

Bypassing required layers is forbidden. Collection precedes validation, validation precedes preservation and Dataset preparation, prepared information precedes derivation and Analysis, Assessments precede Decision, Decision precedes Strategy, Strategy precedes Risk Assessment, and permission precedes Execution.

Domain invariants apply across all contracts. Evidence is not a Decision, Decision is not Strategy, Strategy is not permission, and Execution does not alter history. A contract cannot create an exception to the Domain Model.

Equivalent input leads to equivalent behavior wherever the contract promises reproducibility. Differences must arise from declared differences in input, context, policy, or known uncertainty rather than hidden state.

Failures and valid negative outcomes remain distinct. No Strategy, no permission, unresolved Decision, unavailable Indicator, and inconclusive Research may be correct domain outcomes. A system failure means the responsibility itself could not be performed as required.

Outputs do not gain authority through repetition or aggregation outside the approved responsibility. Repeated Observations do not become a Decision automatically, and multiple Assessments cannot be aggregated anywhere except the Decision Engine contract.

Each contract leaves its inputs historically unchanged. A transformation produces a new domain result and relationship rather than revising the meaning of its source.

## 18. Contract Evolution

Contract changes require an identified need. A proposed change must explain which current obligation is insufficient, what evidence demonstrates the problem, and why the need cannot be met within the existing contract.

Meaning changes are reviewed explicitly. Changes to accepted input, produced output, guarantees, failure conditions, or forbidden responsibilities may alter the architectural boundary even when the contract name remains the same.

Conceptual backward compatibility is considered. Existing consumers should continue to receive the meaning and guarantees on which they rely unless an approved change explicitly replaces those expectations. Compatibility concerns domain behavior, not a particular technical representation.

Responsibility must not widen silently. Adding new input or output is not harmless if it allows a layer to perform work assigned elsewhere. Every expansion is assessed against separation of responsibilities and one-way flow.

Failure behavior is part of compatibility. A change that turns an explicit failure into a silent fallback, changes a valid unresolved outcome into apparent success, or hides partial completion weakens the contract even if successful results appear unchanged.

Changes affecting architecture require an engineering decision record. A contract cannot independently redefine a layer, bypass a required stage, change an authority boundary, or weaken a domain invariant.

Domain terminology remains authoritative during evolution. If a proposed contract change requires a concept to mean something new, the Domain Model must be reviewed deliberately rather than reinterpreted locally.

Implementation must follow the contract. Internal evolution is permitted only while the stated responsibility, guarantees, postconditions, failures, and forbidden responsibilities remain intact.

Replaced contract meaning remains historically understandable. Prior outputs continue to be interpreted according to the contract under which they were produced, and later changes do not rewrite their original obligations.

## 19. Closing

These contracts establish the obligations between the major layers of Crypto Agent Lab. They define what each layer may receive, what it must produce, what it guarantees, how it fails, and which authority it must never assume.

Future interfaces, tests, and implementations must be derived from these contracts. They may express the obligations in forms appropriate to their purpose, but they must preserve the domain meaning and architectural boundaries defined here.

Implementation may vary internally, but it must not weaken responsibility, guarantees, failure behavior, traceability, uncertainty, or authority boundaries. A component satisfies the architecture only when it satisfies its contract.
