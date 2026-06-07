import './abilities.css';

import ClassInfo from './classInfo';
import Satchel from './satchel';
import bunny from '../resources/bunny.json';
import modifier from "../utils/modifier";
import weaponParser from '../utils/weapons_parser';

export default function Abilities(props) {

    const species_num = props.species_num;
    const class_num = props.class_num;
    const stats = props.stats;
    let level = props.level;
    let weapon_num = props.weapon_num;
    let morsels = props.morselsPack.morsels;

    // ===== sub-properties ======
    const species_description = bunny.species.description[species_num];

    return(
        <div id="abilities">
            <div id="species" className="abilities-section">

                <div id="species_name" className="name-section"><h3>You are a {bunny.species.name[species_num]}</h3></div>
                <div id="species_description" className="name-section">
                    <div dangerouslySetInnerHTML={
                        {__html: species_description}}>
                    </div>
                </div>
                <div id="species_blurb" className="name-section">
                    {bunny.species.blurb[species_num]}
                </div>
                <div className="name-section">
                    <div dangerouslySetInnerHTML={
                        {__html: bunny.species.trait[species_num]}}/>
                </div>
                <div id="quest" className="name-section">
                    <b>Quest:</b> {props.quest}
                </div>

            </div>

            <ClassInfo class_num={class_num} powers={props.powers} runes={props.runes} isSkeleton={props.deathPack.skeleton} isGhost={props.deathPack.ghost} background={props.background}/>
            <div id="stats" className="abilities-section">
                <div id="stats_title"><h3>Abilities</h3></div>
                <div id="stats-container">
                    <div id="agi"><b>Agility: </b>{props.stats.agi} &#40;{modifier(props.stats.agi)}&#41;</div>
                    <div id="pre"><b>Presence: </b>{props.stats.pre} &#40;{modifier(props.stats.pre)}&#41;</div>
                    <div id="str"><b>Strength: </b>{props.stats.str} &#40;{modifier(props.stats.str)}&#41;</div>
                    <div id="tou"><b>Toughness: </b>{props.stats.tou} &#40;{modifier(props.stats.tou)}&#41;</div>
                    <div id="wis"><b>Wisdom: </b>{props.stats.wis} &#40;{modifier(props.stats.wis)}&#41;</div>
                </div>
            </div>
            <div id="equipment" className="abilities-section">
                <BagTitle class_num={class_num}/>
                <Satchel 
                    armorPack={props.armorPack} 
                    level={props.level} 
                    class_num={props.class_num} 
                    morselsPack={props.morselsPack} 
                    isSkeleton={props.deathPack.skeleton} 
                    isGhost={props.deathPack.ghost}
                    weapon_num={weapon_num}
                />
                <div id="equipment_divider" style={{height: "10px"}}></div>
            </div>
        </div>
    )
}

function BagTitle(props) {
    let class_num = props.class_num;
    if (class_num === 0 || class_num === 2) {
        return(
            <h3>Equipment</h3>
        )
    } else if (class_num === 1 || class_num === 3) {
        return(
            <h3>Herbs</h3>
        )
    } else if (class_num === 4)  {
        return <h3>Nature</h3>
    } else if (class_num === 5) {
        return <h3>Blasphemy</h3>
    }
}
