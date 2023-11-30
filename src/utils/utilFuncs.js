export function truncateJWT(token, length) {
  if (token.length <= length) {
    return token
  }

  const prefix = token.slice(0, Math.ceil(length / 2))
  const suffix = token.slice(-Math.floor(length / 2))

  return `${prefix}...${suffix}`
}

export const formatNumberWithCommas = (x) => {
  if (x === null || x === undefined) {
    return ''
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function truncateWalletAddress(address, length = 8) {
  if (address.length <= length) {
    return address
  }

  const prefix = address.slice(0, 2 + Math.ceil((length - 2) / 2))
  const suffix = address.slice(-Math.floor((length - 2) / 2))

  return `${prefix}…${suffix}`
}

export const getShortenedPoolName = (poolName) => {
  if (poolName && poolName.length > 12) {
    return poolName.substring(0, 12) + '...'
  }
  return poolName
}
