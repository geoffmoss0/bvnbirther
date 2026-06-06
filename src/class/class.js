import bunny from '../resources/bunny.json';

export default function Class(props) {

    console.log("Class rendering!");
    
    const class_num = props.class_num;

    return (
        <div class="sub-stat">
            <b class="label-bold">Class</b>{bunny.classes[class_num].name}
        </div>
    )
}