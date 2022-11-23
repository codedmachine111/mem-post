import './Navbar.css'
import { Link } from "react-router-dom"
import {Button} from '../Button/Button'
import { useContext } from 'react'
import { UserContext } from '../../App'

export const Navbar = () => {
  
  const {currentUser} = useContext(UserContext);

  return (
    <nav>
      <div className="logo">
        <img src="" alt="" className='logo-img' />
      </div>
      
      <div className='nav-menu'>
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="checkbtn">
        <i className="fa fa-bars"></i>
      </label>
      <ul className="list">
        <li id="active"><Link to="/">Home</Link></li>
        <li><Link to="/create" id="d">Create</Link></li>
        {!currentUser ? <li><Link to="/auth" id="d">Sign-in</Link></li> : <li><Button title="signout" id="signout"/></li> }
        
      </ul>
      </div>
    </nav>
  )
}