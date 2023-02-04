import {Component} from 'react'
import Cookie from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobCard from '../JobCard'

import './index.css'

const loadingStages = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    userProfile: {},
    jobsData: [],
    jobType: [],
    salaryRange: 1000000,
    searchVal: '',
    jobsDataStatus: loadingStages.initial,
    userDetailsStatus: loadingStages.initial,
  }

  componentDidMount() {
    this.getUserDetails()
    this.getAllJobsDetails()
  }

  getUserDetails = async () => {
    this.setState({userDetailsStatus: loadingStages.progress})

    const jwtToken = Cookie.get('jwt_token')
    const userDetailsUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(userDetailsUrl, options)
    const data = await response.json()
    if (response.ok) {
      const profile = data.profile_details
      const UpdatedProfile = {
        profileImageUrl: profile.profile_image_url,
        name: profile.name,
        shortBio: profile.short_bio,
      }

      this.setState({
        userProfile: UpdatedProfile,
        userDetailsStatus: loadingStages.success,
      })
    } else {
      this.setState({userDetailsStatus: loadingStages.failure})
    }
  }

  getAllJobsDetails = async () => {
    this.setState({jobsDataStatus: loadingStages.progress})

    const {jobType, salaryRange, searchVal} = this.state

    const joinedJobTypes = jobType.join()
    console.log(joinedJobTypes)
    const jwtToken = Cookie.get('jwt_token')
    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${jobType}&minimum_package=${salaryRange}&search=${searchVal}`
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobsUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.setState({jobsDataStatus: loadingStages.success})

      const jobsData = data.jobs
      const updatedJobsData = jobsData.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobsData: updatedJobsData,
        jobsDataStatus: loadingStages.success,
      })
    } else {
      this.setState({jobsDataStatus: loadingStages.failure})
    }
  }

  getJobType = event => {
    const {jobType} = this.state
    const jobTypeItem = event.target.value
    const check = jobType.includes(jobTypeItem)
    if (check === false) {
      const updatedArray = [...jobType, jobTypeItem]
      this.setState({jobType: updatedArray}, this.getAllJobsDetails)
      //   console.log(updatedArray)
    } else {
      const filtered = jobType.filter(each => each !== jobTypeItem)
      this.setState({jobType: filtered}, this.getAllJobsDetails)
      //   console.log(jobType)
    }
  }

  getSalaryRange = event => {
    this.setState({salaryRange: event.target.value}, this.getAllJobsDetails)
  }

  renderJobTypeCheckboxes = () =>
    employmentTypesList.map(each => (
      <li className="job-type-item-con" key={each.employmentTypeId}>
        <input
          className="checkbox"
          id={each.employmentTypeId}
          type="checkbox"
          value={each.employmentTypeId}
          onClick={this.getJobType}
        />
        <label className="job-type-label" htmlFor={each.employmentTypeId}>
          {each.label}
        </label>
      </li>
    ))

  renderSalaryRanges = () =>
    salaryRangesList.map(each => (
      <li className="job-type-item-con" key={each.salaryRangeId}>
        <input
          className="checkbox"
          id={each.salaryRangeId}
          type="radio"
          name="salaryRange"
          value={each.salaryRangeId}
          onClick={this.getSalaryRange}
        />
        <label className="job-type-label" htmlFor={each.salaryRangeId}>
          {each.label}
        </label>
      </li>
    ))

  getUserInput = event => {
    this.setState({searchVal: event.target.value})
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllJobs = () => {
    const {jobsData, searchVal} = this.state
    return (
      <ul className="jobs-container">
        <div className="input-container">
          <input
            type="search"
            className="search-input"
            placeholder="Search"
            value={searchVal}
            onChange={this.getUserInput}
          />
          <div className="search-icon-con" data-testid="searchButton">
            <BsSearch
              className="search-icon"
              onClick={this.getAllJobsDetails}
            />
          </div>
        </div>
        {jobsData.map(each => (
          <JobCard details={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderNobJobsView = () => (
    <div className="jobs-container-no-jobs">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-img"
      />
      <h1 className="no-jobs-text">No Jobs Found</h1>
      <p className="no-jobs-des">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  jobsProcess = () => {
    const {jobsDataStatus} = this.state
    switch (jobsDataStatus) {
      case loadingStages.progress:
        return this.renderLoader()
      case loadingStages.success:
        return this.renderAllJobs()
      case loadingStages.failure:
        return this.renderJobsFailureView()
      default:
        return null
    }
  }

  retryGetJobsApi = () => {
    this.getAllJobsDetails()
  }

  renderJobsFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.retryGetJobsApi}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderForUser = () => (
    <div className="loader-container-user" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="40" width="40" />
    </div>
  )

  renderUserDetails = () => {
    const {userProfile} = this.state
    const {profileImageUrl, name, shortBio} = userProfile
    return (
      <div className="user-details-bg">
        <img src={profileImageUrl} alt="profile" className="user-profile" />
        <h1 className="user-name">{name}</h1>
        <p className="user-short-bio">{shortBio}</p>
      </div>
    )
  }

  renderUserFailureView = () => (
    <div className="user-con">
      <button type="button" className="retry-btn" onClick={this.getUserDetails}>
        Retry
      </button>
    </div>
  )

  renderUserDetailsProcesses = () => {
    const {userDetailsStatus} = this.state
    switch (userDetailsStatus) {
      case loadingStages.progress:
        return this.renderLoaderForUser()
      case loadingStages.success:
        return this.renderUserDetails()
      case loadingStages.failure:
        return this.renderUserFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchVal, jobsData, jobsDataStatus} = this.state
    const jobsCount = jobsData.length
    const jobs =
      jobsCount === 0 && jobsDataStatus === loadingStages.success
        ? this.renderNobJobsView()
        : this.jobsProcess()
    return (
      <div>
        <Header />
        <div className="jobs-bg">
          <div className="input-container-sm">
            <input
              type="search"
              className="search-input"
              placeholder="Search"
              value={searchVal}
              onChange={this.getUserInput}
            />
            <div className="search-icon-con" data-testid="searchButton">
              <BsSearch
                className="search-icon"
                onClick={this.getAllJobsDetails}
              />
            </div>
          </div>
          <div className="filters-con">
            {this.renderUserDetailsProcesses()}
            <hr className="separator" />
            <h1 className="type-of-employment">Type of Employment</h1>
            <ul className="check-boxes-con">
              {this.renderJobTypeCheckboxes()}
            </ul>
            <hr className="separator" />
            <h1 className="type-of-employment">Salary Range</h1>
            <ul className="check-boxes-con">{this.renderSalaryRanges()}</ul>
          </div>
          {jobs}
        </div>
      </div>
    )
  }
}

export default Jobs
