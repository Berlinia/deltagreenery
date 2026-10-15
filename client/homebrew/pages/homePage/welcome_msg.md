# Welcome to Delta Greenery

This is a working document. **The editor on the left is the source of everything you see on the right.** Change a word, a heading or an image and watch the page respond. You can learn a layout by looking at its Markdown, without a second copy of the code in the preview.

Choose **New** to begin an operation. This local installation saves documents through its server and MongoDB database. Save your changes before leaving the editor.

## Give your document a name

Open the **information-circle tab** and set **Title** in Document properties. That name appears at the top right of each page and identifies the saved document.

The main heading in the text is different: it names a section and appears at the top left until the next main heading. You do not need a heading to name your document.

## Explore the editor

- **Text:** the Markdown you are reading now.
- **Paintbrush:** the document's CSS and appearance.
- **Snippet tab:** your reusable passages.
- **Information circle:** title, theme and renderer.
- **DG menu:** ready-made Delta Green layouts.
- **Print / PDF:** a printable version of your work.

\column

## Find an example

Follow a page link, then find the matching heading in the editor. The examples are editable: replace their text, duplicate a block or insert a fresh version from the menu.

| Page | Explore |
|:---:|:---|
| [2](#p2) | Text, lists and links |
| [3](#p3) | Images and tables |
| [4](#p4) | Page layout |
| [5](#p5) | Timelines |
| [6](#p6) | Notes and DG tools |
| [7](#p7) | Advanced formatting |
| [8](#p8) | Saving and printing |
| [9](#p9) | Unnatural Tome |
| [10](#p10) | Pink Background |
| [11](#p11) | Ritual |
| [12](#p12) | Handler Advice |
| [13](#p13) | Evidence Photo |
| [14](#p14) | Chapter Opener |
| [15](#p15) | Briefing Handout |
| [16](#p16) | Map Sheet |
| [17](#p17) | Typography and decoration |

{{note
##### Start with the Delta Green theme
These examples use **Standard (V3)** and **Delta Green**. Select them in Document properties to get the same appearance.
}}

{{pageNumber,auto}}

\page

# Text and links

## Emphasis

A normal sentence can contain **bold emphasis**, *italic emphasis*, ***bold and italic***, ~~a struck-out phrase~~ and `literal code`.

Paragraphs are separated by blank lines. A new paragraph after another paragraph receives an indent, while the first paragraph beneath a heading starts flush left.

### A smaller heading

Headings organize your operation into sections. Their size and appearance change with their level; compare the headings on this page with their source on the left.

#### A detail within the section

Use the smaller levels for locations, encounters and individual pieces of evidence.

## Lists

- A cassette in a sealed envelope.
- A photograph of the station.
  - A handwritten date on the reverse.
- An unsigned duty log.

1. Contact the witness.
2. Visit the station.
3. Compare the recordings.

\column

## Links and quotations

Visit [Delta Greenery on GitHub](https://github.com/Berlinia/deltagreenery), or continue to [images and tables](#p3).

> The telephone rang once.
> Nobody answered.

## Small details

A reference can use superscript^1^; a formula can use subscript, as in H^^2^^O. References are written manually, rather than managed automatically.

:-: A centered line.

-: A right-aligned line.

Handler :: The person running the operation.

---

- [x] Secure the evidence.
- [ ] Interview the witness.

Change a checkbox in the editor to mark it complete. Horizontal rules and short lists can separate stages of an investigation.

<!-- This editing note is visible in the source, but not on the printed page. -->

Comments can hold editing notes that do not print. They still travel with exported Markdown, so do not use them to hide information from someone receiving the source file.

{{pageNumber,auto}}

\page

# Images and tables

## A picture in the document

![A placeholder evidence photograph](/assets/dg-photo-placeholder.svg){width:300px}

Replace this image's address in the editor with a **direct, publicly accessible HTTPS image URL**. The description beside the address supplies its alternative text.

The website does not upload image files. A normal Drive sharing link points to a webpage, not directly to an image. Images must remain reachable when you view or print the document.

## Shape the layout

The image above fits its column. The **Images** menu offers wrapped images, backgrounds, watermarks and other arrangements. Insert an option and replace its picture to see how it behaves.

A wrapped image lets text flow around it; an absolutely positioned image stays at a chosen place on the page. Check these layouts after changing the page size.

For a photograph with a caption and tape, see [Evidence Photo](#p13). For a titled map and legend, see [Map Sheet](#p16).

\column

## An evidence inventory

| Evidence | Location | Count |
|:---|:---:|---:|
| Cassette | Locker 4 | 2 |
| Photograph | Platform | 1 |
| Duty log | Office | 3 |

Tables keep repeated information easy to scan. Add or remove rows in the editor; the heading and separator rows define the columns.

## Spanning cells

| Item | Location | Status |
|---|---|---|
| All evidence recovered |||
| Cassette | Station | Sealed |

A single cell can stretch across several columns. The **Tables** menu offers further starting points, including tables that span the full page.

| Evidence | Status |
|---|---|
| Cassette | Found |
| recording ^| Reviewed |

This last example combines the first cell across two rows. Use merged cells sparingly so the table remains easy to read.

Ordinary tables sit flat on the paper. A [loose-paper table](#p17) adds a tilted insert when the document calls for it.

{{pageNumber,auto}}

\page

# Page layout

{{wide
## A discovery across both columns
This passage spans the printable width. Wide blocks are useful for timelines, large pictures and information that needs room to breathe.
}}

## Pages and columns

This guide uses deliberate page and column breaks. The **Text Editor** menu can insert either at the cursor. Their positions are visible in the editor.

A page has fixed printable dimensions. Extra text does not automatically create a new page: add a break when needed and check the preview for overflow.

## A little breathing room

There is a spacer below this sentence.

::::

Spacing can separate an illustration or a short handout from the surrounding text. Prefer a clear page layout to large runs of empty space.

{{border:1px solid #596453,padding:12px
**An inset block** can hold ordinary Markdown, including lists and emphasis.
}}

\column

## Colour and emphasis

The file is marked {{color:#7c2424 CLASSIFIED}}. Inline styling affects only the selected words, while a block groups a whole passage.

## Page furniture

The number at the bottom of this page is part of the source. The **Page Numbering** menu offers automatic and fixed numbers, skipped counts and restarts.

A footnote block is a positioned footer label, not an automatic citation system. Keep footer labels short so they leave room for the publication disclaimer.

## Contents and index

**Text Editor > Table of Contents** builds a contents list from your headings. Regenerate it after major changes. An experimental Index generator is also available.

## Paper size

Page-size options live in the **paintbrush tab**. Choose the same paper size when printing. Changing size affects line wrapping and the amount of text that fits on each page.

Keep each panel together. If a panel needs another page, finish it and begin a new one after the break.

{{pageNumber,auto}}

\page

# Timelines

Choose **DG > Timeline** to insert a chronology. Dates stand out from the event descriptions, and stage headings separate parts of an investigation.

{{timeline,wide
##### THE INVESTIGATION

- **14 OCT, 08:00:** The agents arrive at the abandoned station.
- **14 OCT, 09:30:** A witness reports a light beneath the platform.

##### AFTER DARK

- **14 OCT, 21:00:** The signal returns. No trains are scheduled.
}}

{{wide
## Build the sequence
Replace the dates and events in the editor, or duplicate an event to add another. Keep adjacent events together for a compact list.

For a longer investigation, use several timelines on separate pages. A timeline should end before the page footer; it does not continue itself onto another page.
}}

{{pageNumber,auto}}

\page

# Delta Green tools

## Disinformation

{{note
##### The witness account
The witness remembers a train. There were no trains that night.

**Handler only:** the signal was real.
}}

Choose **DG > Disinformation** for a note like this, or **Disinformation Wide** for one spanning both columns. Notes accept lists, tables and emphasis.

## A descriptive panel

{{descriptive
##### The room
A cold receiver rests beside the bed. Its cord ends at the door, cleanly cut. Somewhere inside the wall, a telephone is ringing.
}}

Boxed descriptions separate a location or read-aloud passage from the surrounding investigation.

## Credit your images

The **Artist Credit** option adds an attribution you can position near an illustration. A credit identifies the creator; it does not grant permission to use their work.

\column

## Choose a layout

- [Timeline](#p5): dated events and stages.
- [Unnatural Tome](#p9): a document or book entry.
- [Pink Background](#p10): a typewritten dossier insert.
- [Ritual](#p11): requirements, effects and costs.
- [Handler Advice](#p12): guidance kept visually separate.
- [Evidence Photo](#p13): a photograph, caption and credit.
- [Chapter Opener](#p14): a major section divider.
- [Briefing Handout](#p15): objectives and case details.
- [Map Sheet](#p16): a plan with a caption and legend.
- [Typography](#p17): framed titles and paper tables.

## Stat blocks

The DG menu also offers framed, unframed and wide monster stat blocks. These are editable starting points; some buttons remain works in progress. Replace inherited placeholder fields with the information your scenario needs.

The templates provide layout, not validated game rules or official content.

{{pageNumber,auto}}

\page

# Advanced formatting

## Document appearance

The **paintbrush tab** accepts CSS for this document. Inline styles can also give a particular passage its own appearance, as in the evidence panel below. Its source is visible in the editor.

{{border-left:3px solid #742f25,padding:10px,background:#ffffff50
**Evidence A:** a damaged cassette recovered from the station locker.
}}

## Fonts and printing

The **Fonts** menu inserts styled text. Print options in the Style tab include **Ink Friendly**; check the result before printing artwork or coloured panels.

\column

## Repeated information

[operation]: BLACK LANTERN

This is the briefing for **$[operation]**. Every reference to **$[operation]** can share one value in the source.

## Your own snippets

The snippet tab holds reusable Markdown. Name a snippet there, then return to Text and use **Brew Snippets** to insert a copy at the cursor. Changing a template does not rewrite existing copies.

## Beyond Markdown

Simple HTML can supplement your text. Active scripts and embedded frames are removed from the preview. Citations and reference lists are maintained manually.

{{pageNumber,auto}}

\page

# Save and print

## Local documents

This installation uses a local server and MongoDB. Save your document through the editor before leaving it. The public website's browser drafts and personal Drive controls are a separate version of the application.

Keep backups of your local database and important documents. The preview itself is not a backup.

## Print / PDF

Choose the print control and the browser's **Save as PDF** destination. Match the document's paper size, turn off browser headers and footers, and enable background graphics to preserve paper textures.

Inspect every page before printing. Full-page chapter openers fill the PDF page; physical edge-to-edge printing requires a borderless-capable printer.

\column

## Check the layout

If text falls off a page, add a deliberate page or column break. Split a long panel into separate blocks rather than pushing it into the footer.

A blank image usually means its direct URL is unavailable or requires a login. Images must remain reachable when printing.

## Rights and credits

**License > Delta Green** inserts the rights notice and publishing guidelines. Replace the author placeholder before publishing. License snippets are templates; check that your chosen license applies.

The Arc Dream Publishing disclaimer appears below the normal content on every page, including full-page chapter openers.

{{pageNumber,auto}}

\page

# Unnatural Tome

Choose **DG > Unnatural Tome** for a document entry with a ruled serif title, italic study details, an optional quotation and a recommended-rituals line.

{{unnaturalTome
### Title of the tome
{{tomeDetails
*In [language]. Study time: [duration]. Occult +[value]%, Unnatural +[value]%, SAN loss [dice].*
}}

> An optional excerpt from your own fictional document goes here.

Describe the document's author, physical condition, provenance, and the unsettling knowledge it contains. Replace all bracketed fields with the details for your scenario.

{{tomeRituals
**Recommended rituals:** [Names of rituals, or None.]
}}
}}

\column

## Customize the entry

Replace the sample details with your own document. The study values are placeholders, not game rules. Keep the quotation only when it adds something to the entry.

A ruled title introduces the tome. Italic study details sit beneath it, followed by a description and a compact rituals label.

The example fits one column. A wide entry can span both; keep long entries clear of the footer and continue them in a new block on the next page.

{{pageNumber,auto}}

\page

# Pink Background

Choose **DG > Pink Background** for a typewritten dossier on rose paper, with a perforated margin and editable labels. The panel grows with its text; it does not recolor the whole page.

<!-- A pink dossier insert. Remove ,wide for a single-column insert. Split long inserts across pages manually. -->
{{pinkBackground
{{dossierLabel RESTRICTED BRIEFING}}
##### Subject / file title

**FILE:** [Reference number]<br>
**STATUS:** [Assessment]

Write your briefing here. This panel grows with its contents; the pink sheet stays behind the text.

- Summarize the evidence.
- Record the unresolved questions.
- State the next action.

{{dossierStamp WORKING COPY}}
}}

\column

## Customize the sheet

The menu inserts a full-width sheet. This example uses a single column for a smaller dossier insert.

Edit the classification, subject and stamp to suit your briefing. Lists, emphasis and tables work inside the sheet.

Keep each insert on one page. Close the block before a page break and start another insert for longer briefings. Enable **background graphics** in the print dialog for the pink paper.

{{pageNumber,auto}}

\page

# Ritual

Choose **DG > Ritual**. Study and activation details use italic text below a ruled title. Replace the bracketed fields with the rules for your scenario; the template supplies no game mechanics.

{{ritualEntry
### Ritual name
{{ritualDetails
*[Complexity]. Study: [duration]; [SAN cost]. Activation: [duration]; [WP cost], [SAN cost].*
}}

**Requirements:** Describe the knowledge, materials and conditions required.

**Test:** State the activation test or other resolution procedure.

**Effect:** Describe the outcome, range and duration.

**Consequences:** Describe failure, side effects and lasting costs.
}}

\column

## Customize

Organize the ritual around its requirements, test, effect and consequences. Use the labels to help the Handler find the information during play.

These are Standard (V3), Delta Green layouts. Keep each block within one page; close it before adding a page break.

Next: [Handler Advice](#p12).

{{pageNumber,auto}}

\page

# Handler Advice

Choose **DG > Handler Advice**. A dark green panel separates Handler guidance from the main text. The light sans-serif text remains readable against its muted background.

{{advicePanel
##### Handler advice
Keep this information separate from the player briefing.

- State the immediate concern.
- Give a practical response.

**Remember:** Replace this example with your own advice.
}}

\column

## Customize

Give the panel a short heading and practical advice. Lists and links work here too. Enable background graphics when printing to preserve the dark green paper.

These are Standard (V3), Delta Green layouts. Keep each block within one page; close it before adding a page break.

Next: [Evidence Photo](#p13).

{{pageNumber,auto}}

\page

# Evidence Photo

Choose **DG > Evidence Photo**. A white photo border, two translucent tape strips, a caption and a credit line create an evidence photograph. The bundled illustration is an original placeholder.

{{evidencePhoto,taped
![Replace with your photograph](/assets/dg-photo-placeholder.svg)

{{evidenceCaption
**EXHIBIT A / 01** — Describe what the photograph shows.
}}
{{evidenceSource Source: [creator / credit / date]}}
}}

\column

## Customize

Replace the picture with your own image and give it a meaningful description. The tape is optional. The frame contains the whole image without cropping, with the caption and credit underneath.

These are Standard (V3), Delta Green layouts. Keep each block within one page; close it before adding a page break.

Next: [Chapter Opener](#p14).

The next page shows a full-bleed **Chapter Opener**. Choose it from the DG menu and give it its own page. Its background extends beyond the normal margins; the title, picture and disclaimer stay safely inside.
{{pageNumber,auto}}

\page

<!-- DG > Chapter Opener creates a full-bleed page. Keep it on its own page; the background reaches every edge, while text and the disclaimer remain inset. Add ,compact for a normal inset panel. -->
<!-- Start on a fresh page. Add a page break AFTER the closing block. -->
{{chapterOpener,wide
{{chapterKicker CASE FILE / 01}}
### Chapter Opener

A full-page divider for the next stage of your operation.

{{evidencePhoto,taped
![Replace with your chapter image](/assets/dg-photo-placeholder.svg)
{{evidenceCaption Your image caption}}
}}

{{chapterFooter UNOFFICIAL SCENARIO / WORKING COPY}}
}}

{{pageNumber,auto}}

\page

# Briefing Handout

Choose **DG > Briefing Handout**. An inset paper briefing with file metadata, objectives, dated events and open questions. It complements the Timeline snippet with a complete handout structure.

{{briefingSheet
### Operation / briefing title
{{briefingMeta Prepared by: [name] · Date: [date] · File: [reference]}}

{{briefingColumns
##### Situation
Summarize the incident and the information available to the agents.

##### Objectives
- Establish what happened.
- Secure the relevant evidence.

##### Chronology
- **08:00:** Initial report received.
- **09:30:** Team arrives at the scene.

##### Open questions
List the gaps in the briefing and the next steps.
}}
}}

\column

## Customize

The menu inserts a full-width briefing with two internal columns. This example is a smaller, single-column handout. Adapt its headings and objectives to the assignment; split long briefings across pages.

These are Standard (V3), Delta Green layouts. Keep each block within one page; close it before adding a page break.

Next: [Map Sheet](#p16).

{{pageNumber,auto}}

\page

# Map Sheet

Choose **DG > Map Sheet**. A paper-backed map with a title, figure caption, numbered legend and source credit. The bundled schematic is only a placeholder.

{{mapSheet
### Location / evidence map
![Replace with your map or floor plan](/assets/dg-map-placeholder.svg)

{{mapCaption **FIGURE 01** — Describe the location and orientation.}}
{{mapLegend
1. Entry point.
2. Main room.
3. Evidence location.
}}
{{evidenceSource Source: [creator / credit]. Schematic only; not to scale.}}
}}

\column

## Customize

Replace the illustration with your map and match the numbered legend to its markings. Editing the legend does not draw markers on the image. Use separate sheets for additional plans; the whole map is shown without cropping.

These are Standard (V3), Delta Green layouts. Keep each block within one page; close it before adding a page break.

{{pageNumber,auto}}

\page

# Typography and decoration

## A ruled section heading

Second-level headings carry a double rule. Smaller red headings introduce subsections, while body text keeps its book-serif face for ordinary **bold** and *italic* emphasis.

### A smaller section

The heading above introduces a detail without another rule. Paragraphs have room between their lines, and consecutive paragraphs use an indent.

This second paragraph shows that indent. It belongs to the same passage, rather than introducing a new section.

{{sectionDivider
## Section Divider
}}

**DG > Section Divider** uses a typewritten heading with the double rule. The menu inserts a full-width version.

{{framedTitle
# Operation title
}}

Choose **DG > Framed Title** to surround a title with slashes. Normal main headings do not add them automatically.

\column

## Loose-paper tables

{{loosePaperTable
| Item | Status |
|:---|:---|
| Evidence A | Secured |
| Evidence B | Pending |
}}

Choose **DG > Loose-paper Table** for a slightly tilted paper insert. A normal table stays upright:

| Item | Status |
|:---|:---|
| Evidence A | Secured |
| Evidence B | Pending |

## Paper and ink

The rough page texture gives the document its worn appearance. Advice, chapter and pink-paper panels add their own subtle grain.

Body text uses 10 pt type with 15 pt line spacing. Captions and labels use a compact sans-serif face; running headers use typewriter lettering. Italics currently use a Garamond fallback.

Use explicit breaks to give long passages enough room. Decorative blocks work best when they have a clear purpose in the document.

{{pageNumber,auto}}
