import './name.css';

import bunny from "../resources/bunny.json";

export default function Name(props) {

    console.log("Name rendering!");

    return (
        <div id="name">
            <b className="label-bold"> Name</b>{props.name}
        </div>
    ) 
}