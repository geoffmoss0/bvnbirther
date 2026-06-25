import { useState } from "react";

export default function LuckyFoot(props) {

    // console.log("Lucky foot rendering!");
    const class_num = props.class_num;
    let lucky_foot = props.luckyFoot;
    const used = props.usedPack.used;
    const setUsed = props.usedPack.setUsed;

    // create lucky foot array
    let feet = [];
    for (let i = 0; i < lucky_foot.length; i++) {
        feet.push(<Foot key={`lucky_foot_${i}`} num={lucky_foot[i]} foot_id={i} used={used} setUsed={setUsed}></Foot>)
    }

    return (
        <div className="sub-stat">
            <b className="label-bold">Lucky Foot</b>{feet}
        </div>
    )
}

/**
 * Individual Lucky Foot item
 * If clicked, updates used array to activate strikethrough
 * @param {*} props 
 * @returns 
 */
function Foot(props) {
    const num = props.num;
    const foot_id = props.foot_id;
    const used = props.used; // THIS IS AN ARRAY OF ALL 5 FEET
    const setUsed = props.setUsed;

    /*
     * flips the used property of the given id 
     */
    function setFootUsed (foot_id, used, setUsed) {
        let usedArr = [];
        for (let i = 0; i < 5; i++) {
            if (i === foot_id) {
                usedArr.push(!used[i]);
            } else {
                usedArr.push(used[i]);
            }
        }
        setUsed(usedArr);
    }
    
    return (
        <div>
            {used[foot_id] ? <div className="luckyFootEntry" onClick={() => setFootUsed(foot_id, used, setUsed)}><s>&nbsp;{num}&nbsp;</s></div> : <div className="luckyFootEntry" onClick={() => setFootUsed(foot_id, used, setUsed)}>&nbsp;{num}&nbsp;</div>}
        </div>
    )
}