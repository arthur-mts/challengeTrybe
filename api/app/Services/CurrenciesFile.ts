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

  private jsonFile = require(CurrenciesFile.filePath)

  private intlParser = new IntlNumberFormatParser()
  public getFile() {
    return this.jsonFile as Currencies
  }

  public async updateCurrency(currency: keyof Currencies, newValue: number) {
    await fs.promises.writeFile(
      CurrenciesFile.filePath,
      JSON.stringify({
        ...this.jsonFile,
        [currency]: this.intlParser.numberToenUSCurrency(newValue),
      })
    )
  }
}
