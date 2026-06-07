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

    // TODO change these
    let [class_num, setClassNum] = useState(Math.floor(Math.random() * 6));
    let [species_num, setSpecies] = useState(Math.floor(Math.random() * 4)); 

    let [power, setPower] = useState(Math.floor(Math.random() * 6));
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
        // just HP for now
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
                    power={power}
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
