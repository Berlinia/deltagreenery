/* eslint-disable max-lines */

const MonsterBlockGen = require('./snippets/monsterblock.gen.js');
const QuoteGen = require('./snippets/quote.gen.js');
const dedent = require('dedent-tabs').default;

module.exports = [
	{
		groupName: 'Style Editor',
		icon: 'fas fa-pencil-alt',
		view: 'style',
		snippets: [
			{
				name: 'Remove Drop Cap',
				icon: 'fas fa-remove-format',
				gen: dedent`/* Removes Drop Caps */
						.page h1+p:first-letter {
							all: unset;
						}\n\n
						/* Removes Small-Caps in first line */
						.page h1+p:first-line {
							all: unset;
						}`
			},
			{
				name: 'Tweak Drop Cap',
				icon: 'fas fa-sliders-h',
				gen: dedent`/* Drop Cap settings */
						.page h1 + p::first-letter {
							font-family: SolberaImitationRemake;
							font-size: 3.5cm;
							background-image: linear-gradient(-45deg, #322814, #998250, #322814);
							line-height: 1em;
						}\n\n`
			},
		]
	},
	/************************* Delta Green ********************/
	{
		groupName: 'DG',
		icon: 'fas fa-book',
		view: 'text',
		snippets: [
			{
				name: 'Timeline',
				icon: 'fas fa-scroll',
				gen: require('./snippets/timeline.gen.js'),
			},
			{
				name: 'Unnatural Tome',
				icon: 'fas fa-mask',
				gen: require('./snippets/unnaturalTome.gen.js'),
			},
			{
				name: 'Ritual (TODO)',
				icon: 'fas fa-quote-right',
				gen: QuoteGen,
			},
			{
				name: 'Disinformation',
				icon: 'fas fa-sticky-note',
				gen: function () {
					return dedent`
						{{note
						##### Disinformation
						Use notes to point out some interesting information.

						**Tables and lists** both work within a note.
						}}
						\n`;
				},
			},
			{
				name: 'Disinformation Wide',
				icon: 'fas fa-sticky-note',
				gen: function () {
					return dedent`
					{{wide 	
					{{note
						##### Disinformation
						Use notes to point out some interesting information.

						**Tables and lists** both work within a note.
						}}
				}}
						\n`;
				},
			},
			{
				name: 'Monster Stat Block (unframed)',
				icon: 'fas fa-paw',
				gen: MonsterBlockGen.monster('monster', 2),
			},
			{
				name: 'Monster Stat Block',
				icon: 'fas fa-spider',
				gen: MonsterBlockGen.monster('monster,frame', 2),
			},
			{
				name: 'Wide Monster Stat Block',
				icon: 'fas fa-dragon',
				gen: MonsterBlockGen.monster('monster,frame,wide', 4),
			},
			{
				name: 'Pink Background',
				icon: 'fac book-front-cover',
				gen: require('./snippets/pinkBackground.gen.js')
			},
			{
				name: 'Artist Credit',
				icon: 'fas fa-signature',
				gen: function () {
					return dedent`
						{{artist,top:90px,right:30px
						##### Starry Night
						[Van Gogh](https://www.vangoghmuseum.nl/en)
						}}
						\n`;
				},
			}
		]
	},

	/*********************  TABLES *********************/

	/**************** PAGE *************/

	{
		groupName: 'Print',
		icon: 'fas fa-print',
		view: 'style',
		snippets: [
			{
				name: 'Ink Friendly',
				icon: 'fas fa-tint',
				gen: dedent`
					/* Ink Friendly */
					*:is(.page,.monster,.note,.descriptive) {
						background : white !important;
						box-shadow : 1px 4px 14px #888 !important;
					}

					.page img {
						visibility : hidden;
					}\n\n`
			},
		]
	}
];
