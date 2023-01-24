import './charList.scss';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { Component } from 'react';

class CharList extends Component {

    state = {
        chars: [],
        loading: true,
        error: false       
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChars();
    }

    componentDidUpdate() {

    }

    updateChars = () => {
        this.onCharLoading()
        this.marvelService
            .getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharLoading = () => {
        this.setState({loading:true})
    }

    onCharListLoaded = (chars) => {
        this.setState({
            chars,
            loading: false,
            error: false
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
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        ) 
     }
}

export default CharList;