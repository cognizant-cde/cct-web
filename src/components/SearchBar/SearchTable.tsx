import { Paper, Typography } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { mapLatestTeamDetails } from '../../utils/teamHelper';
import { TeamTable } from '../TeamTable/TeamTable';

export function SearchTable() {
  const classes = useStyles();

  const searchResults = useSelector((state: RootState) => state.searchResult);

  const modifiedSearchResults = mapLatestTeamDetails(searchResults);

  return (
    <Paper className={classes.tableWrapper}>
      <Typography variant="h4" className={classes.text}>
        Search Result
      </Typography>
      <TeamTable teamList={modifiedSearchResults} />
    </Paper>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  tableWrapper: {
    width: '86%',
    padding: '0 3% 30px 3%',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 20,
  },
  text: {
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
}));
