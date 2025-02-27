import CharInfo from "../components/charInfo/CharInfo";
import CharList from "../components/charList/CharList";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import RandomChar from "../components/randomChar/RandomChar";
import { useState } from 'react';
import decoration from '../resources/img/vision.png';


export function MainPage() {
    const [selectedId, setSelectedId] = useState(null)

    const ChangeId = (selectedId) => {
        setSelectedId(selectedId)
    }


    return (
        <>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList setSelectedId={ChangeId} />
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo selectedId={selectedId} />
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    );
}