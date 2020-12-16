import fs from 'fs'

interface Currencies {
  BRL: string
  EUR: string
  CAD: string
}
import path from 'path'
import IntlNumberFormatParser from './IntlNumberFormatParser'

export default class CurrenciesFile {
  private static filePath = path.resolve(__dirname, '..', 'data', 'currencies.json')

  public getFile() {
    const rawData = fs.readFileSync(CurrenciesFile.filePath).toString()
    return JSON.parse(rawData) as Currencies
  }

  public async updateCurrency(currency: keyof Currencies, newValue: number) {
    await fs.promises.writeFile(
      CurrenciesFile.filePath,
      JSON.stringify({
        ...require(CurrenciesFile.filePath),
        [currency]: IntlNumberFormatParser.numberToenUSCurrency(newValue),
      })
    )
  }
}
