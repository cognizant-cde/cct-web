import { CircularProgress, Grid, Typography } from '@material-ui/core';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import { makeStyles } from '@material-ui/styles';
import Hashids from 'hashids';
import queryString from 'query-string';
import * as React from 'react';
import { useActions } from '../../actions';
import * as CountryActions from '../../actions/Country';
import { DailyUpdateTabs } from '../../components/DailyUpdateTabs/DailyUpdateTabs';
import { history } from '../../configureStore';

const hashids = new Hashids();

export function DailyUpdates() {
  const classes = useStyles();
  const QS = queryString.parse(history.location.search);
  const id = typeof QS.id === 'string' ? QS.id : '';
  const decodedId = hashids.decode(id);

  const [loading, setLoading] = React.useState(true);
  const [personalDetails, setPersonalDetails] = React.useState({
    accountName: '',
    associateId: '',
    department: '',
    firstName: '',
    lastName: '',
    managerFirstName: '',
    managerLastName: '',
    role: '',
    countryCode: '',
  });

  const countryAction = useActions(CountryActions);

  React.useEffect(() => {
    if (decodedId[0]) {
      setLoading(true);
      fetch(`${process.env.REACT_APP_API_URL}/api/associates/${decodedId[0]}`, {
        method: 'get',
        headers: new Headers({
          'x-api-key': 'VpGpMvlvBN5KjnaL6ZPm44LR5vsNq4CiaCQRNPNF',
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          setPersonalDetails(json.resources);
          setLoading(false);
        });
    }

    fetch(`${process.env.REACT_APP_API_URL}/api/countries`, {
      method: 'get',
      headers: new Headers({
        'x-api-key': 'VpGpMvlvBN5KjnaL6ZPm44LR5vsNq4CiaCQRNPNF',
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        countryAction.setCountry(json.resources);
      });

    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading ? (
        <Grid className={classes.loading}>
          <CircularProgress />
        </Grid>
      ) : (
        <Grid>
          <Grid className={classes.personalDetails}>
            <AccountCircleTwoToneIcon className={classes.icon} />
            <Grid className={classes.textWrapper}>
              <Typography variant="h5" className={classes.name}>
                {personalDetails.firstName} {personalDetails.lastName}(
                {personalDetails.associateId})
              </Typography>
              <Typography className={classes.otherDetails}>
                {personalDetails.department}
              </Typography>
            </Grid>
          </Grid>
          <DailyUpdateTabs personalDetails={personalDetails} />
        </Grid>
      )}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  personalDetails: {
    backgroundColor: 'white',
    height: 300,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 150,
    marginBottom: 20,
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  name: {
    textAlign: 'center',
  },
  otherDetails: {
    color: 'grey',
    fontSize: 14,
  },
  loading: {
    height: 400,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
