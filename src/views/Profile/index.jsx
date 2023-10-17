import { useEffect, useState } from 'react';
import styles from './style.module.scss';
import { ReactComponent as PlayerIcon } from 'assets/icons/play.svg';
import { ReactComponent as CopyIcon } from 'assets/icons/copyV2.svg';
import { ReactComponent as CancelIcon } from 'assets/icons/cancel.svg';
import LinearWithValueLabel from 'components/LinearProgress';
import Profile from './Profile';
import useCaver from 'hooks/useCaver';

const headColumns = [
  {
    key: 'domain',
    title: 'Domain'
  },
  {
    key: 'access',
    title: 'Access'
  },
  {
    key: 'created_at',
    title: 'Created At'
  }
];

const downloadData = [
  {
    queue: (
      <div className={styles.column}>
        <div className={styles.name}>
          <PlayerIcon /> 20220422_151744.mp4
        </div>
        <div className={styles.progress}>
          <LinearWithValueLabel />
        </div>
        <div className={styles.cancle}>
          1.7 GB <CancelIcon />
        </div>
      </div>
    )
  }
];

export const mockUploadedData = [
  {
    domain: <div className={styles.column}>dexpo.mypinata.cloud</div>,
    access: 'Open',
    created_at: '2022.04.13 17:48:29'
  }
];

const tabs = ['Gateway', 'My revenue'];

export default function ProfileContainer() {
  const { balance } = useCaver();

  const [value, setValue] = useState(0);
  const [viewTable, setViewTable] = useState(true);

  useEffect(() => {
    console.log(balance);
  }, []);

  const handleChange = (index) => setValue(index);

  return (
    <Profile
      handleChange={handleChange}
      tabs={tabs}
      value={value}
      data={mockUploadedData}
      downloadData={downloadData}
      headColumns={headColumns}
      setViewTable={setViewTable}
      viewTable={viewTable}
    />
  );
}
