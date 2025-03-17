import { useHttp } from "../hooks/https.hooks"

export const useMarvelServer = () => {
    const char_limit = 9
    const comic_limit = 8
    const { loading, request, error, clearError } = useHttp()

    const getOneChar = async (id) =>{
        const data = await request(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=05f05a7254c7f47148993eee3927e032`)
        return transformChar(data.data.results[0])
    }
    
    const getAllChar = async (offset) =>{
        const data = await request(`https://gateway.marvel.com:443/v1/public/characters?limit=${char_limit}&offset=${offset}&apikey=05f05a7254c7f47148993eee3927e032`)
        return data.data.results.map((item) => transformChar(item))
    }

    const getAllComics = async (offset) => {
        const data = await request(`https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=${offset}&orderBy=title&apikey=05f05a7254c7f47148993eee3927e032`);
        return data.data.results.map((item) => transformComics(item));
    };

    const getOneComic = async (comicId) => {
        const data = await request(`https://gateway.marvel.com:443/v1/public/comics/${comicId}?apikey=05f05a7254c7f47148993eee3927e032`);
        // console.log(`Comic ID: ${comicId}`, data.data.results[0]);
        return transformComics(data.data.results[0]);
    };

    const transformComics = (data) =>{
        return {
            title: data.title,
            price: data.prices[0].price,
            thumbnail: data.thumbnail.path + "." + data.thumbnail.extension,
            description: data.description,
            pages: data.pageCount,
            id: data.id
        }
    }

    const transformChar = (data) =>{
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

    return { loading, error, getOneChar, getAllChar, clearError, getAllComics, getOneComic }

}