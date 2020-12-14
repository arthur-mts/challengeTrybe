import test from 'japa'
import supertest from 'supertest'
import { BASE_URL, CRYPTO_ENDPOINT, LOGIN_ENDPOINT } from './config'

test.group('Update currency ', () => {
  const VALID_CREDENTIALS_MOCK = { email: 'arthur@email.com', password: 'valid_password' }

  test('should have not permission to update currencies without token', async (assert) => {
    const res = await supertest(BASE_URL).post(CRYPTO_ENDPOINT).send({ currency: 'BRL', value: 7 })
    assert.equal(res.status, 401)
  })

  test('should update BRL currency with succes', async (assert) => {
    const { token } = await (
      await supertest(BASE_URL).post(LOGIN_ENDPOINT).send(VALID_CREDENTIALS_MOCK)
    ).body

    const res = await supertest(BASE_URL)
      .post(CRYPTO_ENDPOINT)
      .set('Authorization', token)
      .send({ currency: 'BRL', value: 7 })

    assert.equal(res.status, 200)
  })

  test('should fail to update invalid currency', async (assert) => {
    const { token } = await (
      await supertest(BASE_URL).post(LOGIN_ENDPOINT).send(VALID_CREDENTIALS_MOCK)
    ).body

    const res = await supertest(BASE_URL)
      .post(CRYPTO_ENDPOINT)
      .set('Authorization', token)
      .send({ currency: 'BAD_COUNTRY', value: 7 })

    assert.equal(res.status, 400)
  })
})
