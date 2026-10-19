// Commented examples shared by the editor and the guide.
module.exports = `/* DELTA GREENERY — OPTIONAL STYLE SETTINGS
Nothing below changes the document until you enable an option.
To enable one, remove the opening slash-star and closing star-slash
around its CSS block. Keep the separate description comment.
Edit the values, then check your preview and print layout.
Use one background option at a time. Panel styles may need more specific selectors.
These examples target Standard (V3), Delta Green and Delta Green Classic.
*/

/* Page background: replace the URL with a direct image URL. */
/*
.page:nth-child(n) {
  background-image: url("https://example.com/background.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
*/

/* Plain white pages: use this instead of the image option. */
/*
.page:nth-child(n) {
  background-image: none;
  background-color: white;
}
*/

/* Background for page 2 only. Full-page chapter panels cover the page background. */
/*
.page#p2 {
  background-image: url("https://example.com/page-two.jpg");
}
*/

/* Body font and size: use an installed font, or a font already included in the theme. */
/*
.page {
  font-family: Georgia, serif;
  font-size: 10pt;
}
.page p, .page li { line-height: 1.5; }
*/

/* Paragraph spacing and first-line indentation. */
/*
.page p + p {
  margin-top: 0.15cm;
  text-indent: 0;
}
*/

/* Gap before lists with a blank Markdown line; tight lists still have no gap. */
/*
.page p + ul.list-separated,
.page p + ol.list-separated { margin-top: 0.15cm; }
*/

/* Space after lists and between list items. */
/*
.page ul, .page ol { margin-bottom: 0.25cm; }
.page li + li { margin-top: 0.05cm; }
*/

/* Space between the two text columns. */
/*
.page { column-gap: 0.9cm; }
*/

/* Heading colours. */
/*
.page h1, .page h2 { color: #202420; }
.page h3 { color: #a33e32; }
*/

/* Hide the double rule under H2 headings, in current and Classic themes. */
/*
.page h2 { border-bottom: none; }
.page h2::after { display: none; }
.page .sectionDivider { border-bottom: none; }
*/

/* Hide the section name in the running header, keeping the document title. */
/*
.page .runningHeader .sectionTitle { display: none; }
*/

/* Override the printed title without renaming the saved document. */
/*
.page { --HB_DocTitle: "OPERATION BLACK LANTERN"; }
*/

/* Hide the running header and its top black rule. The publication disclaimer remains. */
/*
.page .runningHeader { display: none; }
.page::before { display: none; }
*/

/* Chapter opener background: text and the publication disclaimer should remain readable. */
/*
.page .chapterOpener.wide:not(.compact) {
  background-color: #244132;
  background-image: none;
}
*/

/* Table text size and cell padding. */
/*
.page table { font-size: 9pt; }
.page table th, .page table td { padding: 0.12cm; }
*/
`;
