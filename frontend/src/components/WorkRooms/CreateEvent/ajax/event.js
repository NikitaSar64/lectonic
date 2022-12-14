import {baseURL} from "~/ProjectConstants";


const body = JSON.stringify({
  email: "pten4ik99@yande.ru",
  password: "12345678"
})

const HEADERS = {
  'Content-Type': 'application/json',
}


export function getDomainArray() {
  const options = {
    method: 'GET',
    headers: HEADERS,
    credentials: 'include',
  }
  return fetch(
    `${baseURL}/api/workrooms/domain/`,
    options
  )
}

export function createEvent(formData, role) {
  const options = {
    method: 'POST',
    body: formData,
    credentials: 'include',
  }
  return fetch(
    `${baseURL}/api/workrooms/lecture/${role === 'lecturer' ? 'as_lecturer' : role === 'customer' && 'as_customer'}/`,
    options
  )
}