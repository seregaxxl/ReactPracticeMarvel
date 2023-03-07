import { Link } from "react-router-dom"
import ErrorMessage from "../errorMessage/ErrorMessage"


const Page404 = () => {
    return (
        <div>
            <ErrorMessage />
            <p style={{'textAlign':'center', 'font-weight':'bold', 'font-family': 'Roboto'}}>Page doesnt exist</p>
            <Link style={{'display':'block', 'font-weight':'bold', 'textAlign':'center', 'font-family': 'Roboto', 'margin-top':'30px'}} to="/">Return to main page</Link>
        </div>
    )
}

export default Page404;