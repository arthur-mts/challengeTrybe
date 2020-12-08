import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import currencies from '../../data/currencies.json'

import fetch from 'node-fetch'
import IntlNumberFormatParser from 'App/Services/IntlNumberFormatParser'

export default class CryptosController {
  private intlParser = new IntlNumberFormatParser()

  private generateBTCRateObject(actualBtcDolarRate: number, targetDolarRate: number) {
    return {
      rate: this.intlParser.numberToenUSCurrency(targetDolarRate * actualBtcDolarRate),
      rate_float: targetDolarRate * actualBtcDolarRate,
    }
  }

  private async getDataFromCoinDesk() {
    const res = await fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json', {
      headers: { 'Content-Type': 'application/json' },
    })
    return await res.json()
  }

  private calcBtcPrices(actualBtcDolarRateFloat: number) {
    const brlRate = this.generateBTCRateObject(actualBtcDolarRateFloat, Number(currencies.BRL))

    const eurRate = this.generateBTCRateObject(actualBtcDolarRateFloat, Number(currencies.EUR))

    const cadRate = this.generateBTCRateObject(actualBtcDolarRateFloat, Number(currencies.CAD))

    return {
      BRL: {
        code: 'BRL',
        description: 'Brazilian Real',
        ...brlRate,
      },
      EUR: {
        code: 'EUR',

        description: 'Euro',
        ...eurRate,
      },
      CAD: {
        code: 'CAD',
        description: 'Canadian Dollar',
        ...cadRate,
      },
    }
  }

  public async index({ response }: HttpContextContract) {
    let res = await this.getDataFromCoinDesk()
    const btcPrices = this.calcBtcPrices(res.bpi.USD.rate_float)

    res = { ...res, bpi: { ...res.bpi, ...btcPrices } }

    return response.status(200).send(res)
  }
}
