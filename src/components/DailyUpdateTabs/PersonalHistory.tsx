import { CircularProgress, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { DailyUpdatesTable } from '../DailyUpdatesTable/DailyUpdatesTable';

interface Props {
  dailyUpdatesArray: any;
  loading: boolean;
}

export function PersonalHistory({ dailyUpdatesArray, loading }: Props) {
  const classes = useStyles();

  return (
    <>
      {loading ? (
        <Grid className={classes.loading}>
          <CircularProgress />
        </Grid>
      ) : (
        <Grid>
          <Paper elevation={3} className={classes.paper}>
            <DailyUpdatesTable dailyUpdates={dailyUpdatesArray} />
          </Paper>
        </Grid>
      )}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: 20,
  },
  loading: {
    height: 400,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
