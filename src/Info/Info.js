import './info.css';

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

    const class_num = props.class_num;
    const species_num = props.species_num;

    // these may be subject to change later
    let [stats, setStats] = useState(calculate_stats(class_num));

    let [hp, setHP] = useState(diceParser(bunny.classes[class_num].stats.HP, stats.tou));
    if (parseInt(hp) <= 0) setHP("1");

    let [luckyFoot, setLuckyFoot] = useState(generateLuckyFoot(class_num));

    let [morsels, setMorsels] = useState([]);

    let [skeleton, setSkeleton] = useState(false);
    let [ghost, setGhost] = useState(false);

    // TODO this will need a lot of work
    function levelUp() {
        // just HP for now
        setHP( (parseInt(hp) + Math.floor(((Math.random() * 6) + 1))).toString() );
    }

    function rest() {
        setLuckyFoot(generateLuckyFoot(props.class_num));
        // TODO re-roll morsels
    }

    

    return (
        <div>
            <div className="death_button_container">
                <SkeletonButton isSkeleton={skeleton} statSetter={setStats} skeletonSetter={setSkeleton} stats={stats} hpPack={{hp, setHP}}/>
                <button class="death_button">Become a Ghost</button>
                <ReleaseButton />
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
            <Abilities class_num={class_num} stats={stats} species_num={species_num} morselsPack={{morsels, setMorsels}}/>
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

    // todo fix this when all the setters are moved
    function skelify() {
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

    if (isSkeleton) {
        // Disabled button, already skeleton
        return (
            <button id="skeleton" className="death_button" disabled>Become a Restless Skeleton</button>
        )
    }

    return(
        <button id="skeleton" className="death_button" onClick={skelify}>Become a Restless Skeleton</button>
    )
}

function ReleaseButton(props) {
    return(
        <button id="release_button" className="death_button" onClick={() => {window.location.reload()}}>Release to the Wild</button>
    )
}


function calculate_stats(class_num) {

    return {
        agi: diceParser(bunny.classes[class_num].stats.agility),
        pre: diceParser(bunny.classes[class_num].stats.presence),
        str: diceParser(bunny.classes[class_num].stats.strength),
        tou: diceParser(bunny.classes[class_num].stats.toughness),
        wis: diceParser(bunny.classes[class_num].stats.wisdom)
    }
  }

function generateLuckyFoot(class_num) {
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