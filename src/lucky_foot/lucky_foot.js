

export default function LuckyFoot(props) {
    const class_num = props.class_num;

    let lucky_foot = [];

    if (class_num === 5) {
        // warlock
        lucky_foot.push(Math.floor((Math.random() * 3) + 1) );
        lucky_foot.push(Math.floor((Math.random() * 5) + 1) );
        lucky_foot.push(Math.floor((Math.random() * 7) + 1) );
        lucky_foot.push(Math.floor((Math.random() * 9) + 1) );
        lucky_foot.push(Math.floor((Math.random() * 13) + 1) );
    } else {
        for (let i = 0; i < 5; i++) {
            lucky_foot.push(Math.floor((Math.random() * 6) + 1));
        }
    }

    return (
        <div class="sub-stat">
            <b class="label-bold">Lucky Foot</b>{lucky_foot[0]} {lucky_foot[1]} {lucky_foot[2]} {lucky_foot[3]} {lucky_foot[4]}
        </div>
    )
}