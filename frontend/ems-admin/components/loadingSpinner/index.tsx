import { FC } from 'react';
import styles from './loadingSpinnerStyles.module.css';

const LoadingSpinner: FC = () => {
  return (
    <>
      <div className={styles.spinner}>
        <div className={styles['outer-layer-one']}>
          <div className={styles['inner-layer-one']}></div>
        </div>
        <span className={styles['loading-text']}>Loading...</span>
      </div>
    </>
  );
};

export default LoadingSpinner;
