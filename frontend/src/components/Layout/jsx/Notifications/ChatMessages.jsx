import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";

import backArrow from '~/assets/img/back-arrow.svg'
import sendMessage from '~/assets/img/send-message-icon.svg'
import {AddMessage, SetMessagesConfirmed} from "../../redux/actions/messages";
import {ActivateModal, DeactivateModal, SetSelectedChat} from "../../redux/actions/header";
import {toggleConfirmResponseOnLecture, toggleResponseOnLecture} from "../../../WorkRooms/WorkRoom/ajax/workRooms";
import {RemoveNotification} from "../../redux/actions/notifications";
import Loader from '~@/Utils/jsx/Loader'
import {SetChatConn} from "../../redux/actions/ws";
import ConfirmAction from "../../../Utils/jsx/ConfirmAction";


function ChatMessages(props) {
  let data = props.store.messages
  let selectedChatId = props.store.header.selectedChatId
  let messages = data.messages
  let messagesBlock = useRef()
  let input = useRef()
  
  let [rejectRespondent, setRejectRespondent] = useState(null)
  
  useEffect(() => {
    if (messagesBlock && props.isLoaded) messagesBlock.current.scrollTop = messagesBlock.current.scrollHeight
  }, [messagesBlock?.current?.scrollHeight])
  
  useEffect(() => {
    props.SetChatConn(Boolean(props.chatSocket))
    props.chatSocket?.addEventListener('message', (e) => {
      let data = JSON.parse(e.data)
      props.AddMessage(data)
      if (data.confirm !== null) props.SetMessagesConfirmed(data.confirm)
    })
  }, [props.chatSocket])
  
  function handleArrowClick(params) {
    if ((data.confirmed !== null && !data.confirmed && !data.is_creator) || params.cancel_response) {
      props.chatSocket.send(JSON.stringify({
        'type': 'read_reject_chat',
        'chat_id': props.store.header.selectedChatId
      }))
      props.RemoveNotification(props.store.header.selectedChatId)
    } else props.chatSocket.close()
    props.setArea(false)
    props.SetSelectedChat(null)
  }
  
  function handleSendMessage(e) {
    if (e.keyCode === 13 && e.target.value) {
      props.chatSocket.send(JSON.stringify({
        'type': 'chat_message',
        'author': props.store.permissions.user_id,
        'text': e.target.value,
      }))
      e.target.value = ''
    }
  }
  function handleClickIcon() {
    if (input.current.value) {
      props.chatSocket.send(JSON.stringify({
        'type': 'chat_message', 
        'author': props.store.permissions.user_id, 
        'text': input.current.value,
      }))
      input.current.value = ''
    }
  }
  
  function handleConfirmAction() {
    toggleConfirmResponseOnLecture(data.lecture_id, data.talker_respondent, selectedChatId, rejectRespondent)
      .then(r => r.json())
      .then(data => {
        if (data.status === 'success') {
          if (rejectRespondent) {
            props.setArea(false)
            props.SetSelectedChat(null)
            props.chatSocket.close()
          }
        }
      })
  }
  
  function handleToggleConfirm(reject) {
    setRejectRespondent(reject)
    props.ActivateModal()
  }
  
  function handleRejectResponse() {
    toggleResponseOnLecture(data.lecture_id)
      .then(r => r.json())
      .then(data => {
        if (data.status === 'success') {
          handleArrowClick({cancel_response: true})
          props.RemoveNotification(props.store.header.selectedChatId)
        }
      })
  }
  
  if (!props.isLoaded) return <Loader size={60} top="50%" left="50%" tX="-50%" tY="-50%"/>
  return (
    <>
      {selectedChatId && rejectRespondent !== null && (rejectRespondent ?
        <ConfirmAction text="Вы уверены, что хотите отклонить запрос на лекцию? Данный пользователь больше не сможет откликнуться на выбранную дату." 
                       onCancel={() => setRejectRespondent(null)}/> :
        <ConfirmAction text="ПАТТВЕРДИТЬ?" 
                       onCancel={() => setRejectRespondent(null)}/>)
      }
      <div className="chat-messages__block">
        <div className="actions__block">
          <div className="lecture">
            <div className="back-arrow" onClick={handleArrowClick}>
              <img src={backArrow} alt="назад"/>
            </div>
            <div className="text">
              <p className='lecture-name'>{data.lecture_name}</p>
              <p className='respondent-name'>{data.talker_first_name} {data.talker_last_name}</p>
            </div>
          </div>
          <div className="buttons">
            {data.confirmed === null ? 
              data.is_creator ? 
                <>
                  <button className="confirm" onClick={() => handleToggleConfirm(false)}>Принять</button>
                  <button className="reject" onClick={() => handleToggleConfirm(true)}>Отклонить</button>
                </> : 
                <button className="reject-response" onClick={handleRejectResponse}>Отменить отклик</button> :
              data.confirmed ? 
                <div className="lecture-confirmed">Лекция подтверждена</div> : 
                <div className="lecture-rejected">Лекция отклонена</div>
            }
  
          </div>
        </div>
        
        <div className="messages__block" ref={messagesBlock}>
          {messages && messages.length > 0 && messages.map((elem, index) => {
            if (elem.confirm) return <div key={index} className="block-message">
              <div className="confirm-message">Лекция подтверждена!</div>
            </div>
            else if (elem.confirm === null) return <div key={index} className="block-message">
              <div className={props.store.permissions.user_id === elem.author ? 
                "self-message" : "other-message"}>{elem.text}</div>
            </div>
            else if (!elem.confirm) return <div key={index} className="block-message">
              <div className="reject-message">Лекция отклонена!</div>
            </div>
          })}
        </div>
        
        <div className="input__block">
          <input placeholder='Введите текст' 
                 onKeyUp={(e) => handleSendMessage(e)} 
                 disabled={data?.confirmed != null && !data.confirmed}
                 ref={input}/>
          <img src={sendMessage} 
               alt="отправить" 
               onClick={handleClickIcon}/>
        </div>
      </div>
    </>
  )
}


export default connect(
  state => ({store: state}),
  dispatch => ({
    AddMessage: (message) => dispatch(AddMessage(message)),
    ActivateModal: () => dispatch(ActivateModal()),
    DeactivateModal: () => dispatch(DeactivateModal()),
    SetChatConn: (connected) => dispatch(SetChatConn(connected)),
    RemoveNotification: (chat_id) => dispatch(RemoveNotification(chat_id)),
    SetSelectedChat: (chat_id) => dispatch(SetSelectedChat(chat_id)),
    SetMessagesConfirmed: (confirmed) => dispatch(SetMessagesConfirmed(confirmed)),
  })
)(ChatMessages);