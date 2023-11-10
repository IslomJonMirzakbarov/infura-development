export function truncateJWT(token, length) {
  if (token.length <= length) {
    return token
  }

  const prefix = token.slice(0, Math.ceil(length / 2))
  const suffix = token.slice(-Math.floor(length / 2))

  return `${prefix}...${suffix}`
}

export const formatNumberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
