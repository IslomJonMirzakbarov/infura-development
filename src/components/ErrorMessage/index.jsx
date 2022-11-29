import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const ErrorMessage = ({ message }) => {
  const [stateMessage, setStateMessage] = useState(null);

  useEffect(() => {
    if (!message) return;

    setStateMessage(message);
  }, [message]);

  useEffect(() => {
    if (!stateMessage) return;

    const timeout = setTimeout(() => {
      setStateMessage(null);
    }, 4000);

    return () => {
      clearTimeout(timeout);
    };
  }, [stateMessage]);

  if (!stateMessage) return <></>;

  return <Typography color="error">{stateMessage}</Typography>;
};

export default ErrorMessage;
