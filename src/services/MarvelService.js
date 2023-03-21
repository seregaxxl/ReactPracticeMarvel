import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();
    const _apiBase ='https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=1ccead43c3f60ca1e24ebfd0cae0f8eb';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        let res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getAllComics = async (offset = _baseOffset) => {
        let res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getCharByName = async (name) => {
        console.log(`${_apiBase}characters?name=${name}&${_apiKey}`)
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        if (res.data.results[0]) {
            return _transformCharGotByName(res.data.results[0]);
        } else return null
        
    }

    const _transformCharGotByName = (char) => {
        return {
            id:char.id,
            name:char.name,
            description:char.description,
            thumbnail:`${char.thumbnail.path}.${char.thumbnail.extension}`
        }
    }

    const _transformCharacter = (char) => {
        return {
            name:char.name,
            description:char.description,
            thumbnail:`${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage:char.urls[0].url,
            wiki:char.urls[1].url,
            id:char.id,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        console.log(comics.textObjects[0])
        return {
            title:comics.title,
            description:comics.description,
            thumbnail:`${comics.thumbnail.path}.${comics.thumbnail.extension}`,
            homepage:comics.urls[0].url,
            id:comics.id,
            price:comics.prices[0].price,
            pageCount: comics.pageCount,
            language: comics.textObjects && comics.textObjects.length > 0 && comics.textObjects[0].language ? comics.textObjects[0].language : null
        }
    }

    return {loading, error, getAllCharacters, getAllComics, getComic, getCharacter, clearError, getCharByName}

}




// const postData = async (url, data) => {
//     let res = await fetch(url, {
//         method:'POST',
//         body:data
//     });
//     return await res.text();
// };



export default useMarvelService;