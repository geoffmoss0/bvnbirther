import './name.css';

import bunny from "../resources/bunny.json";

export default function Name(props) {

    // console.log("Name rendering!");

    return (
        <div id="name">
            <b className="label-bold name-label"> Name</b>
            <div className="nameWrapper">{props.name}</div>
        </div>
    ) 
}