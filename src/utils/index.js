export const truncateAddress = (address, isHex = false) => {
  if (isHex) {
    if (!address) return 'No Account';
    const match = address.match(
      /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
    );
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
  }

  if (!address) return 'No account';

  const start = address?.slice(0, 5);
  const end = address?.slice(address?.length - 4);

  return `${start}...${end}`;
};

export const toHex = (num) => {
  const val = Number(num);
  return '0x' + val.toString(16);
};

export const isElectron = () =>
  window?.navigator?.userAgent?.toLowerCase()?.includes('electron');
