import React, {Component} from 'react';
import './SearchBar.css';
import FontAwesome from 'react-fontawesome'

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.input = React.createRef();
    }

    timeout = null;

    debounceSearch = (event) => {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
        },500)
        this.props.callback(event.target.value);
    }

    render() {
        return (
            <div className={"rmdb-searchbar"}>
                <div className={"rmdb-searchbar-content"}>
                    <FontAwesome className={"rmdb-fa-search"} name={"search"} />
                    <input type={"text"} className={"rmdb-searchbar-input"} placeholder={"Search"}
                           onChange={(event) => this.props.callback(event.target.value)} value={this.props.searchTerm}
                           ref={this.input}/>
                </div>
            </div>
        )
    }
}

export default SearchBar
