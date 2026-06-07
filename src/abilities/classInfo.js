import './abilities.css';

import bunny from '../resources/bunny.json';

export default function ClassInfo(props) {
    let class_num = props.class_num;
    let power = props.power;
    let runes = props.runes;
    const isSkeleton = props.isSkeleton;
    const isGhost = props.isGhost;

    if (isSkeleton) class_num = 6;
    else if (isGhost) class_num = 7;

    return(
        <div id="class" class="abilities-section">
                <div id="class_name"><h3>{bunny.classes[class_num].name}</h3></div>
                <div id="class_description">{bunny.classes[class_num].class_description}</div>
                <div id="background_divider" className="divider"/>
                <div id="background">{bunny.classes[class_num].background_description} {bunny.classes[class_num].background[props.background]}</div>
                <div id="powers_divider" className="divider"/>
                <div id="powers_desc">{bunny.classes[class_num].powers_description}</div>
                <div id="power_name"><b>{bunny.classes[class_num].powers[props.power][0]}</b></div>
                <div id="power">{bunny.classes[class_num].powers[props.power][1]}</div>
                <div id="runes_divier" className="divider"/>
                <Runes runes={props.runes}/>
            </div>
    )
    
}

function Runes(props) {
    let runes = props.runes;
    if (runes.length === 0) {
        return <div>You shun all trappings of the Lumbering Ones, pain bringers, and to not wish to understand their runes</div>
    }
    else {
        return(
            <div id="runes">
                <div><u>You understand the following runes:</u></div>
                <div><b>{runes.join(", ")}</b></div>
            </div>
        )
    }
}