import './charList.scss';
import { useState, useEffect, useRef } from 'react';
import { useMarvelServer } from '../../API/server';
import { TransitionGroup, CSSTransition } from "react-transition-group"
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

const CharList = ({ setSelectedId }) => {
    const [state, setState] = useState({
        chars: [],
        offset: 0,
        end: false
    })
    const [newItemLoading, setNewItemLoading] = useState(false)

    const { loading, error, getAllChar, clearError, getData } = useMarvelServer();

    useEffect(() => {
        getSomeChars(offset, true)
    }, [])

    async function onCharsLoaded(newData) {
        // const { hello, secondHello } = await import("./TestFunc")
        // hello()
        // secondHello()
        let ended = newData.length < 9;

        setState((prev) => ({
            ...prev,
            chars: [...prev.chars, ...newData],
            offset: prev.offset + 9,
            end: ended
        }));
        setNewItemLoading(false)
    }

    function getSomeChars(offset, init) {
        clearError()
        init ? setNewItemLoading(false) : setNewItemLoading(true);

        getAllChar(offset)
            .then(onCharsLoaded)
    }

    const refArr = useRef([]);
    function handleClick(id) {
        refArr.current.forEach(ref => ref.classList.remove("char__item_selected"));
        refArr.current[id].classList.add("char__item_selected");
        refArr.current[id].focus();
    }

    function charsListItems( arr ) {
        const items = arr.map((char, index) => {
            let style = { objectFit: "cover" };
            const time = 500

            if (
                char.thumbnail ===
                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
            ) {
                style = { objectFit: "contain" };
            }

            return (
                <CSSTransition
                    key={index}
                    timeout={time}
                    classNames="char__item">
                    <li
                        onClick={() => {
                            setSelectedId(char.id);
                            handleClick(index);
                        }}
                        ref={(elem) => refArr.current[index] = elem}
                        key={index}
                        className="char__item"
                    >
                        <img style={style} src={char.thumbnail} alt="abyss" />
                        <div className="char__name">{char.name}</div>
                    </li>
                </CSSTransition>
            );
        })
        return (
            <TransitionGroup component="ul" className="char__grid">
                {items}
            </TransitionGroup>
        )
    }

    const { chars, offset, end } = state,
    spinner = loading && !newItemLoading ? <Spinner /> : null,
    errorMessage = error ? <Error /> : null,
    items = charsListItems(chars)

    // if(loading){
    //     import("./TestFunc")
    //     .then(obj => obj.default())
    //     .catch(console.log("Error"))
    // }

    return (
        <div className="char__list">
            {items}
            {errorMessage}
            {spinner}
            <button style={{ "display": end ? "none" : "block" }} disabled={newItemLoading} onClick={() => getSomeChars(offset)} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


export default CharList;