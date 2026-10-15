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

The classes `dossierLabel` and `dossierStamp` contain editable text; neither is an official classification or logo. Existing notes, timelines and other DG buttons remain available. Ritual and the additional field layouts below are also available.

## Reference review

References below use the supplied PDFs' page numbers (PDF viewer numbering); printed page numbers are given where verified. These are layout observations, not reproduced content.

| Reference | Observed treatment | Implementation or possible addition |
| --- | --- | --- |
| Handler's Guide, PDF p. 158 / printed p. 156 | Ruled serif tome headings, italic study details, inset quotations, bold ritual labels | Implemented as Unnatural Tome. |
| Handler's Guide, PDF p. 39 / printed p. 37 | Pink typewritten dossier insert, punched/perforated margin and small administrative labels | Implemented as Pink Background, using original CSS paper decoration. |
| Agent's Handbook, PDF p. 129 / printed p. 127 | Dark green advice box with light sans-serif text and rough edges | Implemented as Handler Advice. |
| Agent's Handbook, PDF p. 129 / printed p. 127 | White-bordered photograph held by translucent tape | Implemented as Evidence Photo with optional tape, caption and credit. |
| A Night at the Opera, PDF p. 24 | Standalone briefing sheet with a large heading and dated two-column events | Implemented as Briefing Handout, with metadata and two internal columns. |
| Agent's Handbook, PDF p. 14 | Dark green chapter divider with a centered heading and photo | Implemented as Chapter Opener, with optional user-supplied artwork. |
| A Night at the Opera, PDF p. 177 | Stacked maps/plans with clear captions and paper backing | Implemented as Map Sheet, with a numbered legend and source caption. |

## Additional DG menu components

All six components below have source examples, rendered previews and customization instructions on **pages 11–16 of the opening website guide**. They use Standard (V3) with the Delta Green theme. Examples contain editable placeholders, not official game rules.

| Menu entry | Class / options | Purpose |
| --- | --- | --- |
| Ritual | `ritualEntry`; optional `wide` | Ruled title, italic study/activation requirements, test, effects and consequences. Reference: Handler's Guide PDF p. 176 / printed p. 174. |
| Handler Advice | `advicePanel`; optional `wide` | Dark green guidance panel with light text. Enable print backgrounds. |
| Evidence Photo | `evidencePhoto,taped`; optional `wide` | White photo frame, tape, `evidenceCaption` and `evidenceSource`. Remove `taped` for a plain photograph. |
| Chapter Opener | `chapterOpener,wide`; `compact` for a smaller insert | Green chapter divider, title, subtitle and optional image. Use a fresh page and a page break after the block. The running header and disclaimer are preserved. |
| Briefing Handout | `briefingSheet,wide` with `briefingColumns` | Paper handout with metadata and two internal columns. Removing `wide` gives one internal column. |
| Map Sheet | `mapSheet,wide` with `mapCaption` and `mapLegend` | Contained map image, caption, numbered legend and source credit. Remove `wide` for a column plate. |

Photo and map snippets include original bundled SVG placeholders, so inserting a snippet requires no external image service. Replace the Markdown image URL and alt text with your own image. Images are scaled without cropping. Legend numbers are editable text: they do not place markers onto an uploaded map. Credits should identify your image source.

A chapter opener has a minimum height of 20 cm and should occupy its own page. Its `compact` variant is used in the guide. Long content in any panel still needs manual page breaks: close a block, add `\page`, and reopen it on the next page. Keep the disclaimer area clear. Blank or very long captions and unusual image aspect ratios should be checked in print preview.

Existing monster stat-block templates are retained; their rules/fields have not been redesigned in this change.
