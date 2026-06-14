import bunny from '../resources/bunny.json'
import weaponParser from '../utils/weapons_parser';

export default function Satchel(props) {

    let isSkeleton = props.isSkeleton;
    let isGhost = props.isGhost;

    if (isSkeleton) {
        // skeletons lose all spells
        return(<ul id="equipment_list">
            <Weapon weapon_num={props.weapon_num} level={props.level}/>
            <Armor armorPack={props.armorPack}/>
        </ul>
        )
    } else if (isGhost) {
        // ghosts lose all items
        return(
        <ul id="equipment_list">
            <Morsels class_num={props.class_num} morsels={props.morselsPack.morsels} level={props.level}/>
        </ul>
        )
    } else {
        return(
            <div className="section_text">
                <ul id="equipment_list">
                    <Weapon weapon_num={props.weapon_num} level={props.level}/>
                    <Armor armorPack={props.armorPack}/>
                    <Morsels class_num={props.class_num} morsels={props.morselsPack.morsels} level={props.level}/>
                </ul>
            </div>
        )
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
    console.log("I'm here! I'm doing things!");
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
        }else if (level >= 3) {
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
        }else if (level >= 3) {
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
        }else if (level >= 3) {
            ret.effect = bunny.spells.blasphemy.level_3[morsel_num]
        }
        return ret;
    }
}