import React, {useEffect, useState} from 'react'
import './Movie.css'
import FourColGrid from "../elements/FourColGrid/FourColGrid";
import Spinner from "../elements/Spinner/Spinner";
import Navigation from "../elements/Navigation/Navigation";
import MovieInfoBar from "../elements/MovieInfoBar/MovieInfoBar";
import MovieInfo from "../elements/MovieInfo/MovieInfo";
import {API} from "../../config";

const Movie = ({match}) => {

    const [state, setState] = useState({
        movie: null,
        actors: null,
        direction: []
    })
    const [movie, setMovie] = useState(null);
    const [loading, setLoad] = useState(true);
    const [init] = useState(true);

    useEffect(() => {
        const endpoint = `${API.API_URL}movie/${match.params.movieId}?api_key=${API.API_KEY}&language=en-US`;
        fetchItems(endpoint, 'movie');
    },[init, match.params.movieId])
    useEffect(() => {
        const endpoint = `${API.API_URL}movie/${match.params.movieId}/credits?api_key=${API.API_KEY}`;
        fetchItems(endpoint, 'detail');
    },[movie, match.params.movieId])

    const fetchItems = (endpoint, content) => {
        fetch(endpoint)
            .then(res => res.json())
            .then(res => {
                if(res.status_code) {
                    setLoad(false);
                }else {
                    if(content === 'movie') {
                        setMovie(res);
                    }else if(content === 'detail') {
                        setState({actors: res.cast,direction: res.crew.filter((member) => member.job === "Director")});
                        setLoad(false);
                    }

                }
            }).then()
            .catch(
            ()=>{});
    }


    const movieComponent = movie && state.actors ? <div className={"rmdb-movie"}>
        <Navigation movie={movie.original_title} />
        <MovieInfo movie={movie} directors={state.direction}/>
        <MovieInfoBar movie={movie} />
        <div className={"rmdb-home-grid"}>
            <FourColGrid header={'Actors'}
                         actors={state.actors} />
        </div>
        {loading ? <Spinner /> : null}
    </div> : <div className={"rmdb-movie"}><h1>No Movie Found</h1></div>;

    return (
        movieComponent
    )
}

export default Movie
