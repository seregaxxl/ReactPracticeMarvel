import './charList.scss';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { useState, useRef, useEffect } from 'react';

const CharList = (props) => {
    const [chars, setChars] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [charEnded, setCharEnded] = useState(false);
    const [charClasses, setClasses] = useState('char__item');

    const marvelService = new MarvelService();


    useEffect(() => {
        onLoadMoreChars()
    },[])

    const onLoadMoreChars = () => {
        onCharLoading()    
        marvelService
            .getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    // onNewCharLoading = () => {
    //     this.setState({newItemLoading:true})
    // }

    const onCharLoading = () => {
        setLoading(true);
    }

    const onCharListLoaded = (newChars) => {
        let ended = false;
        if(newChars.length < 9) {
            ended = true
        }
        setChars(chars => [...chars, ...newChars]);
        setLoading(false);
        setError(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended => ended);
    }

    const itemRefs = useRef([]);



    // const highlightSelected = (id) => {
    //     itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
    //     itemRefs.current[id].classList.add('char__item_selected');
    //     itemRefs.current[id].focus();

    // }




    const onError = () => {
        setLoading(false);
        setError(true);
    }

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
    const spiner = loading ? <Spinner /> : null
    const content = !(error || loading) ? items : null
    return  (
        <div className="char__list">
            <ul className="char__grid">
                {errorMessage} {spiner} {content}
            </ul>
            <button onClick={onLoadMoreChars} className="button button__main button__long" style={loading || charEnded ? {display: "none"} : {display:"block"}}>
            
                <div className="inner">load more</div>
            </button>
        </div>
    ) 
}

export default CharList;