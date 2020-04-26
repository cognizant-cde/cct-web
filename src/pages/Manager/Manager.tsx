import { Grid } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { ChartWrapper } from '../../components/Charts/ChartWrapper';
import { SearchBar } from '../../components/SearchBar';
import { TeamTableWrapper } from '../../components/TeamTable';

export function Manager() {
  const classes = useStyles();

  return (
    <div>
      {/*<PrivacyPolicyDialogue />*/}
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        className={classes.root}
      >
        <ChartWrapper />
        <SearchBar />
        <TeamTableWrapper />
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 20,
    paddingTop: 30,
    [theme.breakpoints.down('md')]: {
      paddingTop: 30,
      paddingLeft: 15,
      paddingRight: 15,
    },
  },
}));
