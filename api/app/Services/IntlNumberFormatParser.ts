export default class IntlNumberFormatParser {
  private static intlInstance = new Intl.NumberFormat('en-US', {})

  public numberToenUSCurrency(number) {
    return IntlNumberFormatParser.intlInstance.format(number)
  }
}
