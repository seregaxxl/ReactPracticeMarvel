import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { useState, useRef, useEffect } from 'react';

const CharList = (props) => {
    const [chars, setChars] = useState([]);
    const [offset, setOffset] = useState(0);
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();


    useEffect(() => {
        onLoadMoreChars(offset, true)
    },[])

    const onLoadMoreChars = (offset, initial) => {
        initial ? setnewItemLoading(false) : setnewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }

    const onCharListLoaded = (newChars) => {
        let ended = false;
        if(newChars.length < 9) {
            ended = true
        }
        setChars(chars => [...chars, ...newChars]);
        setOffset(offset => offset + 9);
        setCharEnded(ended => ended);
        setnewItemLoading(false);
    }

    const itemRefs = useRef([]);



    // const highlightSelected = (id) => {
    //     itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
    //     itemRefs.current[id].classList.add('char__item_selected');
    //     itemRefs.current[id].focus();

    // }

    function renderItems(chars) {
        const elements = chars.map((char, i) => {
            const {thumbnail, name, id} = char;
            return (
                <li className='char__item'
                tabIndex = "0"
                ref={el => {
                    itemRefs.current[i] = el;
                }}
                key={id}
                onClick={()=>{
                    props.onCharSelected(id)
                    // highlightSelected(i)
                }}>
                    <img src={thumbnail} style={thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit:'contain'} : {objectFit:'cover'}} alt={name}/>
                     <div className="char__name">{name}</div>
                </li>
            )
        })
        return (
                <>{elements}</>
        )
    }

    const items = renderItems(chars)
    const errorMessage = error ? <ErrorMessage /> : null
    const spiner = loading && !newItemLoading  ? <Spinner /> : null
    return  (
        <div className="char__list">
            <ul className="char__grid">
                {errorMessage} {spiner} {items}
            </ul>
            <button onClick={() => {onLoadMoreChars(offset)}} className="button button__main button__long" style={loading || charEnded || newItemLoading  ? {display: "none"} : {display:"block"}}>
            
                <div className="inner">load more</div>
            </button>
        </div>
    ) 
}

export default CharList;