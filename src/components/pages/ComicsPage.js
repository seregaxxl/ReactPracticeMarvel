import Comics from "../comics/comics"
import ErrorBoundary from "../errorBoundary/errorBoundary";
import {Helmet} from "react-helmet";

const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta name="description" content="Page with list of comics"/>
                <title>Comics page</title>
            </Helmet>
            <ErrorBoundary>
                <Comics/>  
            </ErrorBoundary>
        </>
    )
}

export default ComicsPage;