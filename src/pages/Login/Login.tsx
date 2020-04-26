import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Auth } from 'aws-amplify';
import Hashids from 'hashids';
import * as React from 'react';
import { Fragment } from 'react';
import { useActions } from '../../actions';
import * as AssociateDetailsActions from '../../actions/AssociateDetails';
import * as DailyUpdatesActions from '../../actions/DailyUpdates';
import * as FilterActions from '../../actions/filter';
import * as SearchActions from '../../actions/searchBar';
import * as TeamActions from '../../actions/team';
import { history } from '../../configureStore';
import { AUTH_USER_TOKEN_KEY } from '../../utils/constants';

const hashids = new Hashids();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`,
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff',
    },
    card: {
      marginTop: theme.spacing(10),
    },
  })
);

export function Login() {
  const classes = useStyles();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  const [helperText, setHelperText] = React.useState('');
  const [error, setError] = React.useState(false);

  const associateDetailsActions = useActions(AssociateDetailsActions);
  const searchActions = useActions(SearchActions);
  const teamActions = useActions(TeamActions);
  const filterActions = useActions(FilterActions);
  const dailyUpdatesActions = useActions(DailyUpdatesActions);

  React.useEffect(() => {
    localStorage.clear();
    associateDetailsActions.setAssociateDetails([]);
    searchActions.setSearchResult([]);
    searchActions.setSearchInput([]);
    searchActions.setSearchCountry([]);
    teamActions.setTeamList([]);
    filterActions.setFilter([]);
    dailyUpdatesActions.resetDailyUpdateData({
      travelStatus: '',
      countryCode: '',
      personalStatus: '',
      address: '',
      wfh: '',
      onLeave: '',
    });
    history.push('/');

    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (username.trim() && password.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [username, password]);

  const handleLogin = () => {
    Auth.signIn(username, password)
      .then((user) => {
        const associate = {
          associateId: user.attributes['custom:associateId'],
          firstName: user.attributes['custom:firstName'],
          lastName: user.attributes['custom:lastName'],
          managerId: user.attributes['custom:managerId'],
          role: user.attributes['custom:designation'],
          department: user.attributes['custom:department'],
          accountName: user.attributes['custom:accountName'],
          countryCode: user.attributes['custom:countryCode'],
          address: user.attributes['custom:address'],
        };
        fetch(`${process.env.REACT_APP_API_URL}/api/associates`, {
          method: 'put',
          headers: new Headers({
            'x-api-key': 'VpGpMvlvBN5KjnaL6ZPm44LR5vsNq4CiaCQRNPNF',
          }),
          body: JSON.stringify(associate),
        })
          .then((response) => {
            localStorage.setItem(AUTH_USER_TOKEN_KEY, user.username);
            setHelperText('Login Successfully');
            return response.json();
            // need some logic to redirect user to the right page. (sorting)
          })
          .then((response) => {
            associateDetailsActions.setAssociateDetails(response.resources);
            if (response.resources.accessType === 'user') {
              const id = hashids.encode(user.username);
              return history.push('/dailyupdates?id=' + id);
            } else if (
              response.resources.accessType === 'manager' ||
              response.resources.accessType === 'hr'
            ) {
              return history.push('/manager');
            }
          });
      })
      .catch((err) => {
        setError(true);
        setHelperText('Incorrect associate id or password');
      });
  };

  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13 || e.which === 13) {
      isButtonDisabled || handleLogin();
    }
  };

  return (
    <Fragment>
      <form className={classes.container} noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="Cognizant Login" />
          <CardContent>
            <div>
              <TextField
                error={error}
                fullWidth
                id="username"
                type="email"
                label="Associate Id"
                placeholder="Associate Id"
                margin="normal"
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e)}
              />
              <TextField
                error={error}
                fullWidth
                id="password"
                type="password"
                label="Password"
                placeholder="Password"
                margin="normal"
                helperText={helperText}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e)}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              className={classes.loginBtn}
              onClick={() => handleLogin()}
              disabled={isButtonDisabled}
            >
              Login
            </Button>
          </CardActions>
        </Card>
      </form>
    </Fragment>
  );
}
