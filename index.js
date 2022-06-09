const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

// 브랜드페이에서 가맹점에 부여한 secret key (절대 외부나 client에 노출되면 안됨)
// 샘플로 제시되는 key는 테스트 용도로만 사용할 수 있음
const SECRET_KEY = 'test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R'

app.use(bodyParser.json())

// 결제창 실행 페이지
app.get('/checkout', (req, res) => {
  res.sendFile(__dirname + '/views/checkout.html')
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
      Authorization: `Basic ${Buffer.from(SECRET_KEY + ':', 'utf8').toString('base64')}`,
      'Content-Type': 'application/json'
    }
  })

  // 성공(HTTP status 200) 응답
  res.status(200).send('OK')
})

// 최종 결제 승인
app.post('/confirm-payment', async (req, res) => {
  await axios.post(`https://api.tosspayments.com/v1/payments/${req.body.paymentKey}`, {
        orderId: req.body.orderId,
        amount: req.body.amount
      },
      {
        headers: {
          // SecretKey를 Basic Auth 방식의 username으로 사용, 비밀번호는 공백으로 사용
          Authorization: `Basic ${Buffer.from(SECRET_KEY + ':', 'utf8').toString('base64')}`,
          'Content-Type': 'application/json'
        }
      })

  res.status(200).send('OK')
})

// 결제 성공 페이지
app.get('/payment-success', (req, res) => {
  res.sendFile(__dirname + '/views/payment-success.html')
})

app.listen(port, () => {
  console.log(`Example BrandPay app listening on port ${port}`)
})
