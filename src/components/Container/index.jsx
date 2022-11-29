import styles from './style.module.scss';
import { Container as MuiContainer } from '@mui/system';
import classNames from 'classnames';

export default function Container({ children, className, maxWidth }) {
  return (
    <div className={classNames(styles.body, className)}>
      <MuiContainer maxWidth={maxWidth} className={className}>
        {children}
      </MuiContainer>
    </div>
  );
}
