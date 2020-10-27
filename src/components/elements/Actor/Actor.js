import React from 'react';
import './Actor.css';
import {API} from "../../../config";


const Actor = (props) => {
    return (
        <div className={"rmdb-actor"}>
            <img alt={"actor_img"}
                     src={props.actor.profile_path ? `${API.IMAGE_BASE_URL}${API.POSTER_SIZE}/${props.actor.profile_path}`: '../images/no_image.jpg'} />
            <span className={"rmdb-actor-name"}>{props.actor.name}</span>
            <span className={"rmdb-actor-character"}>{props.actor.charactor}</span>
        </div>
    )
}

export default Actor;
