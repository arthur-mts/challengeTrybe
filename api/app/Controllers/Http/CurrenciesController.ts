import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import BadRequestException from 'App/Exceptions/BadRequestException'
import CurrenciesFile from 'App/Services/CurrenciesFile'

export default class CurrenciesController {
  public async update({ request, response }: HttpContextContract) {
    const bodySchema = schema.create({
      currency: schema.enum(['BRL', 'EUR', 'CAD'], [rules.required()]),
      value: schema.number([rules.required()]),
    })

    try {
      await request.validate({
        schema: bodySchema,
        messages: {
          '*': (field) => {
            return `${field === 'currency' ? 'Moeda' : 'Valor'} inválid${
              field === 'currency' ? 'a' : 'o'
            }`
          },
        },
      })

      const {
        body: { currency, value },
      } = request.toJSON()

      //A RULE NÃO SUPORTA CHECAGEM DE MAIOR QUE OU MENOR QUE, PORTANTO É PRECISO UMA
      // CHECAGEM MANUAL
      if (value <= 0) {
        throw new Error('Value inválido')
      }
      const currenciesFileHandler = new CurrenciesFile()

      await currenciesFileHandler.updateCurrency(currency, value)

      return response.status(200).send({ message: 'Valor alterado com sucesso!' })
    } catch (e) {
      let message = 'Valor inválido'

      if (e.constructor.name === 'ValidationException') {
        message = e.messages.errors[0].message
      }
      throw new BadRequestException(message)
    }
  }
}
