import Comics from "../comics/comics"
import ErrorBoundary from "../errorBoundary/errorBoundary";

const ComicsPage = () => {
    return (
        <>
            <ErrorBoundary>
                <Comics/>  
            </ErrorBoundary>
        </>
    )
}

export default ComicsPage;