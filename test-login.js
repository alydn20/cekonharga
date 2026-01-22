// test-login.js - Simple test
const LOGIN_URL = 'https://connect.treasury.id/user/signin'

const body = {
  "client_id": "3",
  "client_secret": "rDiXUGRe49xucEIkRbUW7l4AqQcezXlplFvLjKnO2",
  "latitude": "0.0",
  "longitude": "0.0",
  "scope": "*",
  "email": "089654454210",
  "password": "@Februari20",
  "app_name": null,
  "provider": null,
  "token": null,
  "device_id": "android-V417IR-Asus/AI2401/AI2401:12/V417IR/118:user/release-keys",
  "shield_id": "440c8624bf64bb19cf837ba523cce794",
  "shield_session_id": "6aea0479c8ce4f2f829577ca82c9de07"
}

console.log('Testing Treasury login...')

fetch(LOGIN_URL, {
  method: 'POST',
  headers: {
    'accept': 'application/json',
    'content-type': 'application/json',
    'x-app-version': '8.0.82',
    'x-language': 'id',
    'x-platform': 'android',
    'x-version': '1.0'
  },
  body: JSON.stringify(body)
})
.then(res => {
  console.log('Status:', res.status)
  return res.text()
})
.then(text => {
  console.log('Response:', text.substring(0, 500))
  const json = JSON.parse(text)
  if (json.data?.token?.access_token) {
    console.log('Token found! Length:', json.data.token.access_token.length)
    console.log('Token preview:', json.data.token.access_token.substring(0, 50))
  }
})
.catch(err => {
  console.error('Error:', err.message)
})
