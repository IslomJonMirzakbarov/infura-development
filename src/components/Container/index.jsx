import styles from './style.module.scss';
import { Container as MuiContainer } from '@mui/system';
import classNames from 'classnames';

export default function Container({ children, className }) {
  return (
    <div className={classNames(styles.body, className)}>
      <MuiContainer className={className}>{children}</MuiContainer>
    </div>
  );
}
