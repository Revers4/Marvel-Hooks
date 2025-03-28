import './comicsList.scss';
import { useState, useEffect } from "react";
import { useMarvelServer } from '../../API/server';
import { Link } from "react-router-dom";
import setContent from '../../utils/setContent';

const ComicsList = () => {
    const [comics, setComics] = useState([])
    const [offset, setOffset] = useState(0)
    const [end, setEnd] = useState(false)
    const [newItemLoading, setNewItemLoading] = useState(false)
    const { clearError, getAllComics, process, setProcess } = useMarvelServer()

    useEffect(() => {
        getSomeComics(offset, true)
    }, []);

    function onCharsLoaded(newData) {
        let ended = newData.length < 8;

        setComics((prev) => [...prev, ...newData])
        setOffset(prev => prev + 20)
        setEnd(ended)
        setNewItemLoading(false)
    } 

    function getSomeComics(offset, init) {
        clearError()
        init ? setNewItemLoading(false) : setNewItemLoading(true);

        getAllComics(offset)
            .then(onCharsLoaded)
            .then(() => setProcess("confirmed"))
    }

    function comicsListItems(arr) {
        const items = arr.map((comic, index) => {
            let price = comic.price

            let style = comic.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
            ? { objectFit: "contain" }
            : { objectFit: "cover" };

            price === 0 ? price = "NOT AVAILABLE" : price = price + "$"

            return (
                <li key={index} className="comics__item">
                    <Link to={`/comics/${comic.id}`}>
                        <img 
                        style={style} 
                        src={comic.thumbnail} 
                        alt="ultimate war" 
                        className="comics__item-img" />
                        <div className="comics__item-name">{comic.title}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
                </li>
            );
        })
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    return (
        <div className="comics__list">
            {setContent(process, () => comicsListItems(comics), newItemLoading)}
            <button
                style={{ "display": end ? "none" : "block" }}
                disabled={newItemLoading}
                onClick={() => getSomeComics(offset)}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;