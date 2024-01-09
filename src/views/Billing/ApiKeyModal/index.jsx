/* eslint-disable react/jsx-no-target-blank */
import { Box, Tooltip } from '@mui/material'
import BasicModal from 'components/BasicModal'
import { ReactComponent as CopyIcon } from 'assets/icons/copy.svg'
import styles from './style.module.scss'
import { truncateJWT } from 'utils/utilFuncs'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const ApiKeyModal = ({
  open,
  toggle,
  title,
  onSubmit,
  poolAddress,
  txHash
}) => {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const handleCopy = (tx) => {
    navigator.clipboard.writeText(tx)
    setCopied(true)
  }
  return (
    <BasicModal
      open={open}
      handleClose={toggle}
      submitLabel={t('continue')}
      onCancel={toggle}
      onSubmit={onSubmit}
      title={title || t('your_api_key')}
    >
      {txHash && (
        <p className={styles.txHash}>
          <a
            href={`https://baobab.scope.klaytn.com/tx/${txHash}`}
            target='_blank'
          >
            {truncateJWT(txHash, 20)}
          </a>
        </p>
      )}
      <p className={styles.title}>{t('api_key')}</p>
      <Box className={styles.text}>
        {poolAddress && <p>{truncateJWT(poolAddress, 20)}</p>}
        <Tooltip
          title={copied ? 'Copied!' : 'Copy to clipboard'}
          placement='top-start'
        >
          <CopyIcon onClick={() => handleCopy(poolAddress)} />
        </Tooltip>
      </Box>
    </BasicModal>
  )
}

export default ApiKeyModal
