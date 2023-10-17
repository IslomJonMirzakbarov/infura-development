import styles from './style.module.scss';
import { ReactComponent as CopyIcon } from 'assets/icons/copy.svg';
import { truncateAddress } from 'utils';
import QRComponent from 'react-qr-code';

export default function QRCode({ walletAddress }) {
  const hanldeCopy = async () => {
    await navigator.clipboard.writeText(walletAddress);
  };

  return (
    <div className={styles.box}>
      <p>My wallet address</p>
      <div className={styles.img}>
        <QRComponent value={walletAddress} size={146} />
      </div>
      <button onClick={hanldeCopy}>
        {truncateAddress(walletAddress)}
        <CopyIcon />
      </button>
    </div>
  );
}
