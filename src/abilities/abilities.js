import './abilities.css';

import ClassInfo from './classInfo';
import Satchel from './satchel';
import bunny from '../resources/bunny.json';
import modifier from "../utils/modifier";
import weaponParser from '../utils/weapons_parser';

export default function Abilities(props) {

    // console.log("Abilities rendering!");

    const species_num = props.species_num;
    const class_num = props.class_num;
    const stats = props.stats;
    let level = props.level;
    let weapons = props.weapons;
    let morsels = props.morselsPack.morsels;

    // ===== sub-properties ======
    const species_description = bunny.species.description[species_num];

    return(
        <div id="abilities">
            <div id="species" class="abilities-section">

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

            <ClassInfo class_num={class_num} power={props.power} runes={props.runes} isSkeleton={props.deathPack.skeleton} isGhost={props.deathPack.ghost}/>
            <div id="stats" class="abilities-section">
                <div id="stats_title"><h3>Abilities</h3></div>
                <div id="stats-container">
                    <div id="agi"><b>Agility: </b>{props.stats.agi} &#40;{modifier(props.stats.agi)}&#41;</div>
                    <div id="pre"><b>Presence: </b>{props.stats.pre} &#40;{modifier(props.stats.pre)}&#41;</div>
                    <div id="str"><b>Strength: </b>{props.stats.str} &#40;{modifier(props.stats.str)}&#41;</div>
                    <div id="tou"><b>Toughness: </b>{props.stats.tou} &#40;{modifier(props.stats.tou)}&#41;</div>
                    <div id="wis"><b>Wisdom: </b>{props.stats.wis} &#40;{modifier(props.stats.wis)}&#41;</div>
                </div>
            </div>

            <div id="equipment" class="abilities-section">
                <BagTitle class_num={class_num}/>
                <Satchel armorPack={props.armorPack} level={props.level} class_num={props.class_num} morselsPack={props.morselsPack} isSkeleton={props.deathPack.skeleton} isGhost={props.deathPack.ghost}/>
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

function Armor(props) {
    let armor_num = props.armorPack.armor_num;
    let setArmor = props.armorPack.setArmor;

    if (props.armorPack.armor_num > -1) {
        return(
            <li><b>{bunny.armor.name[armor_num]}:</b> {bunny.armor.effect[armor_num]} {bunny.armor.tier[armor_num]} <i>{bunny.armor.penalty[armor_num]}</i></li>
        );
    }

    return null;


}

function Weapon(props) {
    let weapon_num = props.weapon_num;
    let level = props.level;
    if (weapon_num >= 0) {
        return(
            <li><b>{bunny.weapons.name[weapon_num]}:</b> {weaponParser(bunny.weapons.effect[weapon_num], level)}</li>
        )
    } else {
        // no weapon, don't render
        return null;
    }
}

function Morsels(props) {
    let class_num = props.class_num;
    let morsels = props.morsels;

    if (morsels.length === 0) {
        return null;
    }

    // 2 (1D4) morsels of 
    // description
    //
    // effect (of appropriate level)


    let morselRows = []

    for (let m of morsels) {
        let details = spellGrabber(class_num, m.morsel_num, props.level)
        let dice_roll_fixed = m.dice_roll.substring(1, m.dice_roll.length-1);
        morselRows.push(
            <li key={m.morsel_num}><b>{m.morsel_amt} &#40;{dice_roll_fixed}&#41; morsels of {details.name}:</b>
                <div className="spell_details_description">{details.description}</div>
                <div>{details.effect}</div>
            </li>
        )
    }

    return morselRows;

}

function spellGrabber(class_num, morsel_num, level) {
    if (class_num === 1 || class_num === 3) {

        console.log('morsel num in nature: ' + morsel_num.toString());
        let desc = weaponParser(bunny.spells.herbs.descriptions[morsel_num], level)

        console.log("nature description: " + desc);

        let ret = {
            name: bunny.spells.herbs.names[morsel_num],
            description: weaponParser(bunny.spells.herbs.descriptions[morsel_num], level), //throw these through weaponParser to get the levels right
        }
        
        if (level === 1) {
            ret.effect = bunny.spells.herbs.level_1[morsel_num]
        }else if (level === 2) {
            ret.effect = bunny.spells.herbs.level_2[morsel_num]
        }else if (level === 3) {
            ret.effect = bunny.spells.herbs.level_3[morsel_num]
        }
        return ret;
    } else if (class_num === 4) {
        // nature

        let desc = weaponParser(bunny.spells.nature.descriptions[morsel_num], level)
        let ret = {
            name: bunny.spells.nature.names[morsel_num],
            description: desc, //throw these through weaponParser to get the levels right
        }
        
        if (level === 1) {
            ret.effect = bunny.spells.nature.level_1[morsel_num]
        }else if (level === 2) {
            ret.effect = bunny.spells.nature.level_2[morsel_num]
        }else if (level === 3) {
            ret.effect = bunny.spells.nature.level_3[morsel_num]
        }
        return ret;
    } else if (class_num === 5) {
        // blasphemy

        let ret = {
            name: bunny.spells.blasphemy.names[morsel_num],
            description: weaponParser(bunny.spells.blasphemy.descriptions[morsel_num], level), //throw these through weaponParser to get the levels right
        }
        
        if (level === 1) {
            ret.effect = bunny.spells.blasphemy.level_1[morsel_num]
        }else if (level === 2) {
            ret.effect = bunny.spells.blasphemy.level_2[morsel_num]
        }else if (level === 3) {
            ret.effect = bunny.spells.blasphemy.level_3[morsel_num]
        }
        return ret;
    }
}



