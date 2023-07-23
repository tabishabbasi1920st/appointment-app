/* eslint-disable */
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

import './index.css'

const initialAppointmentList = []

class Appointments extends Component {
  state = {
    titleInput: '',
    date: '',
    updatedList: initialAppointmentList,
    starred: false,
  }

  onDateChange = event => {
    this.setState({date: event.target.value})
  }

  onTitleChange = event => {
    this.setState({titleInput: event.target.value})
  }

  onClickAddButton = () => {
    const {titleInput, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      titleInput,
      date,
      isStarred: false,
    }
    this.setState(prevState => ({
      updatedList: [...prevState.updatedList, newAppointment],
    }))

    this.setState({titleInput: ''})
    this.setState({date: ''})
  }

  onStarImageClicked = uniqueId => {
    const {updatedList} = this.state
    this.setState(prevState => ({
      updatedList: prevState.updatedList.map(eachObject => {
        if (eachObject.id === uniqueId) {
          return {...eachObject, isStarred: !eachObject.isStarred}
        } else {
          return eachObject
        }
      }),
    }))
  }

  onClickStarredButton = () => {
    const {updatedList, starred} = this.state

    this.setState(prevState => ({starred: !prevState.starred}))
  }

  render() {
    const {date, titleInput, updatedList, starred} = this.state
    console.log(starred)
    console.log(updatedList)

    let starredFilteredList
    if (starred) {
      starredFilteredList = updatedList.filter(
        eachObject => eachObject.isStarred === true,
      )
      console.log(starredFilteredList)
    } else {
      starredFilteredList = updatedList
      console.log(starredFilteredList)
    }

    return (
      <div className="main-bg-container">
        <div className="appointment-container">
          <div className="form-and-image-container">
            <div className="form-container">
              <h1 className="add-appointment-heading">Add Appointment</h1>
              <label htmlFor="titleInput" className="label">
                TITLE
              </label>
              <br />
              <input
                id="titleInput"
                className="title-user-input"
                type="text"
                onChange={this.onTitleChange}
                value={titleInput}
                placeholder="Title"
              />
              <br />
              <label htmlFor="dateInput" className="label">
                Date
              </label>
              <br />
              <input
                id="dateInput"
                className="date-user-input"
                type="date"
                onChange={this.onDateChange}
                value={date}
              />
              <br />
              <button
                className="add-button"
                type="button"
                onClick={this.onClickAddButton}
              >
                Add
              </button>
            </div>
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointment-image"
              />
            </div>
          </div>
          <div className="heading-and-starred-button-container">
            <h1 className="appointments-heading">Appointments</h1>
            <button
              className="starred-filter-button"
              onClick={this.onClickStarredButton}
            >
              Starred
            </button>
          </div>

          <ul className="users-appointment-container">
            {starredFilteredList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                eachAppointment={eachAppointment}
                onStarImageClicked={this.onStarImageClicked}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
