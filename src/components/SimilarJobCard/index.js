import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobCard = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    // id,
    jobDescription,
    location,
    rating,
    title,
  } = details
  return (
    <li className="similar-job-card-bg">
      <div className="logo-container">
        <img
          className="card-company-logo"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div>
          <h1 className="title">{title}</h1>
          <div className="rating-con">
            <AiFillStar className="star-icon" size={18} />
            <p className="card-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="job-des-heading">Description</h1>
      <p className="job-des">{jobDescription}</p>
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
    </li>
  )
}

export default SimilarJobCard
