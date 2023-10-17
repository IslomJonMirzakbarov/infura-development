import styles from './style.module.scss'
import { ReactComponent as ZipFileIcon } from 'assets/icons/zipFile.svg'
import CloseIcon from '@mui/icons-material/Close'
import CancelIcon from '@mui/icons-material/Cancel'

export default function FilesBox({ clearFn, files, deleteFn }) {
  return (
    <div className={styles.filesBox}>
      <div className={styles.header}>
        <p>Attached file</p>
        <div className={styles.close} onClick={clearFn}>
          <CloseIcon fontSize='small' />
        </div>
      </div>
      <div className={styles.body}>
        {files?.map((item, index) => (
          <div key={index + 'file'} className={styles.item}>
            <div className={styles.icon}>
              <ZipFileIcon />
            </div>
            <div className={styles.name}>{item.name}</div>
            {files.length > 1 && (
              <div
                className={styles.delete}
                onClick={() => deleteFn(item.name)}
              >
                <CancelIcon fontSize='small' />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
