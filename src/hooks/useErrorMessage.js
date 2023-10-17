import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const useErrorMessage = () => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!message) return;

    const timeout = setTimeout(() => {
      setMessage(null);
    }, 4000);

    return () => {
      clearTimeout(timeout);
    };
  }, [message]);

  const notify = (msg) => {
    setMessage(msg);
  };

  const MessageRender = !message ? (
    <></>
  ) : (
    <Typography color="error">{message}</Typography>
  );

  return [(msg) => notify(msg), MessageRender];
};

export default useErrorMessage;
