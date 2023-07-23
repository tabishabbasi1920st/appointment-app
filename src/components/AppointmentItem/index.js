import './index.css'
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {eachAppointment, onStarImageClicked} = props
  console.log(eachAppointment)
  const {id, titleInput, date, isStarred} = eachAppointment

  const userProvidedDate = new Date(date)
  const formattedUserProvidedDate = format(userProvidedDate, 'do MMMM Y')
  const dayNameFromDate = format(userProvidedDate, 'EEEE')

  const starImageClicked = () => {
    onStarImageClicked(id)
  }

  const updatedStarImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-item-container">
      <div className="title-and-favorite-container">
        <p>{titleInput}</p>
        <button
          type="button"
          onClick={starImageClicked}
          className="starred-button"
          data-testid="star"
        >
          <img src={updatedStarImage} alt="star" />
        </button>
      </div>
      <p className="date">
        Date: {formattedUserProvidedDate.toString()}{' '}
        {dayNameFromDate.toString()}
      </p>
    </li>
  )
}

export default AppointmentItem
