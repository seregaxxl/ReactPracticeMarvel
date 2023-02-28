import './comics.scss';
import banner from '../../resources/img/Banner.png'
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { useState, useRef, useEffect } from 'react';

const Comics = () => {

    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(0);
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onLoadMoreComics(offset, true)
    },[])

    const onLoadMoreComics = (offset, initial) => {
        initial ? setnewItemLoading(false) : setnewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComics) => {
        let ended = false;
        if(newComics.length < 8) {
            ended = true
        }
        setComics(comics => [...comics, ...newComics]);
        setOffset(offset => offset + 9);
        setComicsEnded(ended => ended);
        setnewItemLoading(false);
    }

    function renderItems(comics) {
        const elements = comics.map((comic, i) => {
            const {thumbnail, title, id, price} = comic;
            return (
                <li className='comic__item'
                tabIndex = "0"
                key={id}
                >
                    <img src={thumbnail} style={thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit:'contain'} : {objectFit:'cover'}} alt={title}/>
                     <div className="comics__title">{title}</div>
                </li>
            )
        })
        return (
                <>{elements}</>
        )
    }

    const items = renderItems(comics)
    const errorMessage = error ? <ErrorMessage /> : null
    const spiner = loading && !newItemLoading  ? <Spinner /> : null
    return  (
        <div className="comics__list">
            <img src={banner} alt="avengers banner" className="banner"/>
            <ul className="comics__grid">
                {errorMessage} {spiner} {items}
            </ul>
            <button onClick={() => {onLoadMoreComics(offset)}} className="button button__main button__long" style={loading || comicsEnded || newItemLoading  ? {display: "none"} : {display:"block"}}>
            
                <div className="inner">load more</div>
            </button>
        </div>
    ) 
}

export default Comics;