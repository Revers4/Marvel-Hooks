import { useHttp } from "../hooks/https.hooks"
import md5 from 'md5';

const publicKey = "05f05a7254c7f47148993eee3927e032";
const privateKey = "0788f532268fd300ee29352313f2fd7b596cf164";

export const useMarvelServer = () => {
    const char_limit = 9
    const comic_limit = 8
    const { loading, request, error, clearError, process, setProcess } = useHttp()

    const getOneChar = async (id) => {
        const data = await request(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=${publicKey}`)
        return transformChar(data.data.results[0])
    }

    const getOneCharByName = async (name) => {
        const data = await request(`https://gateway.marvel.com:443/v1/public/characters?name=${name}&apikey=${publicKey}`)
        return data.data.results.map(transformChar)
    }

    const getAllChar = async (offset) => {
        const data = await request(`https://gateway.marvel.com:443/v1/public/characters?limit=${char_limit}&offset=${offset}&apikey=${publicKey}`)
        return data.data.results.map(transformChar)
    }

    const getAllComics = async (offset) => {
        const data = await request(`https://gateway.marvel.com:443/v1/public/comics?limit=${comic_limit}&offset=${offset}&orderBy=title&apikey=${publicKey}`);
        return data.data.results.map(transformComics);
    };

    const getOneComic = async (comicId) => {
        const data = await request(`https://gateway.marvel.com:443/v1/public/comics/${comicId}?apikey=${publicKey}`);
        return transformComics(data.data.results[0]);
    };

    const transformComics = (data) => {
        return {
            title: data.title,
            price: data.prices[0].price,
            thumbnail: data.thumbnail.path + "." + data.thumbnail.extension,
            description: data.description,
            pages: data.pageCount,
            id: data.id
        }
    }

    const transformChar = (data) => {
        return {
            name: data.name,
            description: data.description,
            thumbnail: data.thumbnail.path + '.' + data.thumbnail.extension,
            detail: data.urls[0].url,
            wiki: data.urls[1].url,
            comics: data.comics.items.length > 10 ? data.comics.items.slice(0, 10) : data.comics.items,
            id: data.id
        }
    }

    return {
        loading,
        error,
        clearError,
        process,
        setProcess,
        getOneChar,
        getAllChar,
        getAllComics,
        getOneCharByName,
        getOneComic
    }

}