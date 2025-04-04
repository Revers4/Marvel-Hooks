import CharInfo from "../charInfo/CharInfo";
import CharList from "../charList/CharList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import RandomChar from "../randomChar/RandomChar";
import { useState } from 'react';
import decoration from '../../resources/img/vision.png';
import { CharSearch } from "../charSearch/CharSearch";
import { Helmet } from "react-helmet";


export default function MainPage() {
    const [selectedId, setSelectedId] = useState(null)

    const ChangeId = (selectedId) => {
        setSelectedId(selectedId)
    }


    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                />
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList setSelectedId={ChangeId} />
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                        <CharInfo selectedId={selectedId} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharSearch />
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    );
}