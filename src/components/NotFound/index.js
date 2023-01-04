import './index.css'

const re = "'re"

const NotFound = () => (
  <div className="not-found-bg">
    <img
      className="not-found-img"
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-description">
      {`we${re} sorry, the page you requested could not be found`}
    </p>
  </div>
)

export default NotFound
