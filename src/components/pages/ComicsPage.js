import { Helmet } from "react-helmet";
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";

export default function ComicsPage() {
    return (
        <>
            <Helmet>
                <meta name="description" content="Explore the list of Marvel comics. Discover your favorite heroes and their adventures in the Marvel universe." />
                <title>Comics Page | Marvel Information Portal</title>
            </Helmet>
            <AppBanner />
            <ComicsList />
        </>
    );
}