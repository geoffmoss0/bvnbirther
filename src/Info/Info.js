import './info.css';

import {
    calculate_stats,
    gatherMorsels,
    generateLuckyFoot,
    getWeapons,
    learnRunes,
    pick_armor
} from './generators';

import Abilities from '../abilities/abilities';
import Class from '../class/class';
import Hp from '../hp/hp';
import LuckyFoot from '../lucky_foot/lucky_foot';
import Name from '../name/name';
import bunny from '../resources/bunny.json'
import diceParser from '../utils/dice_parser';
import modifier from '../utils/modifier';
import { useState } from 'react';

export default function Info(props) {

    // console.log("Info rendering!'")

    // ========== Bunny Properties ============
    let [level, setLevel] = useState(1);

    let [class_num, setClassNum] = useState(Math.floor(Math.random() * 6));

    // FOR TESTING: Set specific class
    // let class_num=1;let setClassNum=() => {};
    let [species_num, setSpecies] = useState(Math.floor(Math.random() * 4)); 

    let [powers, setPowers] = useState([Math.floor(Math.random() * 6)]);
    let [background, setBackground] = useState(Math.floor(Math.random() * 6)); 

    // ========== Stats =================
    let [stats, setStats] = useState(calculate_stats(class_num));

    let [hp, setHP] = useState(diceParser(bunny.classes[class_num].stats.HP, stats.tou));
    if (parseInt(hp) <= 0) setHP("1");

    let [luckyFoot, setLuckyFoot] = useState(generateLuckyFoot(class_num));

    // =========== Equipment ======================

    // bunnies only get 1 armor and 1 weapon, or 0 of either
    let [armor_num, setArmor] = useState(pick_armor(class_num));
    let [weapon_num, setWeapons] = useState(getWeapons(class_num, level));
    let [morsels, setMorsels] = useState(gatherMorsels(class_num));


    // ============= Runes =====================
    let [runes, setRunes] = useState(learnRunes(class_num));

    // ============ Death Status =================
    let [skeleton, setSkeleton] = useState(false);
    let [ghost, setGhost] = useState(false);


    // TODO this will need a lot of work
    function levelUp() {
        setHP( (parseInt(hp) + Math.floor(((Math.random() * 6) + 1))).toString() );
        setLevel(level + 1)

        // run the ability checks
        let ability_tests = []

        for (let i = 0; i < 5; i++) {
            ability_tests.push(
                (Math.floor( (Math.random() * 6) + 1)) +
                (Math.floor( (Math.random() * 6) + 1)) +
                (Math.floor( (Math.random() * 6) + 1)) // 3D6
            )
        }

        let new_stats = {
            agi: ability_tests[0] > stats.agi ? (parseInt(stats.agi) + 1).toString() : stats.agi,
            pre: ability_tests[1] > stats.pre ? (parseInt(stats.pre) + 1).toString() : stats.pre,
            str: ability_tests[2] > stats.str ? (parseInt(stats.str) + 1).toString() : stats.str,
            tou: ability_tests[3] > stats.tou ? (parseInt(stats.tou) + 1).toString() : stats.tou,
            wis: ability_tests[4] > stats.wis ? (parseInt(stats.wis) + 1).toString() : stats.wis
        }

        console.log('new stats:');
        console.log(new_stats);

        setStats(new_stats);

        // don't level up abilities if in a death class
        if (!skeleton && !ghost) {

            if (class_num === 0 || class_num === 2) {
                // scrapper and scamp- gain a new skill
                // TODO kill myself

                if (powers.length === 6) {
                    // already have all the powers
                    return; 
                }
                
                let newPower = Math.floor(Math.random() * 6); // both have 6 powers

                while (powers.includes(newPower)) {
                    newPower = Math.floor(Math.random() * 6); // both have 6 powers
                }

                console.log("new power: " + newPower.toString());

                let newList = Array.from(powers);
                newList.push(newPower);

                setPowers(newList);
            } else {
                console.log("updaing spells");
                // spellcasters get 2 news spells rolled on their table

                // we can actually use morsels1 for all of them since spells are consistent

                let newspell1 = parseInt(diceParser(bunny.classes[class_num].morsels1)) - 1; // avoid off-by-one
                let newspell2 = parseInt(diceParser(bunny.classes[class_num].morsels1)) - 1;

                console.log("newspell1: " + newspell1.toString());
                console.log("newspell2: " + newspell2.toString());

                // create a new object to replace it
                let newMorsels = Array.from(morsels); 

                // check the old morsel list for m1
                let upgradeMor1 = checkMorsels(morsels, newspell1);

                if (upgradeMor1) {
                    // new morsel 1 was a duplicate, so upgrade existing

                    // get the index in the original morsels list
                    let mor1ind = getMorselByNum(morsels, newspell1); 
                    let mor1 = morsels[mor1ind];
                    if (mor1.level < 3) {
                        // right now, only upgrade to level 3 and don't get new stuff 
                        // if you get duplicates past that
                        newMorsels[mor1ind].level = newMorsels[mor1ind].level + 1
                    }
                } else {
                    // new morsel 1 was new, so add it
                    let newMorsel1 = {
                        morsel_num: newspell1,
                        morsel_amt: parseInt(diceParser(bunny.classes[class_num].morsels1amt)), // every class uses this (1d4)
                        dice_roll: bunny.classes[class_num].morsels1amt, // also always 1d4
                        level: 1 // new starts at 1
                    }

                    newMorsels.push(newMorsel1);
                }

                // things could have changed partway through, so check our new list
                let upgradeMor2 = checkMorsels(newMorsels, newspell2); 

                if (upgradeMor2) {
                    // new morsel 2 was a duplicate, so upgrade existing

                    // get the index in the new morsels list (has existing and new)
                    let mor2ind = getMorselByNum(newMorsels, newspell2); 
                    let mor2 = newMorsels[mor2ind];
                    if (mor2.level < 3) {
                        // right now, only upgrade to level 3 and don't get new stuff 
                        // if you get duplicates past that
                        newMorsels[mor2ind].level = newMorsels[mor2ind].level + 1
                    }
                } else {
                    // new morsel 2 was new, so add it
                    let newMorsel2 = {
                        morsel_num: newspell2,
                        morsel_amt: parseInt(diceParser(bunny.classes[class_num].morsels1amt)), // every class uses this (1d4)
                        dice_roll: bunny.classes[class_num].morsels1amt, // also always use 1d4, some classes don't have 1d4 for secondary
                        level: 1
                    }

                    newMorsels.push(newMorsel2);
                }
                setMorsels(newMorsels);
            }
        }
    }

    function rest() {
        setLuckyFoot(generateLuckyFoot(props.class_num));
        // TODO re-roll morsels

        let new_morsels = [];

        for (let m of morsels) {
            let new_val = diceParser(m.dice_roll);
            new_morsels.push({
                morsel_num: m.morsel_num,
                morsel_amt: new_val,
                dice_roll: m.dice_roll,
                level: 1
            });
        }

        setMorsels(new_morsels);
    }

    function checkMorsels(morsel_list, morsel_num) {
        for (let m of morsel_list) {
            if (m.morsel_num === morsel_num) {
                return true;
            }
        }
        return false;
    }

    function getMorselByNum(morsel_list, morsel_num) {
        for (let i = 0; i < morsel_list.length; i++) {
            if (morsel_list[i].morsel_num === morsel_num) {
                return i;
            }
        }
        return -1; // this shouldn't happen
    }

    return (
        <div>
            <div className="death_button_container">
                <SkeletonButton 
                    isSkeleton={skeleton} 
                    isGhost={ghost} 
                    statSetter={setStats} 
                    skeletonSetter={setSkeleton} 
                    stats={stats} 
                    hpPack={{hp, setHP}}
                    speciesSetter={setSpecies}
                    classSetter={setClassNum}
                    morselSetter={setMorsels}
                    armorSetter={setArmor}
                    weaponSetter={setWeapons}
                    powerSetter={setPowers}
                    />
                <GhostButton 
                    isSkeleton={skeleton} 
                    isGhost={ghost} 
                    statSetter={setStats} 
                    ghostSetter={setGhost} 
                    stats={stats} 
                    hpPack={{hp, setHP}}
                    speciesSetter={setSpecies}
                    classSetter={setClassNum}
                    morselSetter={setMorsels}
                    armorSetter={setArmor}
                    weaponSetter={setWeapons}
                    powerSetter={setPowers}
                    />
                <ReleaseButton /> {/* This one's easy*/}
            </div>
            <div id="refresh_container">
                <button id="level_up_button" className="refresh_button" onClick={levelUp}>Level Up</button>
                <button id="rest_button" className="refresh_button" onClick={rest}>Rest</button>
            </div>
            <hr className="division-rule"/>
            <Name name={props.name}/>
            <div id="sub-stat-container">
            <Class class_num={class_num}/>
            <Hp hp={hp}/>
            <LuckyFoot class_num={class_num} luckyFoot={luckyFoot}/>
            </div>
            <hr className="division-rule"/>
            {/* Class Info (do this all individually) */}
            {/* maybe make an equipment pack for readability*/}
            <Abilities class_num={class_num} 
                    stats={stats} 
                    species_num={species_num} 
                    morselsPack={{morsels, setMorsels}} 
                    armorPack={{armor_num, setArmor}}
                    quest={props.quest}
                    runes={runes}
                    weapon_num={weapon_num}
                    level={level}
                    powers={powers}
                    background={background}
                    deathPack={{skeleton, ghost}}
            /> 
        </div>
    )

}

/**
 * 
 * @param {*} props 
 */
function SkeletonButton(props) {
    const isSkeleton = props.isSkeleton;
    const statSetter = props.statSetter;
    const skeletonSetter = props.skeletonSetter;
    const stats = props.stats;
    const isGhost = props.isGhost;
    const classSetter = props.classSetter;
    const powerSetter = props.powerSetter;

    // todo fix this when all the setters are moved
    function skellify() {
        skeletonSetter(true);
        statSetter({
            agi: (parseInt(stats.agi) + 3).toString(),
            pre: (parseInt(stats.pre) - 5).toString(),
            str: (parseInt(stats.str) - 3).toString(),
            tou: (parseInt(stats.tou) + 3).toString(),
            wis: "0"
        });

        // refresh HP with new value

        // extract original HP roll
        const hpMod = parseInt(modifier(stats.tou)) // react thing- this value is stil the old value here
        const oldHP = props.hpPack.hp - hpMod;
        console.log("old HP: " + oldHP);
        const newMod = parseInt(modifier( (parseInt(stats.tou) + 3).toString() ));
        props.hpPack.setHP(oldHP + newMod);

        // pick a new skeleton power
        // only 1, doesn't matter how many they had in life
        powerSetter([Math.floor(Math.random() * 6)]);
    }

    if (isSkeleton || isGhost) {
        // Disabled button, already skeleton
        return (
            <button id="skeleton" className="death_button" disabled>Become a Restless Skeleton</button>
        )
    } else {
        return(
            <button id="skeleton" className="death_button" onClick={skellify}>Become a Restless Skeleton</button>
        )
    }
}

function GhostButton(props) {
    const ghostSetter = props.ghostSetter;
    const isGhost = props.isGhost;
    const statSetter = props.statSetter;
    const stats = props.stats;
    const isSkeleton = props.isSkeleton;
    const powerSetter = props.powerSetter;

    function ghostify() {
        ghostSetter(true);
        statSetter({
            agi: (parseInt(stats.agi) + 5).toString(),
            pre: (parseInt(stats.pre) + 10).toString(),
            str: (parseInt(stats.str) - 10).toString(),
            tou: (parseInt(stats.tou) - 5).toString(),
            wis: (parseInt(stats.wis) + 5).toString(),
        });

        // refresh HP with new value

        // extract original HP roll
        const hpMod = parseInt(modifier(stats.tou)) // react thing- this value is stil the old value here
        const oldHP = props.hpPack.hp - hpMod;
        console.log("old HP: " + oldHP);
        const newMod = parseInt(modifier( (parseInt(stats.tou) - 5).toString() ));

        let newHP = oldHP + newMod;
        if (newHP < 1) newHP = 1;
        props.hpPack.setHP(newHP);

        // pick a new ghost power
        // casters only get 1 power, but make sure it's random
        // and not linked to the one they had in life
        powerSetter([Math.floor(Math.random() * 6)]);
    }

    if (isGhost || isSkeleton) {
        return(<button id="ghost_button" className="death_button" disabled>Become an Afterlife Spirit</button>)
    }
    return (<button id="ghost_button" className="death_button" onClick={ghostify}>Become an Afterlife Spirit</button>)
}

/**
 * Kills the current bunny by reloading the page and generating a new one
 * @param {*} props 
 * @returns 
 */
function ReleaseButton(props) {
    return(
        <button id="release_button" className="death_button" onClick={() => {window.location.reload()}}>Release to the Wild</button>
    )
}
