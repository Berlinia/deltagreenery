// Resolve saved theme identifiers without exposing retired names in the theme menu.
const aliases = {
	'5ePHB' : 'DeltaGreen',
	'5eDMG' : 'FieldGuide',
	UnearthedArcana : 'Briefing'
};

export const normalizeThemeName = (name)=>Object.hasOwn(aliases, name) ? aliases[name] : name;
