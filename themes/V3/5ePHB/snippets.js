/* eslint-disable max-lines */

const MagicGen = require('./snippets/magic.gen.js');
const ClassTableGen = require('./snippets/classtable.gen.js');
const MonsterBlockGen = require('./snippets/monsterblock.gen.js');
const scriptGen = require('./snippets/script.gen.js');
const ClassFeatureGen = require('./snippets/classfeature.gen.js');
const CoverPageGen = require('./snippets/coverpage.gen.js');
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
	/************************* PHB ********************/
	{
		groupName: 'DG',
		icon: 'fas fa-book',
		view: 'text',
		snippets: [
			{
				name: 'Timeline',
				icon: 'fas fa-scroll',
				gen: function () {
					return dedent`
					{{wide\n
					{{timeline\n
					* **27 OCT 1865:** No book to be *The King in Yellow* is reported in London for the first time.^[1]\n
					* **28 MAY 1886:** Asa Daribondi is born in Paris.\n
					##### THE BROTHERHOOD (1865–1905)\n
					* **OCTOBER 1894:** *Le Roi en jaune* turns up in bookshops across Paris.\n
					}}\n
				}}\n`;
				},
			},
			{
				name: 'Unnatural Tome (TODO)',
				icon: 'fas fa-mask',
				gen: ClassFeatureGen,
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
				name: 'Pink Bakcground (TODO)',
				icon: 'fac book-front-cover',
				gen: CoverPageGen.front,
				experimental: true
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

	{
		groupName: 'Tables',
		icon: 'fas fa-table',
		view: 'text',
		snippets: [
			{
				name: 'Class Tables',
				icon: 'fas fa-table',
				gen: ClassTableGen.full('classTable,frame,decoration,wide'),
				subsnippets: [
					{
						name: 'Martial Class Table',
						icon: 'fas fa-table',
						gen: ClassTableGen.non('classTable,frame,decoration'),
					},
					{
						name: 'Martial Class Table (unframed)',
						icon: 'fas fa-border-none',
						gen: ClassTableGen.non('classTable'),
					},
					{
						name: 'Full Caster Class Table',
						icon: 'fas fa-table',
						gen: ClassTableGen.full('classTable,frame,decoration,wide'),
					},
					{
						name: 'Full Caster Class Table (unframed)',
						icon: 'fas fa-border-none',
						gen: ClassTableGen.full('classTable,wide'),
					},
					{
						name: 'Half Caster Class Table',
						icon: 'fas fa-list-alt',
						gen: ClassTableGen.half('classTable,frame,decoration,wide'),
					},
					{
						name: 'Half Caster Class Table (unframed)',
						icon: 'fas fa-border-none',
						gen: ClassTableGen.half('classTable,wide'),
					},
					{
						name: 'Third Caster Spell Table',
						icon: 'fas fa-border-all',
						gen: ClassTableGen.third('classTable,frame,decoration'),
					},
					{
						name: 'Third Caster Spell Table (unframed)',
						icon: 'fas fa-border-none',
						gen: ClassTableGen.third('classTable'),
					}
				]
			},
			{
				name: 'Rune Table',
				icon: 'fas fa-language',
				gen: scriptGen.dwarvish,
				experimental: true,
				subsnippets: [
					{
						name: 'Dwarvish',
						icon: 'fac davek',
						gen: scriptGen.dwarvish,
					},
					{
						name: 'Elvish',
						icon: 'fac rellanic',
						gen: scriptGen.elvish,
					},
					{
						name: 'Draconic',
						icon: 'fac iokharic',
						gen: scriptGen.draconic,
					},
				]
			},
		]
	},

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
