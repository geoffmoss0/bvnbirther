import './info.css';

import Abilities from '../abilities/abilities';
import Class from '../class/class';
import Hp from '../hp/hp';
import LuckyFoot from '../lucky_foot/lucky_foot';
import Name from '../name/name';
import bunny from '../resources/bunny.json'
import diceParser from '../utils/dice_parser';
import { useState } from 'react';

export default function Info(props) {

    const class_num = props.class_num;
    const species_num = props.species_num;

    // these may be subject to change later
    let [stats, setStats] = useState(calculate_stats(class_num));
    let [morsels, setMorsels] = useState([]);

    let [skeleton, setSkeleton] = useState(false);
    let [ghost, setGhost] = useState(false);

    return (
        <div>
            <div class="death_button_container">
                <SkeletonButton isSkeleton={skeleton} statSetter={setStats} skeletonSetter={setSkeleton} stats={stats}/>
                <button class="death_button">Become a Ghost</button>
                <ReleaseButton />
            </div>
            <hr class="division-rule"/>
            <Name/>
            <div id="sub-stat-container">
            <Class class_num={class_num}/>
            <Hp class_num={class_num} toughness={stats.tou}/>
            <LuckyFoot class_num={class_num}/>
            </div>
            <hr class="division-rule"/>
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
            agi: stats.agi + 3,
            pre: stats.pre - 5,
            str: stats.str - 3,
            tou: stats.tou + 3,
            wis: 0
        });
    }

    if (isSkeleton) {
        // Disabled button, already skeleton
        return (
            <button id="skeleton" class="death_button" disabled>Become a Restless Skeleton</button>
        )
    }

    return(
        <button id="skeleton" class="death_button" onClick={skelify}>Become a Restless Skeleton</button>
    )
}

function ReleaseButton(props) {
    return(
        <button id="release_button" class="death_button" onClick={() => {window.location.reload()}}>Release to the Wild</button>
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