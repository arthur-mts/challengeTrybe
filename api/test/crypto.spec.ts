import test from 'japa'
import supertest from 'supertest'
import { BASE_URL, CRYPTO_ENDPOINT, LOGIN_ENDPOINT } from './config'

test.group('Get Crypto currency ', () => {
  const VALID_CREDENTIALS_MOCK = { email: 'arthur@email.com', password: 'valid_password' }

  test.group('Get currencies', () => {
    test('should have not permission to get currencies without token', async (assert) => {
      const res = await supertest(BASE_URL).get(CRYPTO_ENDPOINT)

      assert.equal(res.status, 401)
    })

    test('should get currencies with succes', async (assert) => {
      const { token } = await (
        await supertest(BASE_URL).post(LOGIN_ENDPOINT).send(VALID_CREDENTIALS_MOCK)
      ).body

      const { body } = await supertest(BASE_URL)
        .get(CRYPTO_ENDPOINT)
        .set('Authorization', token)
        .timeout(10000)
      assert.hasAllKeys(body, ['time', 'bpi', 'disclaimer'])
    }).timeout(10000)
  })
})
