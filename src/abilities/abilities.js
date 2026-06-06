import './abilities.css';

import bunny from '../resources/bunny.json';
import diceParser from "../utils/dice_parser";
import modifier from "../utils/modifier";

export default function Abilities(props) {

    console.log("Abilities rendering!");

    const species_num = props.species_num;
    const class_num = props.class_num;
    const stats = props.stats;
    let level = props.level;
    const equipment = generate_equipment(props.class_num);
    let weapons = props.weapons;
    let morsels = props.morselsPack.morsels;

    //randomize here because it won't change
    const power = Math.floor(Math.random() * 6); 
    const background = Math.floor(Math.random() * 6); 

    // ===== sub-properties ======
    const species_description = bunny.species.description[species_num];

    return(
        <div id="abilities">
            <div id="species" class="abilities-section">

                <div id="species_name" class="name-section"><h3>You are a {bunny.species.name[species_num]}</h3></div>
                <div id="species_description" class="name-section">
                    <div dangerouslySetInnerHTML={
                        {__html: species_description}}>
                    </div>
                </div>
                <div class="name-section">
                    {bunny.species.trait[species_num]}
                </div>
            </div>

            <div id="class" class="abilities-section">
                <div id="class_name"><h3>{bunny.classes[class_num].name}</h3></div>
                <div id="powers_desc">{bunny.classes[class_num].powers_description}</div>
                <div id="power_section">
                    <div id="power_name"><b>{bunny.classes[class_num].powers[power][0]}</b></div>
                    <div id="power">{bunny.classes[class_num].powers[power][1]}</div>
                </div>
                <div id="powers_divider" style={{height: "10px"}}/>
                <div id="background">{bunny.classes[class_num].background_description} {bunny.classes[class_num].background[background]}</div>
            </div>

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
                <div id="equipment_title"><h3>Equipment</h3></div>
                <Weapons weapons={weapons}/>
                <Armor value={bunny.classes[class_num].weapons}/>
                <Morsels morsels={morsels} setMorsels={props.morselsPack.setMorsels}/>
                <div id="equipment_divider" style={{height: "10px"}}></div>
                <Runes/>
            </div>

        </div>
    )
    
}

function Armor(value) {
    if (value === "") return null;


}

function Weapons(weapons, level) {
    if (weapons === "") return null;
}

function Morsels(value) {
    if (value === "") return null;
}

function Runes(value) {
    if (value === "") {
        return <div>You shun all trappings of the Lumbering Ones, pain bringers, and to not wish to understand their runes</div>
    }
}

function generate_equipment(class_num) {
    const armor_num = diceParser(bunny.classes[class_num].armor);
    const weapon_num = diceParser(bunny.classes[class_num].weapons);
}