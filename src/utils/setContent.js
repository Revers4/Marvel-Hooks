import Skeleton from "../components/skeleton/Skeleton";
import Spinner from "../components/spinner/Spinner";
import Error from "../components/error/Error";

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Skeleton />;
        case 'loading':
            return newItemLoading ? <Component /> : <Spinner/>;
        case 'confirmed':
            return <Component />;
        case 'error':
            return <Error/>;
        default:
            throw new Error("Unexpected state process")
    }
}

export default setContent