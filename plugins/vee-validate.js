import { extend, configure } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'

Object.keys(rules).forEach((rule) => {
  // eslint-disable-next-line import/namespace
  extend(rule, rules[rule])
})

extend('verifyPhone', (phoneNumber) => {
  const phoneInternationalRegExp =
    '[+](9[976]\\d|8[987530]\\d|6[987]\\d|5[90]\\d|42\\d|3[875]\\d|2[98654321]\\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\\d{1,14}$'

  if (!phoneNumber.match(phoneInternationalRegExp)) {
    return 'El número de teléfono no es válido. (Formato ej. +56999999999, se debe incluir +.)'
  }
  if (phoneNumber.match(phoneInternationalRegExp)[0] !== phoneNumber) {
    return 'El número de teléfono no es válido. (Formato ej. +56999999999, se debe incluir +.)'
  }
  if (phoneNumber.substring(0, 3) !== '+56') {
    return 'El número de teléfono no es válido. (Formato ej. +56999999999, se debe incluir +.)'
  }
  if (phoneNumber.length !== 12) {
    return 'El número de teléfono no es válido. (Formato ej. +56999999999, revisar la cantidad de digitos.)'
  }
  return true
})

// with typescript
for (const [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation,
  })
}

export default function VeeValidatePlugin({ app }) {
  configure({
    defaultMessage: (_, values) =>
      app.i18n.t(`validations.messages.${values._rule_}`, values),
  })
}
