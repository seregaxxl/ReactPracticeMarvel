import './singleComicPage.scss';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import PropTypes from 'prop-types';

const SingleComic = () => {
    const [comic, setComic] = useState({});
    const {loading, error, getComic, clearError} = useMarvelService();
    let {comicId} = useParams();

    useEffect(() => {
        updateComic()
    },[comicId])

    const updateComic = () => {
        clearError();
        if(!comicId) {
            return;
        }
        getComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const errorMessage = error ? <ErrorMessage /> : null
    const spiner = loading ? <Spinner /> : null
    const content = !(error || loading || !comic) ?  <View comic={comic} /> : null

    return (
        <div className="comic__info">
            {errorMessage} {spiner} {content}
        </div>
    )
    
}

const View = ({comic}) => {
    const {thumbnail, title, description, pageCount, price, language} = comic;
    return (
        <div className="single-comic">
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description ? description : 'There is no description'}</p>
                <p className="single-comic__descr">{pageCount ? `${pageCount} pages` : 'Page count not indicated'}</p>
                <p className="single-comic__descr">{language ? `Language: ${language}` : 'Language not indicated'}</p>
                <div className="single-comic__price">{price ? price + '$' : 'NOT AVAILABLE'}</div>
            </div>
            <Link to={'/comics'} className="single-comic__back">Back to all</Link>
        </div>
    )

}

export default SingleComic;