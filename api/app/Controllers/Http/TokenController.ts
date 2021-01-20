import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import BadRequestException from 'App/Exceptions/BadRequestException'
// import RandomNumberGeneratorService from 'App/Services/RandomNumber'
import { sign } from 'jsonwebtoken'

export default class TokenController {
  public async create({ request, response }: HttpContextContract) {
    const bodySchema = schema.create({
      email: schema.string({}, [rules.email()]),
      password: schema.string({}, [rules.minLength(6)]),
    })

    try {
      await request.validate({
        schema: bodySchema,
      })
    } catch (e) {
      throw new BadRequestException('Campos inválidos')
    }

    // USANDO JWT
    const {
      body: { email },
    } = request.toJSON()

    const token = sign({ email }, String(process.env.JWT_SECRET))

    // USANDO NUMERO ALEATORIO
    // return response.status(200).send({ token: RandomNumberGeneratorService.execute() })
    return response.status(200).send({ token })
  }
}
