import bunny from '../resources/bunny.json';
import diceParser from "../utils/dice_parser";
import {useState} from 'react';

export default function Hp(props) {

    let hp = props.hp;

    console.log("HP rendering!");

    return (
        <div className="sub-stat">
            <b className="label-bold">HP</b>{hp}/{hp}
        </div>
    )
}