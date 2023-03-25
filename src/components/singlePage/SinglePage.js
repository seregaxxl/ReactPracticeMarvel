import './singlePage.scss';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import setContent from '../../utils/setContent';
import useMarvelService from '../../services/MarvelService';
import banner from '../../resources/img/Banner.png'
import {Helmet} from "react-helmet";

const SinglePage = ({dataType}) => {
    const [data, setdata] = useState({});
    const {getCharByName, getComic, clearError, process, setProcess} = useMarvelService();
    let {id} = useParams();

    useEffect(() => {
        updateChar()
        console.log(id)
    },[id])

    const updateChar = () => {
        clearError();
        if(!id) {
            return;
        }
        switch (dataType) {
            case 'comic':
                getComic(id)
                    .then(onDataLoaded)
                    .then(() => {setProcess('confirmed')})
                break
            case 'char':
                getCharByName(id)
                    .then(onDataLoaded)
                    .then(() => {setProcess('confirmed')})
                break
        }

    }

    const onDataLoaded = (data) => {
        setdata(data);
    }


    return (
        <>
            <Helmet>
                <meta name="description" content={"Page with information about" + {dataType}}/>
                <title>{dataType} page</title>
            </Helmet>
            <div className="char__info">
            <img src={banner} alt="avengers banner" className="banner"/>
            {setContent(process, View, data)}
        </div>
        </>

    )
    
}

const View = ({data}) => {
    const {thumbnail, description} = data;

    return (
        <div className="single-char"> 
            <img src={thumbnail} alt={data.name ? data.name : data.title} className="single-char__img"/>
            <div className="single-char__info">
                <h2 className="single-char__name">{data.name ? data.name : data.title}</h2>
                <p className="single-char__descr">{description ? description : 'There is no description'}</p>
                {data.title ? <>
                    <p className="single-char__descr">{data.pageCount ? `${data.pageCount} pages` : 'Page count not indicated'}</p>
                <p className="single-char__descr">{data.language ? `Language: ${data.language}` : 'Language not indicated'}</p>
                <div className="single-char__price">{data.price ? data.price + '$' : 'NOT AVAILABLE'}</div>
                <Link to={'/comics'} className="single-char__back">Back to all</Link>
                </> : <Link to={'/'} className="single-char__back">Back to main</Link>}
            </div>
        </div>
    )

}

export default SinglePage;
