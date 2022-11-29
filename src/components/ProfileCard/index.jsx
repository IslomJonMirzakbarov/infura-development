import styles from './style.module.scss';
import icon from 'assets/icons/profile.svg';
import { ReactComponent as CopyIcon } from 'assets/icons/copy.svg';
import { useSelector } from 'react-redux';
import { truncateAddress } from 'utils';
import { Tooltip, Typography } from '@mui/material';
import { useState } from 'react';

export default function ProfileCard() {
  const { walletAddress } = useSelector((store) => store.auth);

  const [isCopied, setIsCopied] = useState(false);

  const handleClick = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(walletAddress);
  };

  return (
    <div className={styles.profile}>
      <div className={styles.icon}>
        <img src={icon} alt="profile" />
      </div>
      <Typography variant="main">My wallet address</Typography>
      <Tooltip title={isCopied ? 'Copied!' : 'Copy'} placement="top">
        <button onClick={handleClick} className={isCopied ? 'copied' : ''}>
          {truncateAddress(walletAddress)}
          <CopyIcon />
        </button>
      </Tooltip>
    </div>
  );
}
