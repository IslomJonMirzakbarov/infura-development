import { Grid } from '@mui/material';
import BoardCard from 'components/BoardCard';
import React from 'react';

const Boards = () => {
  return (
    <Grid container spacing={1}>
      <Grid item lg={3}>
        <BoardCard
          value={308622}
          prefix="$"
          label="Total Gross Sales"
          percent={-6}
        />
      </Grid>
      <Grid item lg={3}>
        <BoardCard value={39888} label="Total Quantity" percent={-12} />
      </Grid>
      <Grid item lg={3}>
        <BoardCard value={8406} label="Total Orders" percent={-5} />
      </Grid>
      <Grid item lg={3}>
        <BoardCard value={7000} label="Total Customers" percent={-2} />
      </Grid>
    </Grid>
  );
};

export default Boards;
