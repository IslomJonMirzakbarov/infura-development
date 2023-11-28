import { Box, Tooltip } from '@mui/material'
import BasicModal from 'components/BasicModal'
import { ReactComponent as CopyIcon } from 'assets/icons/copy.svg'
import styles from './style.module.scss'
import { truncateJWT } from 'utils/utilFuncs'
import { useState } from 'react'

const ApiKeyModal = ({
  open,
  toggle,
  title,
  onSubmit,
  poolAddress,
  txHash
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = (tx) => {
    navigator.clipboard.writeText(tx)
    setCopied(true)
  }
  return (
    <BasicModal
      open={open}
      handleClose={toggle}
      submitLabel='Continue'
      onCancel={toggle}
      onSubmit={onSubmit}
      title={title || 'Your API key'}
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
      <p className={styles.title}>Api key</p>
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
