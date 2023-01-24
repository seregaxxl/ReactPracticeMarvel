import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import { Component } from 'react';

class CharInfo extends Component {
    state = {
        char:null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService;

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.charId !== prevProps.charId) {
            this.updateChar(); 
        }

    }

    onCharLoading = () => {
        this.setState({loading:true})
    }

    
    onError = () => {
        this.setState({loading:false, error: true})
    }
    
    onCharLoaded = (char) => {
        this.setState({char, loading:false, error: false})
    }

    updateChar = () => {
        const {charId} = this.props;
        if(!charId) {
            return;
        }
        this.onCharLoading()
        this.marvelService.getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {
        const {char, loading, error} = this.state;

        const skeleton = char || loading || error ? null : <Skeleton />
        const errorMessage = error ? <ErrorMessage /> : null
        const spiner = loading ? <Spinner /> : null
        const content = !(error || loading || !char) ? <View char={char} /> : null
        return (
            <div className="char__info">
                {skeleton} {errorMessage} {spiner} {content}
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    return (
        <>
        <div className="char__basics">
                <img src={thumbnail} style={thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit:'contain'} : {objectFit:'cover'}} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
            {description ? description : 'There is no description'}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                comics
                .filter((item, i) => {
                    if(i < 10) {
                        return item
                    }
                })
                .map((item, i) => {
                    return (
                        <li className="char__comics-item" key={i}>
                        {item.name}
                    </li>
                    )
                })
                }
                {comics.length > 0 ? null : (<li className="char__comics-item" key={0}>
                        There is no information about comics with this char
                    </li>)
                }

            </ul>
    </>
    )
}

export default CharInfo;