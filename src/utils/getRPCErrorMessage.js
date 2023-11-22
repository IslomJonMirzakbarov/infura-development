export const metamaskError = {
  4001: 'User denied transaction signature.',
  '-32603': 'Not enough CYCON Amount',
  default: 'Metamask error'
}

export function getRPCErrorMessage(err) {
  if (err) return err?.message?.toUpperCase()

  var open = err.stack.indexOf('{')
  var close = err.stack.lastIndexOf('}')
  var j_s = err.stack.substring(open, close + 1)

  var j = JSON.parse(j_s)

  if (j?.message === 'execution reverted: Lack of balance') {
    return 'Not enough CYCON Amount'
  } else {
    return j?.message?.toUpperCase()
  }
}
