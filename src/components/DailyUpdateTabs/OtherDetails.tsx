import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';

interface personalDetailsProps {
  personalDetails: any;
}

export function OtherDetails({ personalDetails }: personalDetailsProps) {
  const classes = useStyles();

  const associateDetails = useSelector(
    (state: RootState) => state.associateDetails
  );

  return (
    <Paper elevation={3} className={classes.paper}>
      <Grid className={classes.textWrapper}>
        <Typography className={classes.title}>Account Name</Typography>
        <Typography className={classes.text}>
          {personalDetails.accountName}
        </Typography>
      </Grid>
      <Grid className={classes.textWrapper}>
        <Typography className={classes.title}>Role</Typography>
        <Typography className={classes.text}>{personalDetails.role}</Typography>
      </Grid>
      <Grid className={classes.textWrapper}>
        <Typography className={classes.title}>Manager</Typography>
        <Typography className={classes.text}>
          {personalDetails.managerFirstName} {personalDetails.managerLastName}
        </Typography>
      </Grid>
      <Grid className={classes.textWrapper}>
        <Typography className={classes.title}>Country</Typography>
        <Typography className={classes.text}>
          {associateDetails.countryCode}
        </Typography>
      </Grid>
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 30,
    width: '50%',
  },
  textWrapper: {
    paddingLeft: '10%',
    margin: 25,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
  },
}));
