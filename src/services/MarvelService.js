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

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
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
        return {
            title:comics.title,
            description:comics.description,
            thumbnail:`${comics.thumbnail.path}.${comics.thumbnail.extension}`,
            homepage:comics.urls[0].url,
            id:comics.id,
            price:comics.prices[0].price
        }
    }

    return {loading, error, getAllCharacters, getAllComics, getCharacter, clearError}

}




// const postData = async (url, data) => {
//     let res = await fetch(url, {
//         method:'POST',
//         body:data
//     });
//     return await res.text();
// };



export default useMarvelService;