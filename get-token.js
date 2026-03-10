// get-token.js - Get and save token
import fs from 'fs'

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

console.log('🔄 Getting new Treasury token...')

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
  console.log('📡 Status:', res.status)
  return res.json()
})
.then(json => {
  if (json.meta?.status !== 'success') {
    throw new Error('Login failed: ' + json.meta?.message)
  }

  // Token could be at data.token or data.token.access_token
  const token = json.data?.token?.access_token || json.data?.token

  if (!token) {
    console.log('Response:', JSON.stringify(json, null, 2))
    throw new Error('No token in response')
  }

  console.log('✅ Token received! Length:', token.length)
  console.log('🔑 Token preview:', token.substring(0, 80) + '...')

  // Save to token.txt
  fs.writeFileSync('token.txt', token)
  console.log('💾 Token saved to token.txt')

  // Verify
  const saved = fs.readFileSync('token.txt', 'utf-8')
  console.log('✅ Verification: Token length', saved.length)

  console.log('\n🎉 Done! Restart bot to use new token.')
})
.catch(err => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
