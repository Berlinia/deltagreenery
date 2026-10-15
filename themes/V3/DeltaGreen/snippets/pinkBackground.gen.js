const dedent = require('dedent-tabs').default;
module.exports = ()=>dedent`
<!-- A pink dossier insert. Remove ,wide for a single-column insert. Split long inserts across pages manually. -->
{{pinkBackground,wide
{{dossierLabel RESTRICTED BRIEFING}}
##### Subject / file title

**FILE:** [Reference number]  
**STATUS:** [Assessment]

Write your briefing here. This panel grows with its contents; the pink sheet stays behind the text.

- Summarize the evidence.
- Record the unresolved questions.
- State the next action.

{{dossierStamp WORKING COPY}}
}}
`;
