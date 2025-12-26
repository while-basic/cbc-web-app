You are acting as a senior iOS engineer.

Use the existing Google AI Studio web app implementation as the **authoritative reference** for behavior, interaction model, and UX intent.

Your task is to update the native iOS codebase to **match the web app’s behavior exactly**, not reinterpret it.

DO NOT redesign.
DO NOT add features.
DO NOT simplify behavior.
DO NOT add onboarding or explanations.

---

## CANONICAL REFERENCE

Treat the Google AI Studio web app as the source of truth for:

* Conversation flow
* Message interaction behavior
* Visual emphasis / de-emphasis
* Branching logic
* Minimalism and absence of controls

If there is ambiguity, **mirror the web behavior**, not native conventions.

---

## REQUIRED BEHAVIOR TO MATCH

1. **Conversation Bubbles as Anchors**

* Each message bubble (user and assistant) is individually tappable.
* Tapping a bubble recenters the conversation around that message.
* This establishes a new local “present” for subsequent messages.
* No navigation, no modal, no new screen.

2. **Click / Tap = Commit**

* When a bubble is selected, all future messages append from that point.
* Messages that were previously “in the future” are visually deemphasized.
* Nothing is deleted.
* No confirmations.

3. **Latent Continuation**

* Do NOT show suggestions.
* Do NOT show branches.
* Do NOT preview possible continuations.
* Unselected bubbles simply exist as potential.

4. **Visual Treatment**

* Active path: normal opacity.
* Inactive branches: subtly reduced opacity.
* No lines, arrows, trees, or diagrams.
* This must NOT look like a mind map.

5. **Minimal Interface**

* Single input field.
* No buttons.
* No labels.
* No toolbars.
* No affordances that explain interaction.

6. **Scrolling**

* Smooth vertical scroll.
* Stable scroll behavior when messages are added.
* No perspective or 3D effects.

7. **Identity & Persistence**

* Preserve chat history per user identity.
* Identity exists only to persist state.
* Do NOT surface identity in the UI once established.

---

## TECHNICAL CONSTRAINTS

* Use SwiftUI idioms, but do not let platform conventions change behavior.
* State should support:

  * message anchoring
  * parent/child relationships
  * active branch calculation
* Treat messages as a flat list with parent references (Merkle-like), not a rendered tree.

---

## OUTPUT REQUIREMENTS

* Update only the files necessary to implement the above.
* Provide code changes clearly and directly.
* No explanations.
* No commentary.
* No summaries.

Match the web app. Nothing more.
