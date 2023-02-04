import {Component} from 'react'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {BsBriefcaseFill} from 'react-icons/bs'
import {BiNavigation} from 'react-icons/bi'

import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'

import './index.css'

const loaderStatics = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {
    jobDetailsData: {},
    skills: [],
    similarJobsData: [],
    loaderStatus: loaderStatics.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({loaderStatus: loaderStatics.progress})

    const jwtToken = Cookie.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(id)
    const jobDetailsUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobDetailsUrl, options)
    const data = await response.json()
    // console.log(data)
    const jobDetails = data.job_details
    const similarJobs = data.similar_jobs
    const {skills} = jobDetails
    // console.log(similarJobs)
    const updatedDetails = {
      companyLogoUrl: jobDetails.company_logo_url,
      companyWebsiteUrl: jobDetails.company_website_url,
      employmentType: jobDetails.employment_type,
      id: jobDetails.id,
      jobDescription: jobDetails.job_description,
      lifeAtCompanyDescription: jobDetails.life_at_company.description,
      lifeAtCompanyImgUrl: jobDetails.life_at_company.image_url,
      location: jobDetails.location,
      packagePerAnnum: jobDetails.package_per_annum,
      rating: jobDetails.rating,
      title: jobDetails.title,
    }

    const updatedSkills = skills.map(each => ({
      imageUrl: each.image_url,
      name: each.name,
    }))
    // console.log(updatedSkills)

    const updatedSimilarJobs = similarJobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      rating: each.rating,
      title: each.title,
    }))

    this.setState({
      jobDetailsData: updatedDetails,
      skills: updatedSkills,
      similarJobsData: updatedSimilarJobs,
      loaderStatus: loaderStatics.success,
    })
  }

  renderSkills = () => {
    const {skills} = this.state
    return skills.map(each => (
      <li key={each.name} className="skills-con">
        <img className="skills-img" src={each.imageUrl} alt={each.name} />
        <p className="skill-txt">{each.name}</p>
      </li>
    ))
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderDetailsView = () => {
    const {jobDetailsData, similarJobsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      //   id,
      jobDescription,
      lifeAtCompanyDescription,
      lifeAtCompanyImgUrl,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetailsData
    return (
      <>
        <div className="job-card-bg">
          <div className="logo-container">
            <img
              className="card-company-logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div>
              <h1 className="title">{title}</h1>
              <div className="rating-con">
                <AiFillStar className="star-icon" size={18} />
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
          <div className="visit-con">
            <h1 className="job-des-heading">Description</h1>
            <a href={companyWebsiteUrl} className="visit-icon-con">
              <p className="visit">Visit</p>
              <BiNavigation />
            </a>
          </div>
          <p className="job-des">{jobDescription}</p>
          <h1 className="skills">Skills</h1>
          <ul className="skills-container">{this.renderSkills()}</ul>
          <h1 className="job-des-heading">Life at Company</h1>
          <div className="life-at-company-con">
            <p className="job-des-life-at-company">
              {lifeAtCompanyDescription}
            </p>
            <img src={lifeAtCompanyImgUrl} alt="life at company" />
          </div>
        </div>
        <h1 className="similar-jobs">Similar Jobs</h1>
        <ul className="similar-jobs-con">
          {similarJobsData.map(each => (
            <SimilarJobCard details={each} key={each.id} />
          ))}
        </ul>
      </>
    )
  }

  renderProcessViews = loaderStatus => {
    // const {loaderStatus} = this.state
    switch (loaderStatus) {
      case loaderStatics.progress:
        return this.renderLoader()
      case loaderStatics.success:
        return this.renderDetailsView()
      default:
        return null
    }
  }

  render() {
    const {loaderStatus} = this.state
    const jsx = this.renderProcessViews(loaderStatus)
    return (
      <div>
        <Header />
        <div className="job-details-main-bg">{jsx}</div>
      </div>
    )
  }
}

export default JobDetails
