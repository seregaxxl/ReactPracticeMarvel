import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { useState, useEffect, useMemo } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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

const CharList = (props) => {
    const [chars, setChars] = useState([]);
    const [offset, setOffset] = useState(0);
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, getAllCharacters, process, setProcess} = useMarvelService();


    useEffect(() => {
        onLoadMoreChars(offset, true);
    },[])

    const onLoadMoreChars = (offset, initial) => {
        initial ? setnewItemLoading(false) : setnewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(()=>{setProcess('confirmed')})
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

    // const itemRefs = useRef([]);


    function renderItems(chars) {

        const elements = chars.map((char, i) => {
            const timeout = 500 * ((i + 1) % 9);
            const {thumbnail, name, id} = char;
            return (
                <CSSTransition
                in={!loading & !newItemLoading}
                appear={true}
                key={id}
                timeout={timeout}
                classNames={'char__item'} >
                        <li className='char__item'
                        tabIndex = "0"
                        onClick={()=>{
                            props.onCharSelected(id)
                        }}
                        >
                            <img src={thumbnail} style={thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit:'contain'} : {objectFit:'cover'}} alt={name}/>
                            <div className="char__name">{name}</div>
                        </li>
                </CSSTransition>
                
            )
        })
        return (
            <ul className="char__grid">
            <TransitionGroup component={null}>
                {elements}
            </TransitionGroup>
        </ul>
        )
    }

    const elements = useMemo(() => {
        return setContent(process,()=>renderItems(chars),newItemLoading)
    }, [process])

    return  (
        <div className="char__list">
                {elements}
            <button onClick={() => {onLoadMoreChars(offset)}} className="button button__main button__long" style={loading || charEnded || newItemLoading  ? {display: "none"} : {display:"block"}}>
            
                <div className="inner">load more</div>
            </button>
            {/* <button onClick={() => {setAppear(true)}} className="button button__main button__long">
                <div className="appear">appear</div>
            </button> */}
        </div>
    ) 
}

export default CharList;