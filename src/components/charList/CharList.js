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
        console.log(this.state.chars)
    }

    updateChars = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharListLoaded)
            // .catch(this.onError)
    }

    onCharListLoaded = (chars) => {
        this.setState({
            chars,
            loading: false
        })
    }




    onError = () => {
        this.setState({loading:false, error: true})
    }

    render () {
        const {chars} = this.state
        console.log(chars)
        return  (
            <div className="char__list">
                <ul className="char__grid">
                 <Chars chars={chars} />
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
            // <div />
        ) 
     }

}



const Chars = ({chars}) => {

    const Char = (char) => {
        const {name,thumbnail} = char;
        // const errorMessage = error ? <ErrorMessage /> : null
        // const spiner = loading ? <Spinner /> : null
        // const content = !(error || loading) ? <><img src={thumbnail} alt={name}/>
        // <div className="char__name">{name}</div></> : null
        
        return (
            <li className="char__item">
                <img src={thumbnail} alt={name}/>
        <div className="char__name">{name}</div>
                {/* {errorMessage} {spiner} {content} */}
            </li>
        )
    }

    const elements = chars.map(char => {
        const {thumbnail, name, id} = char;
        return <Char
        thumbnail = {thumbnail}
        name = {name}
        key = {id}
        />
    })


    return (
        <div className="char__list">
            <ul className="char__grid">
                {elements}
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}




export default CharList;