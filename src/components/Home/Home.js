import React, {Component} from "react";
import {API} from '../../config'
import './Home.css'
import SearchBar from "../elements/SearchBar/SearchBar";
import HeroImage from "../elements/HeroImage/HeroImage";
import FourColGrid from "../elements/FourColGrid/FourColGrid";
import LoadMoreBtn from "../elements/LoadMoreBtn/LoadMoreBtn";
import Spinner from "../elements/Spinner/Spinner";

class Home extends Component {

    state = {
        movies: [],
        heroImage: null,
        loading: false,
        currentPage: 0,
        totalPages: 0,
        searchTerm: '',
    }

    componentDidMount() {
        if(localStorage.getItem('homeState')) {
            const homeState = JSON.parse(localStorage.getItem('homeState'));
            this.setState(homeState);
        }else {
            this.setState({loading: true});
            this.fetchItemsWithMode('default');
        }

    }

    fetchItemsWithMode = (Mode) => {
        let endpoint = '';

        if(Mode === 'search') {
            this.setState({
                movies: [],
                loading: true,
            })
        }else {
            this.setState({
                loading: true,
            })
        }


        if(Mode === 'default') {
            endpoint = `${API.API_URL}movie/popular?api_key=${API.API_KEY}&language=en&page=1`;
        }else if(Mode === 'loadMore'){
            endpoint = `${API.API_URL}movie/popular?api_key=${API.API_KEY}&language=en&page=${this.state.currentPage + 1}`
        }else if(Mode === 'search') {
            if(this.state.searchTerm === '') {
                endpoint = `${API.API_URL}movie/popular?api_key=${API.API_KEY}&language=en&page=1`;
            }else {
                endpoint = `${API.API_URL}search/movie?api_key=${API.API_KEY}&language=en&query=${this.state.searchTerm}`
            }
        }else if(Mode === 'search & loadMore'){
            endpoint = `${API.API_URL}search/movie?api_key=${API.API_KEY}&language=en&query=${this.state.searchTerm}&page=${this.state.currentPage + 1}`
        }
        this.fetchItems(endpoint);
    }

    fetchItems(endpoint) {
        fetch(endpoint)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    movies: this.state.movies.concat(res.results),
                    heroImage: this.state.heroImage || res.results[0],
                    loading: false,
                    currentPage: res.page,
                    totalPages: res.total_pages
                },() => {
                    console.log(this.state);
                    localStorage.setItem('homeState', JSON.stringify(this.state));
                })
            }).catch(
            ()=>{this.fetchItemsWithMode('default');});
    }

    SearchItems = (searchTerm) => {
        this.setState({
            searchTerm
        }, () => {
            this.fetchItemsWithMode('search')
        })
    }

    render() {
        return (
            <div className={'rmdb-home'}>
                {this.state.heroImage ?
                    (<div>
                        <HeroImage image={`${API.IMAGE_BASE_URL}${API.BACKDROP_SIZE}${this.state.heroImage.backdrop_path}`}
                                title={this.state.heroImage.original_title} text={this.state.heroImage.overview}/>
                        <SearchBar callback={this.SearchItems} searchTerm={this.state.searchTerm} />
                    </div>) : null}
                <div className={"rmdb-home-grid"}>
                    <FourColGrid header={this.state.searchTerm? 'Search results' : 'Popular Movies'}
                    loading={this.state.loading} movies={this.state.movies} />
                </div>
                {this.state.loading ? <Spinner /> : null}
                {(this.state.currentPage < this.state.totalPages) ?
                    <LoadMoreBtn text={"Load More"}
                                 onClick={() => {
                                     (this.state.searchTerm === "") ?
                                     this.fetchItemsWithMode('loadMore'):
                                     this.fetchItemsWithMode('search & loadMore')}}/> : null}
            </div>
        )
    }
}

export default Home;
