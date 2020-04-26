import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Hashids from 'hashids';
import queryString from 'query-string';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../../actions/';
import * as CountryActions from '../../actions/Country';
import * as DailyUpdatesActions from '../../actions/DailyUpdates';
import { DailyUpdatesTable } from '../../components/DailyUpdatesTable/DailyUpdatesTable';
import DropDown from '../../components/Form/DropDown';
import SubmitButton from '../../components/Form/SubmitButton';
import { history } from '../../configureStore';
import { RootState } from '../../reducers';

const hashids = new Hashids();

export interface DailyUpdatesProps {}

export const DailyUpdates: React.SFC<DailyUpdatesProps> = () => {
  const classes = useStyles();
  const QS = queryString.parse(history.location.search);
  const id = typeof QS.id === 'string' ? QS.id : '';
  const decodedId = hashids.decode(id);

  const [healthStatus, setHealthStatus] = React.useState<string>('No Status');
  const [leaveType, setLeaveType] = React.useState<string>('Not on Leave');
  const [wfhYes, setWfhYes] = React.useState<boolean>(false);
  const [wfhNo, setWfhNo] = React.useState<boolean>(false);
  const [travelYes, setTravelYes] = React.useState<boolean>(false);
  const [travelNo, setTravelNo] = React.useState<boolean>(false);
  const [workLocation, setWorkLocation] = React.useState<string>('');
  const [country, setCountry] = React.useState<string>('');
  const [canSubmit, setCanSubmit] = React.useState<boolean>(true);
  const [dailyUpdatesArray, setDailyUpdatesArray] = React.useState<any>([]);

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

  const healthStatusArray: string[] = [
    'No Status',
    'Confirmed Case',
    'Suspected Case',
    'SHN',
    'LOA',
    'Extra Precautionary Measure',
  ];
  const leaveTypeArray: string[] = [
    'Not on Leave',
    'Child Care Leave',
    'Annual Leave',
    'Medical Leave',
  ];
  const workLocationArray: string[] = [`Client's Office`, 'CBP Office'];

  const countryArray = useSelector((state: RootState) => state.country);
  const countryList = countryArray.map((item: any) => item.name);

  const dailyUpdatesActions = useActions(DailyUpdatesActions);
  const countryAction = useActions(CountryActions);

  React.useEffect(() => {
    if (decodedId[0]) {
      fetch(`${process.env.REACT_APP_API_URL}/api/associates/${decodedId[0]}`, {
        method: 'get',
        headers: new Headers({
          'x-api-key': 'VpGpMvlvBN5KjnaL6ZPm44LR5vsNq4CiaCQRNPNF',
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          setPersonalDetails(json.resources);
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

    getDailyUpdateHistory();
    // eslint-disable-next-line
  }, []);

  const getDailyUpdateHistory = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/associates/${decodedId[0]}/daily-updates`,
      {
        method: 'get',
        headers: new Headers({
          'x-api-key': 'VpGpMvlvBN5KjnaL6ZPm44LR5vsNq4CiaCQRNPNF',
        }),
      }
    )
      .then((response) => response.json())
      .then((json) => {
        setDailyUpdatesArray(json.resources);
      });
  };

  const handleHealthStatus = (value: any) => {
    setHealthStatus(value);
  };

  const handleLeaveType = (value: any) => {
    setLeaveType(value);
    setWorkLocation('');
    setWfhYes(false);
    setWfhNo(false);
  };

  const handlewfh = (event: any) => {
    if (event.target.value === 'Yes') {
      setWfhYes(true);
      setWfhNo(false);
    } else {
      setWfhYes(false);
      setWfhNo(true);
    }
    setWorkLocation('');
  };

  const handleWorkLocation = (value: any) => {
    setWorkLocation(value);
  };

  const handleTravelStatus = (event: any) => {
    if (event.target.value === 'Yes') {
      setTravelYes(true);
      setTravelNo(false);
    } else {
      setTravelYes(false);
      setTravelNo(true);
    }
    setCountry('');
  };

  const handleCountry = (value: any) => {
    setCountry(value);
  };

  const resetFields = () => {
    // setHealthStatus('');
    // setLeaveType('');
    setWorkLocation('');
    setWfhYes(false);
    setWfhNo(false);
    setTravelYes(false);
    setTravelNo(false);
    setCountry('');
  };

  const submit = (e: any) => {
    e.preventDefault();

    const countryCode: any = countryArray.filter((c) => c.name === country);
    const submitPayload = {
      personalStatus: healthStatus,
      travelStatus: travelYes ? 'Travelling' : 'Not Travelling',
      address: workLocation || '',
      wfh: wfhYes ? 'Yes' : wfhNo ? 'No' : '',
      onLeave: leaveType,
      countryCode:
        countryCode.length > 0
          ? countryCode[0].code
          : personalDetails.countryCode,
    };
    dailyUpdatesActions.submitDailyUpdatesData(submitPayload, decodedId[0]);

    resetFields();

    setTimeout(() => {
      getDailyUpdateHistory();
    }, 500);
  };

  React.useEffect(() => {
    validationButton();
    // eslint-disable-next-line
  }, [
    healthStatus,
    leaveType,
    travelYes,
    travelNo,
    country,
    workLocation,
    wfhYes,
    wfhNo,
  ]);

  const validationButton = () => {
    switch (true) {
      case !!healthStatus &&
        !!leaveType &&
        leaveType === 'Not on Leave' &&
        travelNo &&
        !travelYes &&
        !wfhYes &&
        wfhNo &&
        !!workLocation &&
        !country:
        setCanSubmit(false);
        break;

      case !!healthStatus &&
        !!leaveType &&
        leaveType === 'Not on Leave' &&
        !travelNo &&
        travelYes &&
        !wfhYes &&
        wfhNo &&
        !!workLocation &&
        !!country:
        setCanSubmit(false);
        break;

      case !!healthStatus &&
        !!leaveType &&
        leaveType === 'Not on Leave' &&
        travelNo &&
        !travelYes &&
        wfhYes &&
        !wfhNo &&
        !workLocation &&
        !country:
        setCanSubmit(false);
        break;

      case !!healthStatus &&
        !!leaveType &&
        leaveType === 'Not on Leave' &&
        !travelNo &&
        travelYes &&
        wfhYes &&
        !wfhNo &&
        !workLocation &&
        !!country:
        setCanSubmit(false);
        break;

      case !!healthStatus &&
        !!leaveType &&
        leaveType !== 'Not on Leave' &&
        !travelNo &&
        travelYes &&
        !wfhYes &&
        !wfhNo &&
        !workLocation &&
        !!country:
        setCanSubmit(false);
        break;

      case !!healthStatus &&
        !!leaveType &&
        leaveType !== 'Not on Leave' &&
        travelNo &&
        !travelYes &&
        !wfhYes &&
        !wfhNo &&
        !workLocation &&
        !country:
        setCanSubmit(false);
        break;

      default:
        setCanSubmit(true);
    }
  };

  return (
    <>
      <Paper elevation={3} className={classes.paper}>
        <Grid justify="space-between" container>
          <FormControl className={classes.inputFields}>
            <Grid container justify="flex-start" alignItems="flex-end">
              <Typography variant="subtitle1" color="primary">
                EmployeeId:
              </Typography>
              <Typography variant="h6" className={classes.inputFieldsValues}>
                {personalDetails.associateId}
              </Typography>
            </Grid>
          </FormControl>

          <FormControl className={classes.inputFields}>
            <Grid container justify="flex-start" alignItems="flex-end">
              <Typography variant="subtitle1" color="primary">
                Associate Name:
              </Typography>
              <Typography variant="h6" className={classes.inputFieldsValues}>
                {personalDetails.firstName} {personalDetails.lastName}
              </Typography>
            </Grid>
          </FormControl>

          <FormControl className={classes.inputFields}>
            <Grid container justify="flex-start" alignItems="flex-end">
              <Typography variant="subtitle1" color="primary">
                Department:
              </Typography>
              <Typography variant="h6" className={classes.inputFieldsValues}>
                {personalDetails.department}
              </Typography>
            </Grid>
          </FormControl>

          <FormControl className={classes.inputFields}>
            <Grid container justify="flex-start" alignItems="flex-end">
              <Typography variant="subtitle1" color="primary">
                Account Name:
              </Typography>
              <Typography variant="h6" className={classes.inputFieldsValues}>
                {personalDetails.accountName}
              </Typography>
            </Grid>
          </FormControl>

          <FormControl className={classes.inputFields}>
            <Grid container justify="flex-start" alignItems="flex-end">
              <Typography variant="subtitle1" color="primary">
                Manager Name:
              </Typography>
              <Typography variant="h6" className={classes.inputFieldsValues}>
                {personalDetails.managerFirstName}{' '}
                {personalDetails.managerLastName}
              </Typography>
            </Grid>
          </FormControl>

          <FormControl className={classes.inputFields}>
            <Grid container justify="flex-start" alignItems="flex-end">
              <Typography variant="subtitle1" color="primary">
                Role:
              </Typography>
              <Typography variant="h6" className={classes.inputFieldsValues}>
                {personalDetails.role}
              </Typography>
            </Grid>
          </FormControl>
        </Grid>
      </Paper>

      <Paper elevation={3} className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xl={4}>
            <FormControl className={classes.inputFields} required>
              <FormLabel className={classes.radioButtonLabels}>
                Health Status
              </FormLabel>
              <DropDown
                initialValue={healthStatus}
                values={healthStatusArray}
                onChange={handleHealthStatus}
              />
            </FormControl>
          </Grid>

          <Grid item xl={4}>
            <FormControl className={classes.inputFields} required>
              <FormLabel className={classes.radioButtonLabels}>
                Leave Type
              </FormLabel>
              <DropDown
                initialValue={leaveType}
                values={leaveTypeArray}
                onChange={handleLeaveType}
              />
            </FormControl>
          </Grid>

          {leaveType === 'Not on Leave' && (
            <Grid item xl={4}>
              <FormControl className={classes.inputFields} required>
                <FormLabel className={classes.radioButtonLabels}>
                  Work From Home
                </FormLabel>
                <Grid justify="space-between" container direction="column">
                  <RadioGroup
                    row
                    aria-label="WFH"
                    name="WFH"
                    onChange={handlewfh}
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio checked={wfhYes} />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio checked={wfhNo} />}
                      label="No"
                    />
                  </RadioGroup>
                </Grid>
              </FormControl>
            </Grid>
          )}
          {wfhNo && (
            <Grid item xl={4}>
              <FormControl className={classes.inputFields} required>
                <FormLabel className={classes.radioButtonLabels}>
                  Office Location
                </FormLabel>
                <DropDown
                  initialValue={workLocation}
                  values={workLocationArray}
                  onChange={handleWorkLocation}
                />
              </FormControl>
            </Grid>
          )}

          <Grid item xl={4}>
            <FormControl className={classes.inputFields} required>
              <FormLabel className={classes.radioButtonLabels}>
                Current Travel Status
              </FormLabel>
              <Grid justify="space-between" container direction="column">
                <RadioGroup
                  row
                  aria-label="Travel"
                  onChange={handleTravelStatus}
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio checked={travelYes} />}
                    label="Travelling"
                  />
                  <FormControlLabel
                    value="No"
                    control={<Radio checked={travelNo} />}
                    label="Not Travelling"
                  />
                </RadioGroup>
              </Grid>
            </FormControl>
          </Grid>

          {travelYes && (
            <Grid item xl={4}>
              <FormControl className={classes.inputFields} required>
                <FormLabel className={classes.radioButtonLabels}>
                  Country
                </FormLabel>
                <DropDown
                  initialValue={country}
                  values={countryList}
                  onChange={handleCountry}
                />
              </FormControl>
            </Grid>
          )}

          <Grid container alignContent="center" direction="column">
            <SubmitButton disable={canSubmit} onClick={submit} />
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} className={classes.paper}>
        <DailyUpdatesTable dailyUpdates={dailyUpdatesArray} />
      </Paper>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: '20px',
  },

  inputFields: {
    margin: 20,
    width: '400px',
  },

  inputFieldsValues: {
    marginLeft: 10,
    marginTop: -1,
  },

  radioButtonLabels: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    color: 'black',
    marginBottom: 10,
  },

  submitValidation: {
    marginLeft: '80px',
    marginBottom: 5,
    color: 'red',
    fontSize: '16px',
  },

  button: {
    width: 200,
  },
  table: {
    position: 'absolute',
    left: '400px',
    top: '1450px',
    width: '50%',
  },
}));
