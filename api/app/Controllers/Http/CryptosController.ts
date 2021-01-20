import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import fetch from 'node-fetch'
import IntlNumberFormatParser from 'App/Services/IntlNumberFormatParser'
import CurrenciesFile from 'App/Services/CurrenciesFile'

export default class CryptosController {

  private currenciesFileHandler = new CurrenciesFile()

  private generateBTCRateObject(actualBtcDolarRate: number, targetDolarRate: number) {
    return {
      rate: IntlNumberFormatParser.numberToenUSCurrency(targetDolarRate * actualBtcDolarRate),
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
    const currencies = this.currenciesFileHandler.getFile()
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
