import './singleComic.scss';
import { useParams, Link } from "react-router-dom";
import { useMarvelServer } from '../../API/server';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import setContent from '../../utils/setContent';

const SingleComic = () => {
    const [comic, setComic] = useState({})
    const {  getOneComic, clearError, process, setProcess } = useMarvelServer()
    const { comicId } = useParams()

    const onComicLoaded = (comic) => {
        setComic(comic)
    }

    const getComic = () => {
        clearError()

        getOneComic(comicId)
            .then(onComicLoaded)
            .then(() => setProcess("confirmed"))
    }

    useEffect(() => {
        getComic()
    }, [comicId]);

    return (
        <div className="single-comic">
            {setContent(process, () => View(comic))}
        </div>
    )
}

const View = ({ comic }) => {
    let { price, thumbnail, title, pages, description } = comic

    price === 0 ? price = "NOT AVAILABLE" : price = price + "$"

    return (
        <>
            <Helmet>
                <meta name="description" content={`Discover detailed information about ${title} from the Marvel universe. Learn about their story, abilities, and appearances in comics.`} />
                <title>{title} | Marvel Information Portal</title>
            </Helmet>
            <img src={thumbnail} alt="x-men" className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pages} pages</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </>
    )
}

export default SingleComic;