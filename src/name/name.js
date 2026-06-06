import './name.css';

import bunny from "../resources/bunny.json";

export default function Name() {

    let name_vals = [];

    for (let i = 0; i < 5; i++) {
        name_vals.push(Math.floor(Math.random() * 20));
    }


    return (
        <div id="name">
            <b class="label-bold"> Name</b>{bunny.names.first[name_vals[0]]} {bunny.names.last[name_vals[1]]} of the {bunny.names.of_the[name_vals[2]]} who {bunny.names.who[name_vals[4]]} in the {bunny.names.in_the[name_vals[4]]}
        </div>
    ) 
}