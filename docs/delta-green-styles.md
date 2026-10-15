# Delta Green document styles

Choose **Standard (V3)** and the **Delta Green** theme. The **DG** menu inserts editable examples. These styles use original CSS and placeholder text; no book artwork or passages are bundled.

## Unnatural Tome

**DG > Unnatural Tome** inserts `{{unnaturalTome ... }}` with a ruled serif title, italic language/study/game-effect details, an optional blockquote excerpt, a description, and a recommended-rituals line. Replace every bracketed placeholder. Remove the excerpt if not needed. Add `,wide` to the outer block for a full-width entry. Long entries should be split manually at a page break.

```markdown
{{unnaturalTome
### Title of the tome
{{tomeDetails
*In [language]. Study time: [duration]. Unnatural +[value]%, SAN loss [dice].*
}}

> Your own excerpt, if desired.

Describe the document and its provenance.

{{tomeRituals
**Recommended rituals:** None.
}}
}}
```

## Pink Background

**DG > Pink Background** inserts a rose-colored dossier sheet with a perforated margin, simulated punched holes, typewritten text, a heading and an editable stamp. It is a content-sized paper insert, rather than a recoloring of the entire page. The supplied `,wide` spans both columns; remove it for a column-sized insert. The paper stays upright so its text remains inside its allocated space. Enable background graphics when printing; split oversized sheets manually across pages.

```markdown
{{pinkBackground,wide
{{dossierLabel RESTRICTED BRIEFING}}
##### Subject / file title

Your briefing goes here.

{{dossierStamp WORKING COPY}}
}}
```

The classes `dossierLabel` and `dossierStamp` contain editable text; neither is an official classification or logo. Existing notes, timelines and other DG buttons remain available. Ritual remains a separate unfinished snippet.

## Reference review and future candidates

References below use the supplied PDFs' page numbers (PDF viewer numbering); printed page numbers are given where verified. These are layout observations, not reproduced content.

| Reference | Observed treatment | Implementation or possible addition |
| --- | --- | --- |
| Handler's Guide, PDF p. 158 / printed p. 156 | Ruled serif tome headings, italic study details, inset quotations, bold ritual labels | Implemented as Unnatural Tome. |
| Handler's Guide, PDF p. 39 / printed p. 37 | Pink typewritten dossier insert, punched/perforated margin and small administrative labels | Implemented as Pink Background, using original CSS paper decoration. |
| Agent's Handbook, PDF p. 129 / printed p. 127 | Dark green advice box with light sans-serif text and rough edges | A dedicated advice/caution panel would complement the existing yellow notes. |
| Agent's Handbook, PDF p. 129 / printed p. 127 | White-bordered photograph held by translucent tape | A reusable evidence-photo component with caption and optional tape would reduce manual image positioning. |
| A Night at the Opera, PDF p. 24 | Standalone briefing sheet with a large heading and dated two-column events | A briefing-handout template would extend the existing timeline with a page-sized document layout. |
| Agent's Handbook, PDF p. 14 | Dark green chapter divider with a centered heading and photo | A chapter-opener template with user-supplied artwork. |
| A Night at the Opera, PDF p. 177 | Stacked maps/plans with clear captions and paper backing | A map/evidence plate with numbered annotations and source captions. |

The books also have compact ritual and character entries. A dedicated ritual block (cost, test, effects and consequences) is the next natural replacement for **Ritual (TODO)**. The current monster snippets should be audited separately for remaining fantasy-specific fields before expanding them.
