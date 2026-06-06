import bunny from '../resources/bunny.json';
import diceParser from "../utils/dice_parser";

export default function Hp(props) { // we will need to pass stuff in

    let class_num = props.class_num;

    console.log(bunny);
    let a = bunny;
    const hp = diceParser(bunny.classes[class_num].stats.HP);


    return (
        <div class="sub-stat">
            <b class="label-bold">HP</b>{hp}/{hp}
        </div>
    )
}