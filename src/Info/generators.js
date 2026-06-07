import bunny from '../resources/bunny.json';
import diceParser from "../utils/dice_parser";

export function calculate_stats(class_num) {

    return {
        agi: diceParser(bunny.classes[class_num].stats.agility),
        pre: diceParser(bunny.classes[class_num].stats.presence),
        str: diceParser(bunny.classes[class_num].stats.strength),
        tou: diceParser(bunny.classes[class_num].stats.toughness),
        wis: diceParser(bunny.classes[class_num].stats.wisdom)
    }
}

export function generateLuckyFoot(class_num) {
    let lucky_foot = [];

    if (class_num === 5) {
        // warlock
        lucky_foot.push(Math.floor((Math.random() * 3) + 1) );
        lucky_foot.push(Math.floor((Math.random() * 5) + 1) );
        lucky_foot.push(Math.floor((Math.random() * 7) + 1) );
        lucky_foot.push(Math.floor((Math.random() * 9) + 1) );
        lucky_foot.push(Math.floor((Math.random() * 13) + 1) );
    } else {
        for (let i = 0; i < 5; i++) {
            lucky_foot.push(Math.floor((Math.random() * 6) + 1));
        }
    }

    return lucky_foot;
}

export function pick_armor(class_num) {
    let armor_num = -1;
    if (bunny.classes[class_num].armor !== "") {
        armor_num = parseInt(diceParser(bunny.classes[class_num].armor)) - 1;
    }
    return armor_num;
}

export function getWeapons(class_num, level) {
    let weapon_num = -1
    if (bunny.classes[class_num].weapons !== "") {
        weapon_num = parseInt(diceParser(bunny.classes[class_num].weapons)) - 1;
    }

    return weapon_num;
}

export function learnRunes(class_num) {
    let runes = [];
    if (bunny.classes[class_num].runes_num !== "") {
        let num_runes = parseInt(diceParser(bunny.classes[class_num].runes_num));
   
        // prevent duplicate runes
        let i = 0;
        while (i < num_runes) {
            let chosen_rune = bunny.classes[class_num].runes_options[Math.floor(Math.random() * 20)];
            if (!runes.includes(chosen_rune)) {
                runes.push(chosen_rune);
                ++i;
            }
        }
        return runes;
    }

    return []; // class section will know what to do with this
}

/**
 * Gets initial values for morsels. The actual values will get re-rolled, 
 * and the spells get updated on level up. 
 * @param {*} class_num class
 */
export function gatherMorsels(class_num) {
    let morsels = [];

    // morsels 1
    if (bunny.classes[class_num].morsels1 !== "") {

        console.log("help here");
        console.log(bunny.classes[class_num].morsels1amt);
        let morsels1_num = parseInt(diceParser(bunny.classes[class_num].morsels1)) - 1; // fix off by one error
        let morsels1amt = parseInt(diceParser(bunny.classes[class_num].morsels1amt));
        let dice_roll = bunny.classes[class_num].morsels1amt;

        morsels.push({
            morsel_num: morsels1_num,
            morsel_amt: morsels1amt,
            dice_roll: dice_roll,
            level: 1
        })

        console.log("morsel 1");
        console.log(morsels[0]);
    }


    // morsels 2
    if (bunny.classes[class_num].morsels2 !== "") {

        let morsels2_num = parseInt(diceParser(bunny.classes[class_num].morsels2)) - 1; // fix off by one error

        while (morsels2_num === morsels[0].morsel_num) {
            morsels2_num = parseInt(diceParser(bunny.classes[class_num].morsels2)) - 1;
        }

        let morsels2amt = parseInt(diceParser(bunny.classes[class_num].morsels2amt));
        let dice_roll = bunny.classes[class_num].morsels2amt;

        morsels.push({
            morsel_num: morsels2_num,
            morsel_amt: morsels2amt,
            dice_roll: dice_roll,
            level: 1
        })


        console.log("morsel 2");
        console.log(morsels[1]);
    }

    return morsels;
}