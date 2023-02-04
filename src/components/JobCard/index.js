import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    id,
    rating,
    title,
  } = details
  return (
    <Link className="link" to={`/jobs/${id}`}>
      <li className="job-card-bg">
        <div className="logo-container">
          <img
            className="card-company-logo"
            src={companyLogoUrl}
            alt="job details company logo"
          />
          <div>
            <h1 className="title">{title}</h1>
            <div className="rating-con">
              <AiFillStar className="star-icon" size={16} />
              <p className="card-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-employment-container">
          <div className="location-sub-con">
            <div className="location-container">
              <ImLocation size={24} className="location-icon" />
              <p className="location-icon-text">{location}</p>
            </div>
            <div className="location-container">
              <BsBriefcaseFill size={24} className="location-icon" />
              <p className="location-icon-text">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <h1 className="job-des-heading">Description</h1>
        <p className="job-des">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
