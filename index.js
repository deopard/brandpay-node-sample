const express = require('express')
const path = require('path')
const axios = require('axios')
const app = express()
const port = 3000

require('dotenv').config()

// 브랜드페이에서 가맹점에 부여한 client key
const CLIENT_KEY = process.env.CLIENT_KEY
// 브랜드페이에서 가맹점에 부여한 secret key (절대 외부 유출되면 안됨)
const SECRET_KEY = process.env.SECRET_KEY

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// 결제창 실행 페이지
app.get('/checkout', (req, res) => {
  res.render('checkout', { CLIENT_KEY })
})

// 결제를 위한 Access Token 발급을 진행하는 경로
// https://docs.tosspayments.com/guides/brandpay/auth
app.get('/callback-auth', async (req, res) => {
  await axios.post('https://api.tosspayments.com/v1/brandpay/authorizations/access-token', JSON.stringify({
    grantType: 'AuthorizationCode',
    // 브랜드페이 서버에서 넘겨준 code와 customerKey 값 전달
    code: req.query.code,
    customerKey: req.query.customerKey
  }), {
    headers: {
      // SecretKey를 Basic Auth 방식의 username으로 사용, 비밀번호는 공백으로 사용
      Authorization: `Basic ${Buffer.from(SECRET_KEY + ':', "utf8").toString('base64')}`,
      'Content-Type': 'application/json'
    }
  })

  // 성공(HTTP status 200) 응답
  res.sendStatus(200)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
