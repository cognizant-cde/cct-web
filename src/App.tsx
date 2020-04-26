import { AppBar, Button, Grid, Toolbar, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Hashids from 'hashids';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { useActions } from './actions';
import * as AssociateDetailsActions from './actions/AssociateDetails';
import * as DailyUpdatesActions from './actions/DailyUpdates';
import * as FilterActions from './actions/filter';
import * as SearchActions from './actions/searchBar';
import * as TeamActions from './actions/team';
import AuthenticatedRoute from './components/Navigation/AuthenticatedRoute';
import { history } from './configureStore';
import { DailyUpdates, Login, Logout, Manager } from './pages';
import { RootState } from './reducers';
import { withRoot } from './withRoot';

const hashids = new Hashids();

function Routes() {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <Switch>
        <Route exact path="/" component={Login} />
        <AuthenticatedRoute exact path="/manager" component={Manager} />
        <AuthenticatedRoute
          exact
          path="/dailyupdates"
          component={DailyUpdates}
        />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/login" component={Login} />
        <Route component={Login} />
      </Switch>
    </div>
  );
}

function App() {
  const classes = useStyles();

  const associateDetailsActions = useActions(AssociateDetailsActions);
  const searchActions = useActions(SearchActions);
  const teamActions = useActions(TeamActions);
  const filterActions = useActions(FilterActions);
  const dailyUpdatesActions = useActions(DailyUpdatesActions);

  const logout = () => {
    localStorage.clear();
    associateDetailsActions.setAssociateDetails([]);
    searchActions.setSearchResult([]);
    searchActions.setSearchInput([]);
    searchActions.setSearchCountry([]);
    teamActions.setTeamList([]);
    filterActions.setFilter([]);
    dailyUpdatesActions.resetDailyUpdateData({
      date: '',
      travelStatus: '',
      countryCode: '',
      personalStatus: '',
      address: '',
      wfh: '',
      onLeave: '',
    });
    history.push('/');
  };

  const associateDetails = useSelector(
    (state: RootState) => state.associateDetails
  );

  const associateId = hashids.encode(associateDetails.associateId);
  const accessTypeChecker = associateDetails.accessType;

  // React.useEffect(() => {
  //   window.onbeforeunload = (e: any) => {
  //     logout();
  //   };
  // });

  return (
    <Router history={history}>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.title}>
              Cognizant Contact Tracer
            </Typography>
            {(accessTypeChecker === 'hr' ||
              accessTypeChecker === 'manager') && (
              <Grid>
                <Link
                  className={classes.link}
                  component="button"
                  variant="body2"
                  onClick={() => history.push(`/manager`)}
                >
                  Team Updates
                </Link>
                <Link
                  className={classes.link}
                  component="button"
                  variant="body2"
                  onClick={() =>
                    history.push(`/dailyupdates?id=${associateId}`)
                  }
                >
                  Daily Updates
                </Link>
              </Grid>
            )}
            {associateDetails.associateId && (
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Routes />
      </div>
    </Router>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    height: 'calc(100% - 56px)',
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
    },
  },
  appTitles: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  link: {
    marginRight: '3vw',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    color: 'white',
  },
}));

export default withRoot(App);
