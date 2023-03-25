import './charInfo.scss';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import PropTypes from 'prop-types';
import FindChar from '../findChar/findChar';

const CharInfo = (props) => {
    const [char, setChar] = useState({});

    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar()
    },[props.charId])

    const updateChar = () => {
        const {charId} = props;
        if(!charId) {
            return;
        }
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => {setProcess('confirmed')})
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    return (
        <div className='sticky'>
            <div className="char__info">
                {setContent(process, View, char)}
            </div>
            <FindChar/>
        </div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;
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