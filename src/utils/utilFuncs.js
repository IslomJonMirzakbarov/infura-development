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

export function formatStatStorageNumber(num) {
  if (num >= 1e18) {
    return { value: (num / 1e18).toFixed(1), cap: 'Exabyte (EB)' } // Exabytes
  } else if (num >= 1e15) {
    return { value: (num / 1e15).toFixed(1), cap: 'Petabyte (PB)' } // Petabytes
  } else if (num >= 1e12) {
    return { value: (num / 1e12).toFixed(1), cap: 'TB' } // Terabytes
  } else if (num >= 1e9) {
    return { value: (num / 1e9).toFixed(1), cap: 'GB' } // Gigabytes
  } else if (num >= 1e6) {
    return { value: (num / 1e6).toFixed(1), cap: 'MB' } // Millions
  } else if (num >= 1e3) {
    return { value: (num / 1e3).toFixed(1), cap: 'KB' } // Thousands
  } else {
    return { value: num, cap: 'B' } // Numbers less than 1000
  }
}

export function formatStatNumber(num) {
  if (num >= 1e18) {
    return { value: (num / 1e18).toFixed(1), cap: 'Exa (E)' }
  } else if (num >= 1e15) {
    return { value: (num / 1e15).toFixed(1), cap: 'Peta (P)' }
  } else if (num >= 1e12) {
    return { value: (num / 1e12).toFixed(1), cap: 'T' }
  } else if (num >= 1e9) {
    return { value: (num / 1e9).toFixed(1), cap: 'G' }
  } else if (num >= 1e6) {
    return { value: (num / 1e6).toFixed(1), cap: 'M' }
  } else if (num >= 1e3) {
    return { value: (num / 1e3).toFixed(1), cap: 'K' }
  } else {
    return { value: num, cap: '' }
  }
}

export const getDataByLang = (lang, key, data) => data[`${key}_${lang}`]

export const formatDateFile = (date) =>
  `${date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })}, ${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
