import './charList.scss';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { Component } from 'react';

class CharList extends Component {

    state = {
        chars: [],
        offset: 1548,
        loading: true,
        error: false,
        charEnded: false   
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onLoadMoreChars();
    }

    componentDidUpdate() {

    }


    onLoadMoreChars = () => {
        this.onCharLoading()    
        this.marvelService
            .getAllCharacters(this.state.offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    // onNewCharLoading = () => {
    //     this.setState({newItemLoading:true})
    // }

    onCharLoading = () => {
        this.setState({loading:true})
    }

    onCharListLoaded = (newChars) => {
        let ended = false;

        if(newChars.length < 9) {
            ended = true
        }

        this.setState({
            chars: [...this.state.chars, ...newChars],
            loading: false,
            error: false,
            offset:(this.state.offset + 9),
            charEnded: ended
        })
    }




    onError = () => {
        this.setState({loading:false, error: true})
    }

    renderItems(chars) {
        const elements = chars.map(char => {
            const {thumbnail, name, id} = char;
            return (
                <li className="char__item"
                key={id}
                onClick={()=>this.props.onCharSelected(id)}>
                    <img src={thumbnail} style={thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit:'contain'} : {objectFit:'cover'}} alt={name}/>
                     <div className="char__name">{name}</div>
                </li>
            )
        })
        return (
                <>{elements}</>
        )
    }

    render () {
        const {chars, loading, error} = this.state
        const items = this.renderItems(chars)
        const errorMessage = error ? <ErrorMessage /> : null
        const spiner = loading ? <Spinner /> : null
        const content = !(error || loading) ? items : null
        return  (
            <div className="char__list">
                <ul className="char__grid">
                 {errorMessage} {spiner} {content}
                </ul>
                <button onClick={this.onLoadMoreChars} className="button button__main button__long" style={this.state.newItemLoading || this.state.charEnded ? {display: "none"} : {display:"block"}}>
                
                    <div className="inner">load more</div>
                </button>
            </div>
        ) 
     }
}

export default CharList;