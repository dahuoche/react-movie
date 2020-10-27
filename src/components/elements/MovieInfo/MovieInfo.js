import React from 'react';
import './MovieInfo.css';
import {API} from "../../../config";
import MovieThumb from "../MovieThumb/MovieThumb";
import FontAwesome from 'react-fontawesome'


const MovieInfo = (props) => {
    return (
        <div className={"rmdb-movieinfo"}
             style={{background: props.movie.backdrop_path ?
                     `url('${API.IMAGE_BASE_URL}${API.BACKDROP_SIZE}${props.movie.backdrop_path}')`: '#000'
             }}>
            <div className={"rmdb-movieinfo-content"}>
                <div className={"rmdb-movieinfo-thumb"}>
                    <MovieThumb clickable = {false}
                        image={props.movie.poster_path ? `${API.IMAGE_BASE_URL}${API.POSTER_SIZE}/${props.movie.poster_path}`: '../images/no_image.jpg'}/>
                </div>
                <div className={"rmdb-movieinfo-text"}>
                    <h1>{props.movie.title}</h1>
                    <h3>PLOT</h3>
                    <p>{props.movie.overview}</p>
                    <h3>RMDB RATING</h3>
                    <div className={"rmdb-rating"}>
                        <meter min={"0"} max={"100"} low={"40"} high={"70"} value={props.movie.vote_average * 10} />
                        <p className={"rmdb-score"}>{props.movie.vote_average}</p>
                    </div>
                    {props.directors.length > 1 ? <h3>DIRECTOR</h3> :<h3>DIRECTORS</h3>}
                    {props.directors.map((director) => {
                        return <p key={director.id} className={"rmdb-director"}>{director.name}</p>
                    })}
                </div>
                <FontAwesome className={"fa-film"}  name="film" size={"5x"}/>
            </div>
        </div>
    )
}

export default MovieInfo;
