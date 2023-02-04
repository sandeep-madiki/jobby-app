import {Link, withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const removeJwtToken = () => {
    Cookie.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/">
        <img
          className="header-logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>

      <ul className="header-list-con">
        <Link to="/">
          <li className="header-list-item-home">Home</li>
        </Link>

        <Link className="header-icon" to="/">
          <li className="header-list-item">
            <AiFillHome size={26} />
          </li>
        </Link>

        <Link to="/jobs">
          <li className="header-list-item-home">Jobs</li>
        </Link>

        <Link className="header-icon" to="/jobs">
          <li className="header-list-item">
            <BsFillBriefcaseFill size={26} />
          </li>
        </Link>
      </ul>
      <li className="btn-list-item">
        <button type="button" className="log-out-btn" onClick={removeJwtToken}>
          Logout
        </button>
      </li>

      <li className="header-list-item-logout">
        <FiLogOut onClick={removeJwtToken} size={26} />
      </li>
    </div>
  )
}

export default withRouter(Header)
