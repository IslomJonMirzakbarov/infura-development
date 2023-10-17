import styles from './style.module.scss';
import { ReactComponent as MoneyIcon } from 'assets/icons/money.svg';
import NumberFormat from 'react-number-format';

export default function Balance({ balance, walletAddress }) {
  return (
    <div className={styles.balance}>
      <p>
        <NumberFormat
          value={balance}
          displayType={'text'}
          thousandSeparator={true}
          decimalScale={4}
        />
      </p>
      <div className={styles.box}>
        <MoneyIcon /> CYCON
      </div>
    </div>
  );
}
