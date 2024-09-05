export const metamaskError = {
  4001: 'User denied transaction signature.',
  '-32603': 'Not enough CYCON Amount',
  default: 'Metamask error'
}

// export function getRPCErrorMessage(err) {
//   if (err) return err?.message?.toUpperCase()

//   var open = err.stack.indexOf('{')
//   var close = err.stack.lastIndexOf('}')
//   var j_s = err.stack.substring(open, close + 1)

//   var j = JSON.parse(j_s)

//   if (j?.message === 'execution reverted: Lack of balance') {
//     return 'Not enough CYCON Amount'
//   } else {
//     return j?.message?.toUpperCase()
//   }
// }

export function getRPCErrorMessage(err) {
  if (err.code === 4001) {
    return 'User denied transaction signature.'
  }

  console.log('error from wallet: ', err)

  if (
    err.message.includes(
      'execution reverted: ERC20: transfer amount exceeds balance'
    )
  ) {
    return 'Insufficient balance'
  }

  if (err.message.includes('execution reverted: Only pool owner can upgrade')) {
    return 'Only pool owner can upgrade'
  }

  try {
    const jsonMatch = err.message.match(/\{.*\}/)
    const errorData = jsonMatch ? JSON.parse(jsonMatch[0]) : null

    if (errorData && errorData.message) {
      if (errorData.message.includes('execution reverted: Lack of balance')) {
        return 'Not enough CYCON Amount'
      }
      return errorData.message
    }
  } catch (parseError) {
    console.error(
      'Error parsing the embedded JSON in the error message:',
      parseError
    )
  }

  return err.message || 'An unknown error occurred.'
}
