import { Box, Tooltip, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import React, { useState } from 'react';
import { truncateAddress } from 'utils';

const CopyButton = ({ tx }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(tx);
    setCopied(true);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      onClick={handleCopy}
      cursor="pointer"
    >
      <Typography marginRight="10px" fontSize="14px">
        {truncateAddress(tx, true)}
      </Typography>
      <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'}>
        <ContentCopyIcon style={{ fontSize: 20, cursor: 'pointer' }} />
      </Tooltip>
    </Box>
  );
};

export default CopyButton;
