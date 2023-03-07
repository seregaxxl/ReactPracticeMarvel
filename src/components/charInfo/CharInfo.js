import './charInfo.scss';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import PropTypes from 'prop-types';

const CharInfo = (props) => {
    const [char, setChar] = useState({});

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar()
    },[props.charId])

    const updateChar = () => {
        clearError();
        const {charId} = props;
        if(!charId) {
            return;
        }
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const skeleton = char.name || loading || error ? null : <Skeleton />
    const errorMessage = error ? <ErrorMessage /> : null
    const spiner = loading ? <Spinner /> : null
    const content = !(error || loading || !char.name) ?  <View char={char} /> : null

    return (
        <div className="char__info">
            {skeleton} {errorMessage} {spiner} {content}
        </div>
    )
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
            {comics && comics.length > 0  ? null : 'There is no comics with this character'}
                {comics ? (
                    comics.map((item, i) => {
                        // eslint-disable-next-line
                        if (i > 9) return;
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                ) : null }
                                  
            </ul>
    </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;