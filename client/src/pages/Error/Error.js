import './Error.scss'
import { Link } from 'react-router-dom'
import error from '../../assets/error.png'

export const Error=()=>{
    return(
        <>
        <div className="error-container">
            <h1 className="error-title">404</h1>
            <h2 className="error-subtitle">Oops! The page you searched for was not found.</h2>
            <img  src={error} alt="" id='error-image'/>
            <p className='error-redirect'>Go back to <Link to="/posts">homepage</Link></p>
        </div>
        </>
    )
}