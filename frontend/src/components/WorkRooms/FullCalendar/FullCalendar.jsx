import React from 'react'
import { connect } from 'react-redux'
import Calendar from './Calendar/jsx/Calendar'
import DateDetail from './DateDetail/jsx/DateDetail'

function FullCalendar(props) {
  let isLecturer = props.store.profile.is_lecturer
  let isCustomer = props.store.profile.is_customer
  
  return (
    <div className="calendar__block">
      <div className="workroom__block-header">
        {isLecturer && <span>Календарь лектора</span>}
        {isCustomer && <span>Календарь заказчика</span>}
      </div>
      <div className='calendar__wrapper'>
        <Calendar/>
        <DateDetail/>
      </div>
      <div className="calendar__block-tooltips">
        <div className="tooltip__not-confirmed"><span/>Событие не подтверждено</div>
        <div className="tooltip__confirmed"><span/>Событие подтверждено</div>
      </div>
      <div className="workroom__block-underline calendar"/>
    </div>
  )
}

export default connect(
  state => ({ store: state }),
  dispatch => ({})
)(FullCalendar)
