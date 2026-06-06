import bunny from '../resources/bunny.json';

export default function Class(props) {
    
    const class_num = props.class_num;

    return (
        <div class="sub-stat">
            <b class="label-bold">Class</b>{bunny.classes[class_num].name}
        </div>
    )
}