const dedent = require('dedent-tabs').default;
// Both the static Pages build and the local server serve bundled artwork here.
const asset = (name)=>((typeof window !== 'undefined' && window.DELTA_GREENERY_CONFIG?.basePath) || '') + '/assets/' + name;
module.exports = {
 ritual: ()=>dedent`
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
`,
 advice: ()=>dedent`
{{advicePanel
##### Handler advice
Keep this information separate from the player briefing.

- State the immediate concern.
- Give a practical response.

**Remember:** Replace this example with your own advice.
}}
`,
 photo: ()=>dedent`
{{evidencePhoto,taped
![Replace with your photograph](${asset('dg-photo-placeholder.svg')})

{{evidenceCaption
**EXHIBIT A / 01** — Describe what the photograph shows.
}}
{{evidenceSource Source: [creator / credit / date]}}
}}
`,
 chapter: ()=>dedent`
<!-- Start on a fresh page. Add a page break AFTER the closing block. -->
{{chapterOpener,wide
{{chapterKicker CASE FILE / 01}}
### Chapter title

A short subtitle or briefing classification.

{{evidencePhoto,taped
![Replace with your chapter image](${asset('dg-photo-placeholder.svg')})
{{evidenceCaption Your image caption}}
}}

{{chapterFooter UNOFFICIAL SCENARIO / WORKING COPY}}
}}
`,
 briefing: ()=>dedent`
{{briefingSheet,wide
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
`,
 map: ()=>dedent`
{{mapSheet,wide
### Location / evidence map
![Replace with your map or floor plan](${asset('dg-map-placeholder.svg')})

{{mapCaption **FIGURE 01** — Describe the location and orientation.}}
{{mapLegend
1. Entry point.
2. Main room.
3. Evidence location.
}}
{{evidenceSource Source: [creator / credit]. Schematic only; not to scale.}}
}}
`
};
