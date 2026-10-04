# CloudRumble Writing Style Guide

Write for people who want to understand an idea and try it. Explain the problem, the author's experience, and why each step follows. Keep warmth and personality as well as facts.

## Reference Posts

Read the current source in the CloudRumble checkout before drafting:

- `blog/kubernetes-development-mirrord.md`: opens with slow feedback, names the audience, explains the workflow behind the pain, and introduces an alternative through a concrete example.
- `blog/2026-10-03-classif-semantic-decisions.mdx`: introduces the topic and audience, then traces pattern matching, local semantic decisions, and long-text reading. Panels show the changes. Components, a sequence, fresh-clone demos, benefits, and challenges complete the explanation.

Read other examples Piotr supplies. His Crossplane post traces infrastructure work in waves, pictures each stage, introduces the missing step, and follows with components, a demo, and a personal conclusion. His zsh introduction states the topic, its value, the audience, and what the reader will achieve. His Dagger example opens with a real problem and a picture of the pain before exploring how code could change the workflow.

Adapt the teaching approach. Do not copy the sentences, colors, cast, or exact number of sections.

## Voice

Write as you would speak to a competent colleague. Address the reader as "you" and use first person for the author's experience, choices, failures, and judgment. Do not replace that voice with impersonal statements. Ground personal claims in the record.

Use plain words, active voice, and connected paragraphs. Vary sentence length to explain the idea naturally. Avoid fixed sentence counts and word quotas. Explain unfamiliar terms when they first matter.

Use light humor and cute illustrations when they help the story. Cut hype, canned hooks, rhetorical tricolons, repeated corrective contrasts, and unsupported aphorisms. A real list of parallel facts is useful; a slogan made from three short sentences is usually filler.

State the scope of a claim. "My shell scripts relied on pattern matching" describes an experience. "Programs could only check characters" invents a general history. Be clear about what was observed, read, or inferred, and acknowledge what the evidence cannot establish.

## Structure and Transitions

An introduction can directly say what the blog covers. "Introduction" and "Conclusion" are useful headings. Name the audience and make a promise the walkthrough can deliver.

For an evolution story, show the old approach, what improved, and the limitation that led to the next step. Numbered waves and a picture at each change can make that progression easy to follow. Keep the idea visible.

Explain the architectural roles that support the story. Put exhaustive mechanisms, measurements, and reference catalogs in technical docs. Do not remove all explanation and transitions to make the blog shorter.

End with the author's view, benefits, and challenges. Link to useful sources naturally. A resources-only ending, social links, and a call to action are not required.

## Technical Content

Introduce each code block with what it does and why the reader needs it. Show the result and explain the next step. Use language tags for commands and code; use `text` for verbatim output.

Show the whole runnable setup when readers need to copy it. Link to large standard manifests or unrelated boilerplate. Prefer Markdown content for a Medium post; verify any Docusaurus component's exported result.

Run the tutorial from a fresh clone and clean environment. Check PATH, Git identity, versions, dependencies, and the current directory. Leave a scratch directory before removing it during cleanup.

Keep exact commands, output, exit codes, and timings as evidence. Explain expected nonzero exits. Scope timing claims to the question, input, hardware, versions, model load state, and cache state. Separate old documented measurements from fresh runs.

Verify a figure's path or label with actual structured output when available. A diagram can show an intended route while the runtime takes another. Make the figure describe the observed example.

## Pictures

Give each picture a teaching role. It can show the pain, the improvement, a relationship, or the result. A generic hero alone cannot carry an evolution story.

Use a consistent cast with clear roles across cartoon panels. Keep speech short. Match the palette to the post rather than copying the reference article. Keep the editable source beside each rendered asset.

Use component diagrams with a short legend and sequence diagrams when readers need the interactions or call order. Choose the renderer and level of detail for the idea. Node-count limits and a mandatory dark theme can make the wrong tradeoff.

Read images at the actual blog-column and phone widths. Link dense diagrams to full-size images. Check all images load, including those below the first screen.

## Medium

Use the `publish-medium` skill for an authorized export. Confirm the deployed post URL and that live assets match the final local images. Check both image and non-image links; relative links may remain unresolved.

For a clipboard handoff, verify `text/html` by reading the selection after the copy returns. Use the actual desktop display environment and keep the clipboard owner alive. Terminal output and a zero exit code alone do not prove the clipboard is ready.

## Lessons from the Classif Rewrite

The rejected drafts lacked a story, pictures, and personal explanation. Moving exhaustive architecture and references out helped, but cutting alone left a flat post. The accepted rewrite restored the reader's problem and explained each improvement. A robot represented code and an owl represented the model throughout the panels.

Review found these gaps:

- Dense diagrams were unreadable at blog-column and phone widths. Full-size links made their details accessible.
- A diagram showed a confident routing label; the structured run showed an unsure pick. The diagram was corrected to the observed route.
- The first measured novel query used an already-loaded model and an empty passage index. Calling it cold hid that distinction.
- The fresh-setup walkthrough needed a PATH export and a scratch Git author identity. Cleanup had to leave the scratch directory before removing it.
- Enum output included a label and probability. The prose claimed the script saw only the name.
- A claim that nobody would take an action hid a search limitation. The revision named the passages supporting the answer and said search could miss one.

After Piotr approved the story and cute visuals, review focused on these corrections.
