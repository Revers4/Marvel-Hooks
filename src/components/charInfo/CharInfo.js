import './charInfo.scss';
import { useEffect, useState } from 'react';
import { useMarvelServer } from '../../API/server';
import setContent from '../../utils/setContent';

const CharInfo = ({ selectedId }) => {
    const [char, setChar] = useState(null)

    const {  getOneChar, clearError, process, setProcess } = useMarvelServer();

    const onCharLoaded = (char) => { setChar(char) }

    const getChar = () => {
        if (!selectedId) {
            return;
        }

        clearError()

        getOneChar(selectedId)
            .then(onCharLoaded)
            .then(() => setProcess("confirmed"))
    };

    useEffect(() => {
        getChar()
    }, [selectedId])
    
    
    return (
        <div className="char__info">
            {setContent(process, () => View(char))}
        </div>
    )
}

const View = ({ data }) => {

    let { name, description, detail, thumbnail, wiki, comics } = data

    let style = { 'objectFit': 'cover' }

    if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        style = { 'objectFit': 'contain' }
    }


    return (
        <>
            <div className="char__basics">
                <img style={style} src={thumbnail} alt="abyss" />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={detail} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? (
                    comics.map((comic, index) => (
                        <li key={index} className="char__comics-item">
                            {comic.name}
                        </li>
                    ))
                ) : (
                    <li className="char__comics-item">Unfortunately, there are no comics</li>
                )}
            </ul>
        </>
    )
}

export default CharInfo;