import React from 'react';
import './FourColGrid.css';
import MovieThumb from "../MovieThumb/MovieThumb";
import {API} from "../../../config";
import Actor from "../Actor/Actor";

const FourColGrid = (props) => {

    let grids = [];

    if(props.movies) {
        grids = props.movies.map((element) => {
            return (
                <div key={element.id} className={"rmdb-grid-element"}>
                    <MovieThumb clickable={true}
                                image={element.poster_path? `${API.IMAGE_BASE_URL}${API.POSTER_SIZE}/${element.poster_path}` : '../images/no_image.jpg' }
                                movieId={element.id} movieName={element.original_title}
                    />
                </div>)
        })
    }else if(props.actors) {
        grids = props.actors.map((actor) => {
            return (
                <div key={actor.id} className={"rmdb-grid-element"}>
                    <Actor actor={actor} />
                </div>)
        })
    }else {

    };


    return (
        <div>
            {props.header && !props.leading ? (<h1>{props.header}</h1>) : null}
            <div className={"rmdb-grid-content"}>
                {grids}
            </div>
        </div>
    )
}

export default FourColGrid
