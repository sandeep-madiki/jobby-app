import {Link, Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'
import Header from '../Header'
import './index.css'

const Home = () => {
  const jwtToken = Cookie.get('jwt_token')
  if (jwtToken !== undefined) <Redirect to="/login" />
  return (
    <>
      <Header />
      <div className="home-bg-img">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-des">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs" className="link">
          <button type="button" className="find-jobs-btn">
            Find Jobs
          </button>
        </Link>
      </div>
    </>
  )
}

export default Home
