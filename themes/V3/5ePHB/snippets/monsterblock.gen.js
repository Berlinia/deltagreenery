const _ = require('lodash');
const dedent = require('dedent-tabs').default;

const genList = function (list, max) {
	return _.sampleSize(list, _.random(0, max)).join(', ') || 'None';
};

const getMonsterName = function () {
	return _.sample([
		'All-Consuming Case File of the Black Vault',
		'Bureaucratic Angel of the Green Box',
		'Devouring Archivist of the Unredacted',
		'Impossible Asset of the Cellar Door',
		'Incomprehensible Handler from Majestic-12',
		'Nightmare Auditor of the Program',
		'Sanctioned Horror of the Burn Bag',
		'Whispering Thing in the Expense Report',
	]);
};

const getType = function () {
	return `${_.sample(['Tiny', 'Small', 'Medium', 'Large', 'Gargantuan', 'Stupidly vast'])} ${_.sample(['beast', 'fiend', 'annoyance', 'guy', 'cutie'])}`;
};


const getStats = function () {
	return `|${_.times(6, function () {
		const num = _.random(1, 20);
		const mod = Math.ceil(num / 2 - 5);
		return `${num} (${mod >= 0 ? `+${mod}` : mod})`;
	}).join('|')}|`;
};

const genAbilities = function () {
	return _.sample([
		'***Pack Tactics.*** These guys work together like peanut butter and jelly.',
		'***Fowl Appearance.*** While the creature remains motionless, it is indistinguishable from a normal chicken.',
		'***Onion Stench.*** Any creatures within 5 feet of this thing develops an irrational craving for onion rings.',
		'***Enormous Nose.*** This creature gains advantage on any check involving putting things in its nose.',
		'***Sassiness.*** When questioned, this creature will talk back instead of answering.',
		'***Big Jerk.*** Whenever this creature makes an attack, it starts telling you how much cooler it is than you.',
	]);
};

const genLongAbilities = function () {
	return _.sample([
		dedent`These guys work together like peanut butter and jelly. Jelly and peanut butter.

		When one of these guys attacks, the target is covered with, well, peanut butter and jelly.`,
		dedent` This creature is angry, and hungry. It will refuse to do anything with you until its hunger is satisfied.

		When in visual contact with this creature, you must purchase an extra order of fries, even if they say they aren't hungry.`,
		dedent`This creature has swallowed an entire bottle of dish detergent and is actually having a pretty good time.

		While walking near this creature, you must make a dexterity check or become "a soapy mess" for three hours, after which your skin will get all dry and itchy.`,
		dedent`This creature hums softly at all times, even while asleep or apparently dead. The tune changes depending on its mood, but never improves. When you can hear the humming, all attempts at quiet conversation fail. Any whispered plan is immediately rephrased out loud in the creature’s melody.`,

		dedent`This creature believes itself to be extremely polite and becomes offended when treated otherwise. It has no understanding of what politeness actually is. If you address the creature without bowing, nodding, or apologizing, it will respond by correcting your manners at great length, during which it continues attacking.`,

		dedent`This creature is full of static electricity and small unresolved grudges. Anyone touching the creature must make a dexterity check or receive a painful shock and involuntarily reveal one mildly embarrassing personal detail.`,

		dedent`This creature smells strongly of something familiar and comforting, though no two observers can agree on what it is. While within arm’s reach of the creature, you are distracted by nostalgia and take twice as long to complete any careful or deliberate action.`,

		dedent`This creature sheds continuously, leaving behind bits of itself that twitch for several minutes before becoming inert. Moving quickly through an area the creature has passed requires a dexterity check or you slip, trip, or briefly stick to the floor.`,

		dedent`This creature does not understand doors and considers them a personal insult. Whenever a closed door is visible to the creature, it will abandon its current activity to address the door first, usually violently.`,

		dedent`This creature is convinced it is invisible when it closes its eyes. If the creature cannot see you, it will behave as if you are not there, even if you are actively harming it.`,

		dedent`This creature leaks a slow, steady stream of something that should not be leaking. Anyone standing near the creature for more than a minute must make a constitution check or become uncomfortably damp for the remainder of the encounter.`,

		dedent`This creature repeats the last thing said to it, but slightly incorrectly. When spoken to, the creature immediately echoes the statement with one important detail changed, often escalating the situation.`,

		dedent`This creature has an intense fear of being late, though it has no concept of time. If combat lasts longer than a few rounds, the creature becomes increasingly frantic, taking reckless actions to “wrap this up.”`
	]);
};

const genAction = function () {
	const name = _.sample([
		'Abdominal Drop',
		'Airplane Hammer',
		'Atomic Death Throw',
		'Bulldog Rake',
		'Corkscrew Strike',
		'Crossed Splash',
		'Crossface Suplex',
		'DDT Powerbomb',
		'Dual Cobra Wristlock',
		'Dual Throw',
		'Elbow Hold',
		'Gory Body Sweep',
		'Heel Jawbreaker',
		'Jumping Driver',
		'Open Chin Choke',
		'Scorpion Flurry',
		'Somersault Stump Fists',
		'Suffering Wringer',
		'Super Hip Submission',
		'Super Spin',
		'Team Elbow',
		'Team Foot',
		'Tilt-a-whirl Chin Sleeper',
		'Tilt-a-whirl Eye Takedown',
		'Turnbuckle Roll'
	]);

	return `***${name}.*** *Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) `;
};


module.exports = {
	monster: function (classes, genLines) {
		const str = _.random(3, 30);
		const con = _.random(3, 30);
		const dex = _.random(3, 30);
		const intel = _.random(3, 30);
		const pow = _.random(3, 30);

		const hp = _.random(6, 30);
		const wp = _.random(1, 20);

		// DG tends to show skills as "Name XX%"
		const skills = [
			`Alertness ${_.random(20, 80)}%`,
			`Athletics ${_.random(20, 80)}%`,
			`Grapple ${_.random(20, 80)}%`,
			`${genList(['Stealth', 'Firearms', 'Unarmed Combat', 'Occult', 'Persuade', 'Search'], 1)} ${_.random(20, 80)}%`,
		].join(', ');

		const attacks = `${genList(['Grapple', 'Bite', 'Claw', 'Tear', 'Crush', 'Sting'], 1)} ${_.random(20, 80)}% (see ${genList(['RAVENOUS', 'CONSTRICT', 'CAUSTIC', 'INFECTIOUS'], 1)})`;

		const sanLoss = `${_.random(1, 2)}D${genList(['4', '6', '8'], 1)}/${_.random(1, 2)}D${genList(['8', '10', '12'], 1)}`;

		// Convert your existing ability generators into “named trait paragraphs”
		const traits = _.times(_.random(genLines, genLines + 2), () => genAbilities()).join('\n');
		const longTrait = genLongAbilities();

		const specialNameA = genList(['AGELESS', 'UNFORMED', 'RAVENOUS', 'UNNATURAL', 'PARASITIC', 'VISCEROTIC'], 1);
		const specialNameB = genList(['AGELESS', 'UNFORMED', 'RAVENOUS', 'UNNATURAL', 'PARASITIC', 'VISCEROTIC'], 1);

		return dedent`
      {{${classes}
      ## ${getMonsterName()}
      ---
      **STR** ${str}  **CON** ${con}  **DEX** ${dex}  **INT** ${intel}  **POW** ${pow}

      **HP** ${hp}  **WP** ${wp}
      
	  **ARMOR:** ${genList(['None', '1 (scaly paperweights)', '2 (mi-go fungal matter)', '3 (grey skin)', 'See UNFORMED'], 1)}.

      **SKILLS:** ${skills}.

      **ATTACKS:** ${attacks}.

      **${specialNameA}:** ${longTrait}

      **${specialNameB}:** ${longTrait}

      **SAN LOSS:** ${sanLoss}.
      }}
      \n`;
	},
};

