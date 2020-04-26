import { Grid, Paper, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { ICloseContactPersonal } from '../../model';

interface Props {
  employee: ICloseContactPersonal;
}

export function CCDetailsCard(props: Props) {
  const { employee } = props;
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.paper}>
      <Grid className={classes.card}>
        <AccountCircleIcon className={classes.icon} />
        <Typography className={classes.fullName}>
          ({employee.associateId}) {employee.firstName} {employee.lastName}
        </Typography>
      </Grid>
      <Grid className={classes.otherInfo}>
        <Grid className={classes.infoDisplay}>
          <Typography className={classes.title}>Phone Number :</Typography>
          <Typography className={classes.phoneNumber}>
            {employee.phoneNumber ? employee.phoneNumber : '-'}
          </Typography>
        </Grid>
        <Grid className={classes.infoDisplay}>
          <Typography className={classes.title}>Email :</Typography>
          <Typography className={classes.email}>
            {employee.email ? employee.email : '-'}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

const useStyles = makeStyles({
  icon: {
    fontSize: 100,
    margin: 20,
  },
  paper: {
    width: 400,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 30,
  },
  card: {
    display: 'flex',
  },
  fullName: {
    fontSize: 20,
    marginTop: 20,
    marginRight: 10,
  },
  infoDisplay: {
    display: 'flex',
  },
  title: {
    fontSize: 20,
    marginRight: 5,
  },
  phoneNumber: {
    fontSize: 20,
    textDecoration: 'underline',
  },
  email: {
    fontSize: 20,
  },
  otherInfo: {
    alignSelf: 'center',
    paddingBottom: 30,
  },
});
