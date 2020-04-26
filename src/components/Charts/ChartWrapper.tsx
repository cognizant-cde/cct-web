import { Grid } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { ChartLocation } from '../../components/Charts/ChartLocation';
import { ChartStatus } from '../../components/Charts/ChartStatus';

export function ChartWrapper() {
  const classes = useStyles();

  return (
    <Grid container justify="center" direction="row">
      <div className={classes.chart}>
        <ChartStatus />
      </div>
      <div className={classes.chart}>
        <ChartLocation />
      </div>
    </Grid>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  chart: {
    margin: '0px 40px 60px 40px',
    maxWidth: 300,
    minWidth: 300,
  },
}));
