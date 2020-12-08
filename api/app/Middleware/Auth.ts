import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { verify } from 'jsonwebtoken'

export default class Auth {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const token = request.header('authorization') || ''
    //VALIDANDO TOKEN
    try {
      const { email } = verify(token, String(process.env.JWT_SECRET)) as any
      console.log(`Login from ${email}`)
    } catch (e) {
      return response.status(401).send({
        message: 'Token inválido',
      })
    }
    await next()
  }
}
