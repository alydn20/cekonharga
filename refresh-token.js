// refresh-token.js
// Script untuk mendapatkan token Treasury baru via API login

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const TOKEN_FILE = path.join(__dirname, 'token.txt')
const LOGIN_URL = 'https://connect.treasury.id/user/signin'

// Credentials dari HTTP intercept
const CREDENTIALS = {
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

async function refreshToken() {
  console.log('🔄 Refreshing Treasury token...')
  console.log(`📧 Email: ${CREDENTIALS.email}`)

  try {
    console.log(`🌐 Sending login request to ${LOGIN_URL}...`)

    const res = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'accept-encoding': 'gzip',
        'content-type': 'application/json',
        'x-app-version': '8.0.82',
        'x-language': 'id',
        'x-platform': 'android',
        'x-version': '1.0',
        'user-agent': 'Dart/3.6 (dart:io)',
        'host': 'connect.treasury.id'
      },
      body: JSON.stringify(CREDENTIALS),
      signal: AbortSignal.timeout(10000)
    })

    console.log(`📡 Response status: ${res.status}`)

    if (!res.ok) {
      const errorText = await res.text()
      console.log(`❌ Login failed: ${errorText.substring(0, 300)}`)
      throw new Error(`HTTP ${res.status}`)
    }

    const json = await res.json()
    console.log(`📦 Response meta status: ${json.meta?.status}`)

    if (json.meta?.status !== 'success') {
      console.log(`❌ API error: ${json.meta?.message || 'Unknown error'}`)
      throw new Error('API error')
    }

    // Extract token from response
    const token = json.data?.token?.access_token

    if (!token) {
      console.log('❌ No access_token in response')
      console.log('Response data:', JSON.stringify(json.data, null, 2))
      throw new Error('No token in response')
    }

    console.log(`✅ Token received! Length: ${token.length} chars`)
    console.log(`🔑 Token preview: ${token.substring(0, 50)}...`)

    // Save to token.txt
    fs.writeFileSync(TOKEN_FILE, token.trim())
    console.log(`💾 Token saved to: ${TOKEN_FILE}`)

    // Verify saved token
    const savedToken = fs.readFileSync(TOKEN_FILE, 'utf-8').trim()
    if (savedToken === token.trim()) {
      console.log('✅ Token verification: MATCH')
    } else {
      console.log('⚠️  Token verification: MISMATCH')
    }

    console.log('\n🎉 Token refresh completed successfully!')
    console.log('📝 Next step: Restart bot with "node index.js"')

    return token

  } catch (e) {
    console.log(`\n❌ Token refresh failed: ${e.message}`)
    console.log(`Stack trace: ${e.stack}`)
    throw e
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  refreshToken()
    .then(() => {
      console.log('\n✅ Done!')
      process.exit(0)
    })
    .catch((e) => {
      console.log('\n❌ Failed!')
      process.exit(1)
    })
}

export { refreshToken }
