import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles({
  title: {
    'font-weight': 600,
    'font-size': 18,
    'line-height': '27px',
    'text-align': 'center',
    color: '#292929',
    margin: '30px 0 36px 0'
  }
});

const PrevTitle = ({ title }) => {
  const classes = useStyles();

  return (
    <div
      className={classes.title}
      dangerouslySetInnerHTML={{
        __html: title
      }}
    />
  );
};

export default PrevTitle;
