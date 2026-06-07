

export default function LuckyFoot(props) {

    // console.log("Lucky foot rendering!");
    const class_num = props.class_num;
    let lucky_foot = props.luckyFoot;

    return (
        <div class="sub-stat">
            <b class="label-bold">Lucky Foot</b>{lucky_foot[0]} {lucky_foot[1]} {lucky_foot[2]} {lucky_foot[3]} {lucky_foot[4]}
        </div>
    )
}