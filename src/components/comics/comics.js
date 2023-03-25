import './comics.scss';
import banner from '../../resources/img/Banner.png'
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const setContent = (process, Component, newItemLoading) => {
    switch (process) { 
        case 'waiting':
            return <Spinner />
            break
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner />
            break
        case 'error':
            return <ErrorMessage />
            break
        case 'confirmed':
            return <Component/>
            break
        default :
            throw new Error('Unexpected case');
            break
    }
}

const Comics = () => {

    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(0);
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics, process, setProcess} = useMarvelService();

    useEffect(() => {
        onLoadMoreComics(offset, true)
    },[])

    const onLoadMoreComics = (offset, initial) => {
        initial ? setnewItemLoading(false) : setnewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(()=>{setProcess('confirmed')})
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
                <li className='comics__item'
                tabIndex = "0"
                key={id}
                >
                    <Link to={`/comics/${comic.id}`}>
                        <img src={thumbnail} style={thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit:'contain'} : {objectFit:'cover'}} alt={title}/>
                        <div className="comics__title">{title}</div>
                        <div className="comics__price">{price ? price + '$' : 'NOT AVAILABLE'}</div>
                    </Link>
                </li>
            )
        })
        return (
                <>{elements}</>
        )
    }

    return  (
        <div className="comics__list">
            <img src={banner} alt="avengers banner" className="banner"/>
            <ul className="comics__grid">
            {setContent(process,()=>renderItems(comics),newItemLoading)}
            </ul>
            <button onClick={() => {onLoadMoreComics(offset)}} className="button button__main button__long" style={loading || comicsEnded || newItemLoading  ? {display: "none"} : {display:"block"}}>
            
                <div className="inner">load more</div>
            </button>
        </div>
    ) 
}

export default Comics;