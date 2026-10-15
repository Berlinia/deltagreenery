const dedent = require('dedent-tabs').default;
module.exports = {
 divider: ()=>dedent`
{{sectionDivider,wide
## Section heading
}}
`,
 title: ()=>dedent`
{{framedTitle,wide
# Operation title
}}
`,
 table: ()=>dedent`
{{loosePaperTable
| Item | Status |
|:---|:---|
| Evidence A | Secured |
| Evidence B | Pending |
}}
`
};
