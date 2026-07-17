# Research & Ideas Journal

This journal preserves research questions and ideas before they become approved engineering decisions, roadmap milestones, or implementation work. Ideas are intentionally separated from the documents that govern Crypto Agent Lab so that exploration can remain open without weakening established direction.

Recording an idea does not mean that it will ever be implemented. It does not create a commitment, priority, dependency, or expectation of future work. An entry records that a line of thought may be worth preserving or investigating; nothing more is implied until the idea passes the appropriate engineering process.

The journal exists to support exploration while protecting architectural stability. It gives uncertain thinking a durable place without requiring the architecture or roadmap to absorb concepts that have not yet been tested, evaluated, or approved.

## 1. Purpose of the Journal

The journal preserves potentially valuable thinking. Ideas often appear before the project has enough evidence, maturity, or context to evaluate them responsibly. Without a dedicated place to record them, useful observations may be lost or repeatedly rediscovered. Recording an idea allows the project to retain its initial motivation and return to it when the relevant conditions are better understood.

The journal encourages exploration. Contributors should be able to ask difficult questions, challenge assumptions, and examine unconventional possibilities without implying that the project has changed direction. Exploration is useful precisely because it can remain uncertain. An idea does not need to be complete, correct, or immediately practical in order to deserve limited research.

Research is kept separate from commitment. The journal distinguishes interest from approval and evidence gathering from planned work. This separation protects both activities: researchers can investigate without pressure to justify an early commitment, while engineering plans remain based on validated needs and approved decisions.

The journal reduces forgotten ideas. A brief conversation or private note is not durable project knowledge. When an idea is recorded with motivation, unknowns, and research needs, future contributors can understand why it appeared and whether later evidence has changed its relevance. The project does not depend on the original author being available to reconstruct the thought.

The journal prevents unvalidated concepts from contaminating the roadmap. A roadmap describes the approved order of engineering evolution and depends on validated foundations. An idea has not yet earned that status. Keeping the two separate prevents speculative capability from appearing as an implied promise or prerequisite.

The journal also protects architectural documents from becoming a collection of possibilities. Architecture describes approved responsibilities and boundaries. Research may question those boundaries or explore alternatives, but it has no authority to modify them. Only a completed decision process can change an approved architectural direction.

An idea entry should make uncertainty more visible, not less. It should distinguish the observed motivation from the proposed interpretation, expected benefits from demonstrated benefits, and known facts from open questions. A well-recorded idea helps the project understand what it does not yet know.

The journal is not a measure of productivity. The number of entries, the speed of research, or the percentage of accepted ideas does not indicate project quality. Its value lies in the clarity of preserved thinking, the quality of evidence collected, and the reduction of uncertainty around future decisions.

## 2. Idea Lifecycle

An idea moves through explicit states. The lifecycle prevents a preliminary thought from being mistaken for approved work and makes the current level of confidence visible.

```text
Idea
  ↓
Research
  ↓
Evaluation
  ↓
Accepted for Planning
  ↓
Roadmap / ADR

Alternative outcomes from Research or Evaluation:

Rejected

Archived
```

The lifecycle is not an obligation to advance every entry. Most ideas will never become implementation. Some will be rejected because evidence does not support them, some will remain archived because their context is not relevant, and some will stay in research while important unknowns remain unresolved. These are valid outcomes.

### Idea

Idea is the initial state. The entry captures a potentially valuable observation, question, or direction with enough context to preserve why it appeared. At this stage, the concept may be incomplete and its benefits or risks may be uncertain.

An Idea has no authority over project work. It does not alter architecture, enter the roadmap, reserve future scope, or justify implementation. The purpose of the state is to record the thought in a form that can later be understood and assessed.

Before moving forward, the entry should identify a real motivation rather than relying only on novelty. The motivation does not need to prove value, but it should explain which uncertainty, limitation, or opportunity prompted the idea.

### Research

Research means that the idea has a clear enough question to justify bounded investigation. The work in this state seeks evidence, clarifies assumptions, identifies unknowns, and tests whether the proposed value has a factual basis.

Research is limited in scope. It should answer specific questions rather than gradually becoming implementation or a broad redesign. The expected evidence, stopping conditions, and limits of the investigation should be understandable before significant effort is invested.

The Research state does not imply likely acceptance. Its purpose is to reduce uncertainty in either direction. Evidence that weakens the idea is as relevant as evidence that supports it.

### Evaluation

Evaluation begins when sufficient research exists to assess the idea against engineering criteria. The team examines architectural compatibility, value, complexity, explainability, maintainability, measurable benefit, risks, and remaining uncertainty.

Evaluation separates evidence from preference. An idea may be attractive, elegant, or widely supported and still fail to meet the project's requirements. Conversely, an initially unremarkable idea may demonstrate value when evidence is examined carefully.

The outcome of Evaluation is explicit. The idea may be accepted for planning, rejected, archived, or returned to research if a specific gap can reasonably be resolved. Evaluation does not itself place work on the roadmap or approve an architectural change.

### Accepted for Planning

Accepted for Planning means the idea has demonstrated enough value and compatibility to enter the formal engineering process. Its motivation, evidence, risks, and unresolved limitations are sufficiently understood to support planning or decision review.

This status is still not implementation approval. Acceptance recognizes that the idea deserves formal consideration. The appropriate governing document must determine whether, when, and under what constraints the project will act on it.

An accepted idea should retain a clear link to its research history. Formal planning must not remove negative findings or uncertainty simply because the idea has advanced.

### Roadmap / ADR

Roadmap / ADR means the idea has left the authority of the journal and entered an approved engineering process. If it represents a future stage of validated project evolution, it may be incorporated through roadmap governance. If it establishes or changes a significant engineering rule, boundary, or direction, it requires a decision record.

The journal entry remains as research history, but the authoritative statement exists in the governing document. If the journal and an approved record differ, the approved record controls. The journal should reference the formal outcome rather than duplicate or reinterpret it.

This transition occurs only after the requirements of the destination process are satisfied. Research acceptance alone cannot bypass milestone dependencies, architectural review, or decision approval.

### Rejected

Rejected means the idea has been evaluated and is not suitable for advancement under the known conditions. The reason may involve insufficient value, architectural conflict, unacceptable complexity, weak evidence, disproportionate risk, or a problem that does not require change.

Rejection is a documented conclusion, not a deletion. The entry preserves the evidence and reasoning so that the same concept does not require a complete new investigation later. It should also indicate which changed facts, if any, could justify reconsideration.

A rejected idea can still contribute valuable knowledge. It may reveal invalid assumptions, clarify project boundaries, or identify a question that should be approached differently.

### Archived

Archived means the idea is retained without active research or evaluation. Archival is appropriate when the idea lacks current relevance, depends on unavailable evidence, duplicates another entry, or cannot be assessed responsibly under present conditions.

Archived does not mean approved, rejected, or scheduled. It indicates that no active conclusion is being pursued. The reason for archival should be visible so that future contributors can determine whether changed conditions make the idea worth reopening.

An archived entry remains part of the journal's knowledge. It may return to Idea or Research only through an explicit status change supported by renewed motivation.

## 3. Idea Record Template

Every future idea uses a common record structure. A consistent format makes entries easier to understand, compare, research, and evaluate while keeping uncertainty visible. The template defines what information should be preserved; it does not define any actual idea.

### ID

The ID is the permanent identifier of the entry. It allows research notes, related ideas, evaluations, and formal outcomes to refer to the same concept without ambiguity. An ID is never reused, even when an idea is rejected, archived, or accepted into another process.

The identifier records identity only. It does not express priority, value, maturity, or expected order of consideration.

### Title

The title gives a concise and neutral description of the idea. It should help a reader recognize the subject without presenting the idea as an approved outcome or promised capability.

Titles should avoid persuasive language. The journal exists to support investigation, so the title should name the subject rather than advertise an expected benefit.

### Status

Status shows the current position in the idea lifecycle. It prevents preliminary thinking from being mistaken for active research, accepted planning, or an approved decision.

Status changes are explicit and supported by the relevant evidence or evaluation. An entry does not advance merely because time has passed or interest has increased.

### Date

The date records when the entry was created or entered its current significant state according to the journal's convention. It helps future readers understand the context in which the idea appeared and the sequence of later research.

The date is contextual information, not a deadline or schedule. It creates no expectation that the idea will be evaluated within a particular period.

### Motivation

Motivation describes the observation, uncertainty, limitation, or opportunity that caused the idea to be recorded. It explains why the question may be worth preserving before proposing what should be done.

The motivation should distinguish observed conditions from interpretation. A vague desire for improvement is not enough; the reader should understand which concern led to the idea, even when its significance is not yet proven.

### Description

Description states the idea at a conceptual level. It should be detailed enough for another contributor to understand what is being proposed for research, while remaining separate from implementation planning.

The description must not imply approval. Open alternatives and uncertain aspects should remain visible instead of being written as settled design.

### Expected Benefits

Expected Benefits records the value the idea might provide if its assumptions prove correct. Benefits should be connected to the stated motivation and expressed in terms that could eventually be evaluated.

At the idea stage, benefits are expectations rather than facts. The field should not overstate certainty or omit conditions required for the expected value to appear.

### Known Risks

Known Risks identifies possible negative consequences, trade-offs, constraints, and ways the idea could weaken existing qualities of the project. Recording risks early prevents evaluation from considering only the attractive side of a concept.

Risks may be uncertain, but their uncertainty should not be a reason to omit them. A risk that cannot yet be estimated can be recorded as a subject for research.

### Unknowns

Unknowns lists the questions that currently prevent confident evaluation. This field distinguishes missing evidence from disagreement and ensures that uncertainty is not hidden inside optimistic wording.

Unknowns should be specific enough to guide research. An entry with no acknowledged unknowns is unlikely to be an early-stage idea and should be examined for untested assumptions.

### Required Research

Required Research describes the evidence needed to evaluate the idea responsibly. It defines the questions to investigate, the type of observation that would be informative, and the limits of the research.

This field is not an implementation plan. Its purpose is to make uncertainty reducible through bounded investigation and to prevent open-ended exploration without a clear learning objective.

### Related Ideas

Related Ideas identifies journal entries that overlap, conflict, depend on one another, or address the same motivation from different directions. Relationships help preserve accumulated thinking and prevent duplicated research.

A relationship does not combine the authority or lifecycle of the entries. Each idea retains its own evidence, status, and evaluation unless an explicit decision is made to consolidate them.

### Notes

Notes preserves relevant observations that do not belong in the other fields, including research references, changes in understanding, negative findings, and contextual information discovered after the entry was created.

Notes should remain factual and dated when sequence matters. They supplement the record without silently replacing its original motivation or description.

### Standard Template

Future journal entries use the following conceptual template:

```text
ID:
Title:
Status:
Date:

Motivation:

Description:

Expected Benefits:

Known Risks:

Unknowns:

Required Research:

Related Ideas:

Notes:
```

The template should be completed with enough context to support independent understanding. Unknown or unavailable information should be stated explicitly rather than replaced with unsupported certainty. Empty fields should not be interpreted as evidence that no risk, unknown, or related concern exists.

## 4. Research Principles

Research begins with curiosity. The journal should make room for questions that challenge current assumptions or explore a potentially useful direction. Curiosity is disciplined by a clear learning objective: the purpose is to improve understanding, not to defend the initial idea.

Evidence comes before commitment. An idea should not enter formal planning because it sounds plausible, feels urgent, or has strong advocates. Research identifies what evidence would support or weaken the idea and gathers enough of that evidence to permit a reasoned evaluation.

Experiments are preferred to unresolved assumptions when a bounded experiment can provide meaningful evidence. An experiment should answer a specific question under declared conditions. It should not become hidden implementation or gradually expand until stopping would feel costly.

Research scope remains limited. Before investigation begins, the team should understand the question, relevant boundaries, expected evidence, and conditions for stopping. A broad subject may need to be divided into smaller research questions whose results can be interpreted independently.

Negative findings are documented. Evidence that an expected benefit does not appear, a risk is greater than expected, or an assumption is invalid is a successful research outcome. Removing negative results would distort future evaluation and encourage repeated investigation of the same failed premise.

Research should be reproducible. Another contributor should be able to understand the question, conditions, observations, and reasoning well enough to repeat or critically assess the work. Conclusions that depend on undocumented context or individual intuition remain weak evidence.

Research distinguishes observation from interpretation. What was observed, how it was evaluated, and what conclusion was drawn should remain separate. This allows future readers to reconsider the interpretation without losing the underlying finding.

The strength of a conclusion must match the strength of the evidence. Limited research can justify a limited conclusion, including the conclusion that more evidence is required. It should not be generalized beyond the conditions actually examined.

Failed research remains valuable because it reduces uncertainty. It can eliminate an unsuitable direction, reveal hidden constraints, improve future evaluation criteria, or show that a proposed benefit cannot be measured reliably. A failed hypothesis is not wasted work when its evidence and reasoning are preserved.

Research integrity is more important than advancing an idea. The objective is to understand whether the idea deserves commitment, not to produce a favorable outcome. An entry may become more valuable through a well-supported rejection than through premature acceptance.

## 5. Evaluating Ideas

Evaluation determines whether an idea has earned entry into the formal engineering process. It considers the complete body of research, including evidence that supports the idea, evidence that weakens it, unresolved uncertainty, and the consequences of making no change.

**Architectural compatibility** asks whether the idea respects approved responsibilities, boundaries, one-way flow, contract-based interaction, explainability, and reproducibility. If the idea requires an architectural change, that need must be explicit. The journal cannot authorize an exception to existing architecture.

**Engineering value** asks whether the idea addresses a demonstrated problem or creates a meaningful improvement in reliability, clarity, control, knowledge, or maintainability. Interest and novelty are not sufficient evidence of value.

**Expected complexity** considers the conceptual burden, new dependencies, operational consequences, and long-term cost the idea may introduce. Complexity is evaluated against the importance of the problem and the strength of the expected benefit. An idea can be feasible and still be unjustified.

**Explainability** asks whether the idea and its effects can remain understandable. The team should be able to explain why the capability exists, how its outcomes are interpreted, where uncertainty remains, and how it fits within the existing processing model.

**Maintainability** considers whether the project can support the idea over time without relying on hidden knowledge, fragile assumptions, or disproportionate ongoing effort. A short-term benefit may be rejected when it creates an unclear or persistent burden.

**Measurable benefit** asks whether the expected value can be observed and compared against a meaningful baseline. If the benefit cannot be distinguished from normal variation or subjective preference, acceptance would rest on weak evidence.

**Required evidence** determines whether the research is sufficient for the significance of the proposed change. Ideas with broader consequences require stronger evidence and a clearer account of risk. Lack of evidence should result in more bounded research, archival, or rejection rather than optimistic acceptance.

Evaluation also considers opportunity cost without turning the journal into a priority list. Attention given to one uncertain direction is attention unavailable for other validated work. An idea should therefore justify not only its potential value but also the cost of continued investigation.

Attractive ideas may still be rejected. An idea can be elegant, promising, or conceptually aligned and still lack measurable benefit, introduce excessive complexity, depend on unsupported assumptions, or arrive before its prerequisites exist. Rejection under current conditions does not deny that the concept may become relevant later.

Acceptance requires a balanced conclusion. The evaluation should state why the evidence is sufficient, which risks remain, and which conditions must be preserved during formal planning. It must not remove uncertainty simply to make the transition easier.

## 6. Relationship with Other Documents

This journal has no authority over the governing documents of Crypto Agent Lab. It records exploration only. An idea influences the project after it passes research, evaluation, and the appropriate formal engineering process.

### MASTER_CONTEXT

MASTER_CONTEXT defines the project's mission, vision, philosophy, principles, scope, goals, success criteria, and development philosophy. Every idea is interpreted within those boundaries. The journal cannot broaden project scope or redefine the project's purpose.

An idea that conflicts with MASTER_CONTEXT is not accepted by being recorded here. It must either be rejected, reframed to fit the approved context, or become part of an explicit proposal to revise the governing document through the appropriate process.

### DEVELOPMENT_RULES

DEVELOPMENT_RULES defines how the team conducts engineering work, makes decisions, documents results, tests behavior, uses assistance, and manages change. Research recorded in this journal must follow those standards where they apply.

The journal does not create an alternative path around engineering discipline. Curiosity permits uncertainty, but it does not justify hidden scope, undocumented assumptions, or unreviewed commitments.

### ARCHITECTURE

ARCHITECTURE defines approved responsibilities, boundaries, interaction principles, processing direction, and constraints. Ideas may explore possibilities that would affect architecture, but they do not change it.

If evaluation shows that an architectural change may be justified, the result must enter the decision process. Until a replacement decision is approved and the architecture is updated, the existing architecture remains authoritative.

### ROADMAP

ROADMAP defines the validated engineering order in which the platform evolves. Journal entries are not roadmap candidates merely because they are documented or researched.

Only an idea accepted for planning can be considered through roadmap governance. It must still respect milestone dependencies, completion requirements, checkpoints, and the current stage of project maturity. The journal cannot create priorities or schedules.

### DECISIONS

DECISIONS preserves approved architectural and engineering choices with their context, alternatives, and consequences. The journal may provide research evidence for a proposed decision, but it cannot approve or replace one.

When an idea becomes the subject of a decision record, the journal preserves the exploratory history and the decision log becomes authoritative for the chosen direction. The two documents should reference their relationship without duplicating authority.

The separation among these documents is intentional. MASTER_CONTEXT governs purpose, DEVELOPMENT_RULES governs engineering conduct, ARCHITECTURE governs conceptual structure, ROADMAP governs validated evolution, DECISIONS governs durable choices, and this journal preserves exploration. An entry moves from influence to authority only through the relevant governing process.

## 7. Long-Term Knowledge

Over time, the journal should become a structured record of how the project's understanding developed. Its value comes not only from ideas that advance, but from the full pattern of questions, evidence, uncertainty, rejection, and renewed interest.

Rejected ideas remain useful. They preserve which approaches were examined, why they were unsuitable under known conditions, and what evidence informed that conclusion. Future contributors can avoid repeating the same work or can identify precisely which changed conditions justify reconsideration.

Repeated ideas may indicate persistent demand. When similar motivations appear independently over time, the pattern can reveal an unresolved need or a limitation that was previously too weak to justify action. Repetition does not create approval, but it can strengthen the case for focused research.

Research history has value beyond the status of an individual entry. Methods that produced useful evidence, assumptions that repeatedly failed, and unknowns that affected several evaluations become part of the project's general engineering knowledge. This history improves the quality of future questions.

Exploration reduces future uncertainty. Even when no action follows, a bounded investigation can narrow the set of plausible options, reveal dependencies, and clarify what evidence would be required later. The project becomes better prepared to respond when conditions change.

The journal should preserve original context while allowing later notes and relationships to accumulate. Earlier entries should not be rewritten to appear more accurate in hindsight. New evidence belongs in dated notes, research updates, evaluations, or related records so that changes in understanding remain visible.

Archived and rejected entries should remain discoverable. Removing them would erase negative knowledge and make the journal favor accepted ideas artificially. A complete research history gives a more honest view of how the project evaluates uncertainty.

As the journal grows, consistency becomes increasingly important. Stable identifiers, lifecycle states, common fields, and explicit relationships allow contributors to navigate accumulated knowledge without confusing old exploration with current authority.

The journal becomes more valuable when it helps the team ask better questions, recognize recurring concerns, and evaluate new proposals using prior evidence. Its purpose is not to predict the future correctly. Its purpose is to ensure that future decisions begin with more knowledge and less avoidable uncertainty than earlier ones.
