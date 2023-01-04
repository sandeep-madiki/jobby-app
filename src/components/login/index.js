import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrMsg: false, errorMessage: ''}

  updateUsername = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUserNameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="label" htmlFor="userName">
          USERNAME
        </label>
        <input
          id="userName"
          type="text"
          className="input-field"
          value={username}
          placeholder="Username"
          onChange={this.updateUsername}
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          value={password}
          id="password"
          className="input-field"
          placeholder="Password"
          onChange={this.updatePassword}
        />
      </>
    )
  }

  setJwtCookie = token => {
    Cookies.set('jwt_token', token, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  submitForm = async event => {
    const {username, password} = this.state
    event.preventDefault()

    const loginUrl = 'https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.setState({showErrMsg: false})
      this.setJwtCookie(data.jwt_token)
    } else {
      this.setState({showErrMsg: true, errorMessage: data.error_msg})
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) <Redirect to="/" />
    const {showErrMsg, errorMessage} = this.state
    return (
      <div className="login-main-bg">
        <div className="login-bg">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form onSubmit={this.submitForm}>
            {this.renderUserNameField()}
            {this.renderPasswordField()}
            <button type="submit" className="login-btn">
              Login
            </button>
            {showErrMsg && <p className="error-msg">{errorMessage}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
