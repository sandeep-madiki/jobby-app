import {Link, withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'
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
          <li className="header-list-item">Home</li>
        </Link>
        <Link to="/jobs">
          <li className="header-list-item">Jobs</li>
        </Link>
      </ul>
      <button type="button" className="log-out-btn" onClick={removeJwtToken}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
