import test from 'japa'
import { decode } from 'jsonwebtoken'
import supertest from 'supertest'
import { BASE_URL, LOGIN_ENDPOINT } from './config'

test.group('Login', () => {
  const INVALID_CREDENTIALS_MOCK = { email: 'invalid email', password: '1' }
  const VALID_CREDENTIALS_MOCK = { email: 'arthur@email.com', password: 'valid_password' }

  test('login should fail because invalid email', async (assert) => {
    const res = await supertest(BASE_URL)
      .post(LOGIN_ENDPOINT)
      .send({ email: INVALID_CREDENTIALS_MOCK.email, password: VALID_CREDENTIALS_MOCK.password })
    assert.equal(res.status, 400)
  })

  test('login should fail because invalid password', async (assert) => {
    const res = await supertest(BASE_URL)
      .post(LOGIN_ENDPOINT)
      .send({ email: 'arthur@email.com', password: '11' })
    assert.equal(res.status, 400)
  })

  test('login with succes', async (assert) => {
    const res = await supertest(BASE_URL).post(LOGIN_ENDPOINT).send(VALID_CREDENTIALS_MOCK)
    assert.equal(res.status, 200)
    assert.exists(res.body.token)
    const payload = decode(res.body.token) as any
    const { email } = VALID_CREDENTIALS_MOCK
    assert.equal(email, payload.email)
  })
})
