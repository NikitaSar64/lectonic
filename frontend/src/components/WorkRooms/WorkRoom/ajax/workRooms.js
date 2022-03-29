import {baseURL} from "~/ProjectConstants";

const HEADERS = {
  'Content-Type': 'application/json',
}

export function getProfileInfo() {
  const options = {
    method: 'GET',
    headers: HEADERS,
    credentials: 'include',
  }
  return fetch(
    `${baseURL}/api/workrooms/profile/`,
    options
  )
}


export function getAllLecturesForLecturer() {
  const options = {
    method: 'GET',
    headers: HEADERS,
    credentials: 'include',
  }
  return fetch(
    `${baseURL}/api/workrooms/lecture/as_lecturer/`,
    options
  )
}

export function getAllLecturesForCustomer() {
  const options = {
    method: 'GET',
    headers: HEADERS,
    credentials: 'include',
  }
  return fetch(
    `${baseURL}/api/workrooms/lecture/as_customer/`,
    options
  )
}


export function toggleResponseOnLecture(lecture_id) {
  const options = {
    method: 'GET',
    headers: HEADERS,
    credentials: 'include',
  }
  return fetch(
    `${baseURL}/api/workrooms/lecture/response/?lecture=${lecture_id}`,
    options
  )
}
