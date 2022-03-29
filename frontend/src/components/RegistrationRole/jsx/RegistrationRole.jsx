import React, {useEffect, useState} from 'react'
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom'
import {connect} from "react-redux";

import backArrow from "~/assets/img/back-arrow.svg"
import StepsBar from "./StepsBar";
import LecturerSteps from "./LecturerSteps/LecturerSteps";
import {reverse} from "../../../ProjectConstants";
import CustomerSteps from "./CustomerSteps/CustomerSteps";
import {SwapAddRoleStep, SwapChooseRoleVisible} from "../redux/actions/main";


function RegistrationRole(props) {
  let navigate = useNavigate()
  useEffect(() => {
    let perms = props.store.permissions
    if (!perms.is_person) navigate(reverse('create_profile'))
    else if (perms.is_lecturer && !perms.is_customer) navigate(reverse('create_customer'))
    else if (perms.is_customer && !perms.is_lecturer) navigate(reverse('create_lecturer'))
    else if (perms.is_lecturer && perms.is_customer) navigate(reverse('workroom'))
  }, [props.store.permissions.is_person])
  
  useEffect(() => {
    props.SwapAddRoleStep(1)
  }, [])
  
  let location = useLocation()
  let currentStep = props.store.addRole.main.step
  let roleVisible = props.store.addRole.main.chooseRoleVisible
  
  function handleDisabledButton() {
    if (location.pathname === reverse('create_lecturer')) {
      if (currentStep === 1) return !(props.store.event.domain.length > 0) 
      else if (currentStep === 2) {
        return !(props.store.addRole.lecturer.passport_photo && 
          props.store.addRole.lecturer.selfie_photo)
      } 
    } else if (location.pathname === reverse('create_customer')) {
      if (currentStep === 1) return props.store.addRole.customer.isCompany === undefined
      else if (currentStep === 2) return !(props.store.event.domain.length > 0)
    } else return true
  }
  
  useEffect(() => {
    if (location.pathname === reverse('create_lecturer')) {
      if (currentStep > 1) props.SwapChooseRoleVisible(false)
      else props.SwapChooseRoleVisible(true)
    } else if (location.pathname === reverse('create_customer')) {
      if (props.store.addRole.customer.isCompany) {
        if (currentStep > 1) props.SwapChooseRoleVisible(false)
        else props.SwapChooseRoleVisible(true)
      } else {
        if (currentStep > 2) props.SwapChooseRoleVisible(false)
        else props.SwapChooseRoleVisible(true)
      }
    }
  }, [currentStep])
  
  return (
    <>
      <StepsBar step={currentStep}/>

      <div className="step-block-wrapper">
        <div className="choose-role__block" 
             style={!roleVisible ? {display: "none"} : {}}>
          <div className='step-block margin-bottom-36 step-block__head-text'>
            <h2 className='step-block__left-part'>
              Выбор роли
            </h2>
            <p className="lecturer-right__header">
              Выберите Вашу основную роль на платформе:<br/>
              лектор или заказчик лекции.
            </p>
          </div>
  
          <div className="step-block margin-bottom-36">
            <div className="step-block__left-part step-block-required">
              <p>Кто вы?</p>
              <span className="required-sign step-block__required-sign">*</span>
            </div>
            <button className={`${location.pathname === reverse('create_lecturer') ? 
              "btn-role-selected" : "btn-role"} margin-right-12`} 
                    onClick={() => navigate(reverse('create_lecturer'))}>Лектор</button>
            <button className={`${location.pathname === reverse('create_customer') ? 
              "btn-role-selected" : "btn-role"}`}
                    onClick={() => {navigate(reverse('create_customer'))}}>Заказчик</button>
          </div>
        </div>
        <Routes>
          <Route path='lecturer' element={<LecturerSteps/>}/>
          <Route path='customer' element={<CustomerSteps/>}/>
        </Routes>
      </div>
      
      <div className="step-block steps__btn mb-148" style={currentStep > 2 ? {display: "none"} : {}}>
        {currentStep > 1 && 
          <div className="link-to-back" onClick={() => props.SwapAddRoleStep(currentStep - 1)}>
            <img src={backArrow} alt="предыдущий шаг"/>
            <span>Предыдущий шаг</span>
          </div>}
        
        <div className="step-block__left-part"/>
        <button className="btn" 
                onClick={() => props.SwapAddRoleStep(currentStep + 1)} 
                disabled={handleDisabledButton()}>Следующий шаг</button>
      </div>
    </>
  )
}


export default connect(
  state => ({store: state}),
  dispatch => ({
    SwapAddRoleStep: (step) => dispatch(SwapAddRoleStep(step)),
    SwapChooseRoleVisible: (visible) => dispatch(SwapChooseRoleVisible(visible)),
  })
)(RegistrationRole)
