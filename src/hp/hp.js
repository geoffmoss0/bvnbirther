import bunny from '../resources/bunny.json';
import diceParser from "../utils/dice_parser";
import {useState} from 'react';

export default function Hp(props) {

    console.log("HP rendering!");

    const class_num = props.class_num;
    const toughness = props.toughness;

    let [hp, setHP] = useState(diceParser(bunny.classes[class_num].stats.HP, toughness));

    if (hp < 0) setHP(1);


    return (
        <div class="sub-stat">
            <b class="label-bold">HP</b>{hp}/{hp}
        </div>
    )
}