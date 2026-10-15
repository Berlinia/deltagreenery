const dedent = require('dedent-tabs').default;
module.exports = ()=>dedent`
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
`;
