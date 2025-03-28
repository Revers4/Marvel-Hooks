import './singleChar.scss';
import { useParams } from "react-router-dom";
import { useMarvelServer } from '../../API/server';
import { useEffect, useState } from 'react';
import AppBanner from '../appBanner/AppBanner';
import { Helmet } from 'react-helmet';
import setContent from '../../utils/setContent';

const SingleCharPage = () => {
    const [char, setChar] = useState(null)
    const { getOneChar, clearError, process, setProcess } = useMarvelServer()
    const { charId } = useParams()

    const onCharLoaded = (char) => {
        setChar(char)
    }

    useEffect(() => {
        clearError()

        getOneChar(charId)
            .then(onCharLoaded)
            .then(() => setProcess("confirmed"))
    }, [charId]);

    return (
        <>
            <AppBanner />
            <div className="single-char">
                {setContent(process, () => View(char))}
            </div>
        </>
    )
}

const View = ({ char }) => {
    let { name, thumbnail } = char
    let description = char.description || "Unfortunately, there is no description";

    return (
        <>
            <Helmet>
                <meta name="description" content={`Discover detailed information about ${name} from the Marvel universe. Learn about their story, abilities, and appearances in comics.`} />
                <title>{name} | Marvel Information Portal</title>
            </Helmet>
            <img src={thumbnail} alt="x-men" className="single-char__img"/>
            <div className="single-char__info">
                <h2 className='single-char__name'>{name}</h2>
                <p className="single-char__descr">{description}</p>
            </div>
        </>
    )
}

export default SingleCharPage;