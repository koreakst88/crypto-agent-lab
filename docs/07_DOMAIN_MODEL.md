# Domain Model

Every engineering system requires a common vocabulary before construction begins. Without shared meanings, the same word can describe different responsibilities, and different words can accidentally describe the same idea. That ambiguity eventually becomes inconsistency in reasoning, documentation, and system behavior.

This document defines the principal domain concepts of Crypto Agent Lab and the relationships among them. It describes what these concepts mean within the project, why they exist, and what they must not be confused with. It defines concepts rather than software objects, technical representations, or construction choices.

## 1. Purpose of the Domain Model

The domain model establishes a shared language for reasoning about Crypto Agent Lab. Contributors should be able to use the same term and expect the same meaning regardless of which part of the project they are discussing. A stable vocabulary makes questions more precise and disagreements easier to locate.

Shared language eliminates ambiguity. Terms such as Observation, Assessment, Decision, Strategy, and Evidence may appear similar in ordinary conversation, but they represent different responsibilities in this domain. Treating them as interchangeable would blur the progression from factual information to interpretation and controlled action.

The model improves communication by giving every important concept a defined purpose and boundary. A contributor can explain a proposal in domain terms without relying on private context. Reviewers can determine whether a statement refers to a fact, a derived value, an analytical conclusion, or an authorized outcome.

Consistency is preserved when documentation and future system behavior use the same concepts in the same way. A term should not acquire a local meaning simply because that meaning is convenient in one context. When a concept appears across multiple areas of work, its domain meaning remains stable.

The model reduces conflicting terminology. Synonyms may make prose varied, but they can also hide important distinctions. The project should prefer its defined vocabulary when precision matters. Where ordinary language is used, it should not create a second domain concept unintentionally.

Future engineering work is supported by clear conceptual boundaries. Before behavior can be represented reliably, the team must understand which domain idea that behavior serves. The domain model provides that reference without prescribing how the idea is realized.

This document defines concepts, not software objects. A concept may later be represented in more than one form, and several concepts may participate in one engineering capability. Those choices must preserve the meanings established here rather than use technical convenience to redefine them.

## 2. Domain Principles

One concept has one meaning. A domain term must refer to the same idea wherever it is used. If two meanings are genuinely different, they should not share one name. If two names refer to the same domain idea, the project should select one canonical term and remove the ambiguity.

Concepts remain stable. Their descriptions should be broad enough to survive ordinary project growth but precise enough to guide consistent reasoning. Stability allows knowledge and evidence accumulated at different times to remain comparable.

Names describe responsibilities. A concept's name should indicate the role it plays in the domain rather than how it might be represented or processed. Names should help a reader understand why the concept exists and how it differs from its neighbors.

Concepts are independent of technical realization. Their meaning must remain valid even when the means used to represent, preserve, calculate, or present them changes. Engineering choices conform to domain language; domain language does not shift to mirror temporary engineering choices.

Concepts evolve only deliberately. A new meaning, a changed boundary, or a new relationship requires an identified problem and explicit review. Convenience, repeated misuse, or an undocumented local convention does not redefine the model.

Relationships are part of meaning. A concept is understood not only by its definition but also by what it can depend on, what it can produce, and what authority it does not possess. Relationships must preserve the distinction between facts, derived observations, interpretation, decisions, controls, and outcomes.

Uncertainty remains visible. Domain concepts that express interpretation or judgment must not be presented as direct facts. Evidence can support a conclusion without becoming that conclusion, and a conclusion can carry confidence without becoming certainty.

History is not rewritten. Later knowledge may change current understanding, but it does not alter the meaning of evidence or outcomes already recorded in their original context. New understanding is added as new knowledge rather than imposed backward.

## 3. Core Domain Concepts

### Market

#### Purpose

Market defines the shared environment in which Assets are observed and their activity is interpreted. It provides the broad context needed to understand that individual observations are part of a wider system of participation, valuation, and change.

#### Meaning

A Market is the conceptual setting in which Assets have observable states and activity over time. It includes the conditions that give Market Data meaning, without being reducible to any single source, Asset, interval, or event.

#### Relationships

A Market contains Assets and is described through Market Data associated with them. Observations, Analysis, Decisions, and Research may refer to market conditions, but none of them creates or owns the Market.

#### Does Not Mean

Market does not mean a source of information, a trading venue, a collection mechanism, a Dataset, or a Strategy. It is the domain context being studied, not the means by which information about it is obtained.

### Asset

#### Purpose

Asset identifies a distinct subject whose market behavior can be observed, compared, analyzed, and discussed consistently.

#### Meaning

An Asset is a domain entity that participates in a Market and can be associated with Market Data over time. Its identity remains conceptually stable across different observations and research contexts.

#### Relationships

Assets exist within a Market and produce or are associated with Market Data. Datasets may contain information about one or more Assets. Indicators, Features, Observations, Analysis, and Performance may be scoped to an Asset or compare several Assets.

#### Does Not Mean

Asset does not mean a position, an action, a Strategy, or a unit of ownership. It identifies what is being observed, not what the system intends to do with it.

### Timeframe

#### Purpose

Timeframe provides a consistent temporal perspective for grouping, interpreting, and comparing market activity.

#### Meaning

A Timeframe is a declared interval or temporal scope through which Market Data and derived concepts are viewed. It establishes the scale of observation and prevents conclusions formed at different temporal resolutions from being treated as directly equivalent without justification.

#### Relationships

Candles are formed for a Timeframe. Datasets, Indicators, Features, Observations, Analysis, Assessments, and Performance may carry a Timeframe context. The same Asset may be understood differently across Timeframes without either view being inherently contradictory.

#### Does Not Mean

Timeframe does not mean a deadline, research duration, processing schedule, or guarantee of data completeness. It is a temporal perspective on the Market, not a plan for project activity.

### Market Data

#### Purpose

Market Data provides the factual observational basis from which the platform develops measurements, analysis, and research.

#### Meaning

Market Data is information that describes observable market activity associated with Assets and time. It becomes suitable for domain use only when its origin, context, and quality are sufficiently understood. Market Data remains distinct from interpretations derived from it.

#### Relationships

Assets are associated with Market Data. Market Data may be organized into Candles and Datasets. It supports the creation of Indicators and Features and provides Evidence for Research and Analysis when its relevance and quality are established.

#### Does Not Mean

Market Data does not mean an Indicator, Assessment, Decision, or Knowledge. It reports observations about the Market; it does not state what those observations imply or what action should follow.

### Candle

#### Purpose

Candle provides a bounded summary of market activity for an Asset within a Timeframe.

#### Meaning

A Candle is a coherent temporal representation of observed market activity during one defined interval. It allows activity from comparable intervals to be reasoned about consistently while retaining its relationship to the underlying Market Data.

#### Relationships

A Candle is associated with an Asset and a Timeframe and is formed from Market Data. Collections of Candles may participate in Datasets and support Indicators, Features, Observations, and Analysis.

#### Does Not Mean

Candle does not mean a prediction, signal, Assessment, or action. It summarizes observed activity and carries no independent interpretation of whether that activity is favorable or important.

### Dataset

#### Purpose

Dataset establishes a coherent body of prepared information used for a defined analytical or research context.

#### Meaning

A Dataset is a bounded collection of related Market Data and associated context selected under explicit conditions. Its meaning includes why its contents belong together and what limitations affect their use.

#### Relationships

Datasets are formed from Market Data and may include Candles across relevant Assets and Timeframes. They provide the factual basis for Indicators, Features, Analysis, Hypotheses, Experiments, and Evidence. A Dataset can support many investigations without changing its original meaning.

#### Does Not Mean

Dataset does not mean all available information, an analytical conclusion, or a favorable selection of observations. It is a defined body of information, not proof that the information is sufficient for a particular claim.

### Indicator

#### Purpose

Indicator expresses a defined measurement derived from prepared market information.

#### Meaning

An Indicator is a reproducible quantitative or categorical description of a particular characteristic of Market Data. Its meaning comes from the characteristic it measures and the conditions under which that measurement is valid.

#### Relationships

Indicators are derived from Datasets and may be interpreted as Features when placed in a specific analytical context. They support Observations, Analysis, Hypotheses, Experiments, and Evidence. An Indicator remains traceable to the information from which it was derived.

#### Does Not Mean

Indicator does not mean a Feature in every context, a conclusion, an opportunity, a Decision, or permission for action. It measures a characteristic; it does not determine the significance of that characteristic.

### Feature

#### Purpose

Feature represents a prepared characteristic considered relevant to a specific analytical question.

#### Meaning

A Feature is an Indicator or other derived characteristic given an explicit analytical role. It connects measurement to a particular form of reasoning while remaining separate from the conclusion produced by that reasoning.

#### Relationships

Features are derived from or informed by Indicators and Datasets. They support Analysis performed by Analysis Agents, may be referenced in Assessments, and can participate in Hypotheses and Experiments.

#### Does Not Mean

Feature does not mean a product capability, an Assessment, a Decision, or Evidence by default. A Feature becomes evidence only when its relevance to a claim is established in a defined context.

### Observation

#### Purpose

Observation records a context-bound statement about something seen or measured in the domain.

#### Meaning

An Observation is a factual or derived statement grounded in Market Data, a Dataset, an Indicator, a Feature, an Experiment, or Performance. It describes what was observed without extending beyond the conditions that support the statement.

#### Relationships

Observations may originate from Market Data or derived measurements and can become Evidence when used to evaluate a Hypothesis or support Analysis. Multiple Observations may contribute to an Assessment or Research finding.

#### Does Not Mean

Observation does not mean interpretation, certainty, Assessment, or Decision. It states what was observed, not why it occurred or what should be done because of it.

### Analysis

#### Purpose

Analysis interprets relevant information within a bounded domain question.

#### Meaning

Analysis is the disciplined reasoning process that examines prepared information, Indicators, Features, Observations, and Evidence to form a domain-specific understanding. Its scope and limitations must be explicit.

#### Relationships

Analysis is performed within the responsibility of an Analysis Agent and produces an Assessment. It may draw on Knowledge while remaining grounded in the current prepared context. Research can improve future Analysis by strengthening Evidence and Knowledge.

#### Does Not Mean

Analysis does not mean an Assessment, Decision, Strategy, Risk Assessment, or Execution. It is a reasoning activity, not its structured result and not authority to act.

### Analysis Agent

#### Purpose

Analysis Agent owns one independent domain of market reasoning.

#### Meaning

An Analysis Agent is a conceptual analytical role that evaluates one bounded domain using the same prepared market information available to peer agents. Its responsibility is limited to producing an independent, explainable Assessment.

#### Relationships

An Analysis Agent performs Analysis using Datasets, Indicators, Features, Observations, Evidence, and relevant Knowledge. It produces Assessments that later contribute to Decisions. Analysis Agents do not communicate directly with one another.

#### Does Not Mean

Analysis Agent does not mean an autonomous authority, a Decision maker, a Strategy, or an executor. It does not aggregate peer conclusions or determine permission for action.

### Assessment

#### Purpose

Assessment communicates the structured result of one bounded Analysis.

#### Meaning

An Assessment is an explainable analytical conclusion that states what one domain indicates, which Evidence supports it, how confidence should be understood, and what uncertainty or limitations remain.

#### Relationships

Assessments are produced by Analysis Agents. Multiple independent Assessments contribute to a Decision. Assessments may be evaluated through Research and compared with later Performance, but their historical meaning remains tied to the context in which they were produced.

#### Does Not Mean

Assessment does not mean a Decision, Strategy, Risk Assessment, or Execution. It represents one analytical perspective and does not aggregate the full decision context or authorize action.

### Decision

#### Purpose

Decision expresses the aggregated interpretation of independent Assessments regarding whether the available evidence supports a trading opportunity.

#### Meaning

A Decision is an explainable conclusion formed from the relevant set of Assessments for a shared context. It preserves agreement, conflict, confidence, and uncertainty and may state that an opportunity is supported, unsupported, or unresolved.

#### Relationships

Assessments contribute to Decisions. Decisions inform Strategy and may later be examined alongside Execution and Performance. Knowledge can improve the quality of future decision reasoning without retroactively changing past Decisions.

#### Does Not Mean

Decision does not mean Analysis, Strategy, permission for action, Risk Assessment, or Execution. It determines the meaning of combined analytical evidence, not the action to take or whether that action is allowed.

### Strategy

#### Purpose

Strategy translates a Decision into a coherent intended response under declared strategic reasoning.

#### Meaning

A Strategy is the conceptual interpretation that determines whether a Decision corresponds to a proposed course of action and under what meaningful conditions. It expresses intent while remaining separate from risk permission.

#### Relationships

Decisions inform Strategy. A Strategy undergoes Risk Assessment before any Execution can occur. Its proposed intent and conditions provide context for later Performance evaluation and Research.

#### Does Not Mean

Strategy does not mean a Decision, guaranteed outcome, Risk Assessment, authorization, or Execution. The existence of a Strategy does not imply that action is permitted.

### Risk Assessment

#### Purpose

Risk Assessment determines whether a strategic proposal is permissible within explicit risk constraints.

#### Meaning

A Risk Assessment is an independent, explainable evaluation of the uncertainty, exposure, and constraints relevant to a proposed Strategy in its current context. It may permit, restrict, or reject the proposal.

#### Relationships

Strategy is the subject of Risk Assessment. A permitted or restricted proposal may proceed to Execution within the granted bounds. Risk Assessments contribute to later Performance interpretation and Research about the effectiveness of risk control.

#### Does Not Mean

Risk Assessment does not mean Analysis, Decision, Strategy creation, or Execution. It does not change the evidence or make an unsuitable proposal appear acceptable. Absence of a rejection is not equivalent to permission.

### Execution

#### Purpose

Execution represents the realized outcome of a risk-approved strategic proposal within the project's controlled domain.

#### Meaning

Execution is the domain event and resulting record of carrying out an explicitly permitted proposal under its defined bounds. It preserves the distinction between intended action, granted permission, and observed outcome.

#### Relationships

Execution follows Strategy and an approving or restricting Risk Assessment. It generates outcomes used to understand Performance. Execution can provide Observations and Evidence for Research without altering the Decision or Strategy that preceded it.

#### Does Not Mean

Execution does not mean Strategy, permission, expected result, or Performance. It does not revise historical Market Data, reinterpret prior reasoning, or relax the conditions under which it was permitted.

### Performance

#### Purpose

Performance describes the evaluated behavior and outcomes of completed Executions over a relevant context.

#### Meaning

Performance is an evidence-based understanding of results, consistency, variation, and limitations. It compares observed outcomes with the expectations and conditions that accompanied Decisions, Strategies, and Risk Assessments.

#### Relationships

Executions generate the outcomes from which Performance is evaluated. Performance produces Observations and Evidence, contributes to Research, and can become Knowledge that improves future Analysis and evaluation.

#### Does Not Mean

Performance does not mean a single favorable outcome, proof of future results, a Strategy, or authority to change Execution. It describes and evaluates what occurred; it does not rewrite the process that produced it.

### Research

#### Purpose

Research develops disciplined understanding through questions, investigation, Evidence, and evaluation.

#### Meaning

Research is the ongoing domain activity that examines Hypotheses, conducts bounded Experiments, interprets Evidence, preserves negative findings, and produces Knowledge. Its goal is to reduce uncertainty rather than to guarantee a preferred conclusion.

#### Relationships

Research creates and evaluates Hypotheses through Experiments. It uses Datasets, Observations, Performance, and other Evidence and produces Knowledge that can improve future Analysis. Research may also reveal that current Knowledge requires qualification.

#### Does Not Mean

Research does not mean a commitment, Decision, Strategy, or retrospective change to history. It cannot make unsupported claims authoritative merely because they are under investigation.

### Hypothesis

#### Purpose

Hypothesis states a specific, testable proposition about the domain.

#### Meaning

A Hypothesis is a provisional explanation or expectation whose validity is not yet established. It defines a relationship or claim clearly enough that Evidence could support, weaken, or leave it unresolved.

#### Relationships

Hypotheses arise within Research and are examined through Experiments. They may draw on Observations and existing Knowledge while remaining distinct from both. The Evidence produced by investigation informs their evaluation.

#### Does Not Mean

Hypothesis does not mean fact, Evidence, Assessment, Decision, or Strategy. Confidence in a Hypothesis does not make it true, and a favorable result does not automatically establish general validity.

### Experiment

#### Purpose

Experiment creates a bounded and reproducible investigation of a Hypothesis.

#### Meaning

An Experiment is a controlled research activity with a defined question, conditions, scope, and basis for interpretation. It is designed to produce relevant Observations and Evidence rather than to confirm a preferred answer.

#### Relationships

Experiments evaluate Hypotheses using appropriate Datasets, Indicators, Features, Observations, or Performance context. Their outcomes contribute Evidence to Research and may lead to Knowledge, further questions, rejection, or unresolved findings.

#### Does Not Mean

Experiment does not mean Execution, production behavior, proof, or committed engineering work. It does not become successful only when it supports the Hypothesis; a clear negative or inconclusive result can fulfill its research purpose.

### Evidence

#### Purpose

Evidence provides the observable basis for evaluating a claim, Assessment, Decision, or research conclusion.

#### Meaning

Evidence is information whose relevance, quality, context, and limitations are sufficiently understood for use in reasoning. It supports or weakens a proposition without becoming the proposition itself.

#### Relationships

Evidence may arise from Market Data, Datasets, Indicators, Features, Observations, Experiments, Executions, and Performance. It supports Analysis, Assessments, Decisions, Hypotheses, and Research. Evaluated Evidence contributes to Knowledge.

#### Does Not Mean

Evidence does not mean certainty, Decision, Strategy, or Knowledge by itself. Information is not Evidence merely because it is available; its relationship to the claim and its limitations must be understood.

### Knowledge

#### Purpose

Knowledge preserves validated understanding that can improve future reasoning and reduce repeated uncertainty.

#### Meaning

Knowledge is an organized and qualified understanding developed from evaluated Evidence and Research over time. It includes what is supported, where it applies, what remains uncertain, and which findings limit its use.

#### Relationships

Research produces Knowledge by evaluating Evidence from Hypotheses, Experiments, Observations, Execution, and Performance. Knowledge informs future Analysis, Hypotheses, Experiments, and evaluation while remaining open to revision through new Evidence.

#### Does Not Mean

Knowledge does not mean permanent truth, raw information, a single Observation, or authority to rewrite Evidence. New Knowledge may qualify earlier understanding, but it does not change what was historically observed.

## 4. Domain Relationships

The domain begins with the Market as the context in which Assets are observed. Assets participate in the Market and are associated with Market Data over time. Timeframes provide consistent temporal perspectives through which that activity can be grouped and compared, including the formation of Candles.

Market Data forms the factual basis of Datasets. A Dataset brings related information together for a defined analytical or research context while preserving its limitations. Dataset membership does not add analytical meaning; it establishes a coherent basis from which meaning may later be derived.

Datasets produce Indicators through defined measurement. Indicators become Features when they are given a relevant role in a specific analytical context. The movement from Indicator to Feature does not change the underlying measurement; it identifies how that measurement participates in a question.

Market Data, Indicators, Features, and Experiments can produce Observations. An Observation states what was seen or measured within known conditions. When an Observation is relevant to evaluating a claim and its quality is understood, it can contribute as Evidence.

Features and Evidence support Analysis. Analysis is conducted within the bounded responsibility of an Analysis Agent. Each Analysis Agent produces an independent Assessment that expresses one domain perspective, along with supporting Evidence, confidence, uncertainty, and limitations.

Assessments contribute to Decisions. A Decision aggregates the meaning of independent Assessments for a shared context and determines whether the combined analytical evidence supports an opportunity. The Decision preserves disagreement and uncertainty rather than forcing all Assessments into artificial agreement.

Decisions inform Strategy. Strategy interprets whether a Decision corresponds to an intended response and expresses a proposed course of action. The proposal has no authority to proceed until it undergoes Risk Assessment.

Strategy undergoes Risk Assessment. Risk Assessment evaluates the proposal against explicit constraints and may permit, restrict, or reject it. Only a proposal with explicit permission can become Execution, and the Execution remains bound by the permission granted.

Execution generates outcomes from which Performance is evaluated. Performance relates observed outcomes to the Decisions, Strategies, and Risk Assessments that preceded them. It describes results and their consistency without changing historical Execution.

Performance contributes Observations and Evidence to Research. Research formulates Hypotheses, examines them through Experiments, evaluates Evidence, and preserves both supportive and negative findings. Research generates Knowledge when the resulting understanding is sufficiently supported and qualified.

Knowledge improves future Analysis by providing accumulated understanding of conditions, evidence, limitations, and prior findings. This relationship moves forward: Knowledge can influence new reasoning, but it does not rewrite prior Market Data, Assessments, Decisions, Executions, or Evidence.

These relationships form a conceptual progression from observed reality to measurement, interpretation, controlled action, evaluation, and learning. Each transition adds a distinct kind of meaning. No later concept should be substituted for an earlier concept, and no earlier concept carries the authority assigned to a later one.

## 5. Domain Boundaries

The Crypto Agent Lab domain includes the concepts required to reason about market information, analytical understanding, controlled decisions, simulated outcomes, performance, and research knowledge. It contains the language needed to explain how evidence becomes understanding and how that understanding may contribute to controlled action.

Market reasoning belongs inside the domain. This includes Markets, Assets, Timeframes, Market Data, Candles, Datasets, Indicators, Features, and Observations insofar as they describe the factual and measured basis of analysis.

Analytical interpretation belongs inside the domain. Analysis, Analysis Agents, and Assessments express bounded reasoning and its structured conclusions. Their uncertainty and evidence are part of their domain meaning.

Decision responsibility belongs inside the domain. Decisions, Strategies, and Risk Assessments distinguish opportunity, intended response, and permission. Their separation is essential to understanding what authority each concept possesses.

Outcome understanding belongs inside the domain. Execution and Performance describe what occurred under controlled permission and how those outcomes are evaluated. They preserve the connection between intent, constraints, and observed results.

Research knowledge belongs inside the domain. Research, Hypotheses, Experiments, Evidence, and Knowledge explain how the project investigates questions, evaluates claims, learns from results, and preserves qualified understanding.

Presentation concerns remain outside the domain. The way information is arranged, displayed, navigated, or communicated to a user does not change the meaning of the domain concepts being presented.

Operating infrastructure remains outside the domain. The environments and operational mechanisms that allow the system to run are engineering concerns, not concepts of market reasoning, decision control, or research knowledge.

Persistence mechanisms remain outside the domain. The means used to retain or retrieve information must preserve domain meaning but do not define that meaning. A Dataset, Assessment, or Decision remains the same domain concept regardless of how its record is maintained.

Delivery and release concerns remain outside the domain. The way changes are packaged, distributed, or made available does not alter domain relationships or authority.

Engineering tool choices remain outside the domain. Tools may support the expression and operation of the system, but they must conform to the shared vocabulary rather than introduce alternative domain meanings.

The boundary is based on meaning, not importance. Outside concerns can be essential to a reliable project, but they do not belong in the domain model unless they represent a concept required to reason about Markets, evidence, decisions, outcomes, or research.

## 6. Domain Invariants

Domain invariants are permanent conceptual truths. They preserve distinctions that must hold regardless of how the project evolves.

A Decision is never an Analysis. Analysis produces domain-specific understanding; a Decision aggregates Assessments and determines the meaning of combined evidence.

An Assessment is never an Execution. An Assessment expresses an analytical conclusion; Execution represents the outcome of a permitted strategic proposal.

Evidence is never a Decision. Evidence supports or weakens reasoning, while a Decision is an explainable conclusion formed from multiple Assessments and their context.

An Indicator is never permission for action. It is a measurement and has no decision, strategy, risk, or execution authority.

A Feature is never an Assessment. A Feature participates in analytical reasoning; an Assessment is the structured result of that reasoning.

An Analysis Agent never aggregates peer Assessments. Each agent remains within one domain, and Decisions are formed only at the designated aggregation responsibility.

A Decision is never a Strategy. A Decision establishes whether evidence supports an opportunity; Strategy interprets what intended response, if any, follows from that Decision.

A Strategy is never permission. It expresses intent and must undergo Risk Assessment before Execution.

Risk Assessment is never Strategy creation. It evaluates an existing proposal against constraints and cannot invent or improve the proposal in order to permit it.

Execution never changes Strategy. It records what occurred under the authorized proposal and does not reinterpret what was intended.

Execution never changes historical Market Data. Later outcomes cannot alter the factual information that preceded them.

Performance never changes Execution. It evaluates outcomes without rewriting, retrying, or improving the historical record.

Research never changes history. It may produce new interpretations and Knowledge, but prior Observations, Assessments, Decisions, and Executions remain as they occurred in their original context.

Knowledge never rewrites Evidence. New Knowledge can change how Evidence is understood or qualified, but it cannot change what the Evidence originally represented.

A Hypothesis is never Knowledge. It remains provisional until Evidence has been evaluated, and even supported Knowledge retains conditions and limitations.

An Experiment is never successful merely because it supports a Hypothesis. Its success depends on whether it produces interpretable Evidence for the stated research question.

Uncertainty is never equivalent to permission. Missing or ambiguous information cannot be treated as approval for Strategy or Execution.

Historical meaning remains contextual. Later understanding may inform future work, but it does not retroactively grant earlier concepts a meaning or authority they did not possess.

## 7. Domain Evolution

Domain concepts evolve slowly. Their stability allows documentation, research, decisions, and outcomes created at different times to remain mutually understandable. Frequent conceptual change would weaken accumulated Knowledge and make historical reasoning difficult to interpret.

Meaning changes rarely. A concept should be refined when evidence shows that its current definition is ambiguous, incomplete, or inconsistent with the approved domain. It should not change merely to accommodate a local engineering convenience.

New concepts require justification. A proposed concept must represent a distinct domain meaning that cannot be expressed clearly through the existing vocabulary. The proposal should explain its purpose, relationships, boundaries, and the ambiguity it resolves.

The existence of a new behavior does not automatically require a new domain concept. The team should first determine whether the behavior is a new expression of an existing idea. Adding terms without distinct meaning increases vocabulary while reducing clarity.

Old concepts are not silently redefined. When a meaning must change, the previous meaning, reason for revision, and effect on related concepts should remain visible. Documentation using the concept must be reviewed for consistency.

Relationships evolve with the same care as definitions. Allowing a concept to depend on a new source, produce a new outcome, or acquire new authority may change its meaning even if its written definition appears unchanged. Such changes require explicit consideration.

Consistency is more valuable than quantity. A small vocabulary with precise, durable meanings provides more value than a large vocabulary of overlapping or weakly bounded terms. The model should grow only when growth improves shared understanding.

Evolution should preserve invariants unless an explicit foundational decision changes them. If a proposed concept weakens the distinction between evidence and decision, analysis and execution, or strategy and permission, the proposal represents more than vocabulary growth and requires corresponding scrutiny.

The model should be reviewed when repeated ambiguity appears in engineering discussion or documentation. Review seeks the source of confusion before adding or changing terminology. Misuse may require clearer communication rather than a new concept.

Domain evolution succeeds when new capability can be described more precisely without making established knowledge harder to understand. The model should become more expressive over time while remaining coherent as a whole.

## 8. Closing

This document establishes the common language used by all future documentation and engineering work in Crypto Agent Lab. Its concepts provide stable meanings for discussing market information, measurement, analysis, decisions, controlled outcomes, research, and accumulated knowledge.

Future system behavior should conform to the domain model rather than redefine it through local convenience. When an engineering choice conflicts with an established concept, the choice should be reconsidered or the domain model should be revised deliberately through the approved decision process.

A shared domain language allows the project to grow without losing conceptual clarity. As capability increases, these definitions and invariants should continue to make responsibilities understandable, relationships explicit, and reasoning consistent across the full life of the project.
