import './singleCharPage.scss';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import banner from '../../resources/img/Banner.png'

const SingleChar = () => {
    const [char, setChar] = useState({});
    const {loading, error, getCharByName, clearError} = useMarvelService();
    let {charName} = useParams();

    useEffect(() => {
        updateChar()
    },[charName])

    const updateChar = () => {
        clearError();
        if(!charName) {
            return;
        }
        getCharByName(charName)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const errorMessage = error ? <ErrorMessage /> : null
    const spiner = loading ? <Spinner /> : null
    const content = !(error || loading || !char) ?  <View char={char} /> : null

    return (
        <div className="char__info">
            <img src={banner} alt="avengers banner" className="banner"/>
            {errorMessage} {spiner} {content}
        </div>
    )
    
}

const View = ({char}) => {
    const {thumbnail, description, name} = char;
    return (
        <div className="single-char"> 
            <img src={thumbnail} alt="x-men" className="single-char__img"/>
            <div className="single-char__info">
                <h2 className="single-char__name">{name}</h2>
                <p className="single-char__descr">{description ? description : 'There is no description'}</p>
            </div>
            <Link to={'/'} className="single-char__back">Back to main</Link>
        </div>
    )

}

export default SingleChar;