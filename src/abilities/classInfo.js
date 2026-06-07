import './abilities.css';

import bunny from '../resources/bunny.json';

export default function ClassInfo(props) {
    let class_num = props.class_num;
    let powers = props.powers;
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
                <div id="powers_desc"><u>{bunny.classes[class_num].powers_description}</u></div>
                <Powers powers={props.powers} class_num={class_num}/>
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

function Powers(props) {
    let powers = props.powers;
    let class_num = props.class_num;

    let powers_arr = [];

    for (let p of powers) {
        powers_arr.push(
            <div key={p}>
                <div id="power_name"><b>{bunny.classes[class_num].powers[p][0]}</b></div>
                <div id="power">{bunny.classes[class_num].powers[p][1]}</div>
            </div>
        )
    }

    return powers_arr;
}