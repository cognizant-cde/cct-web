import {
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../../actions';
import * as DailyUpdatesActions from '../../actions/DailyUpdates';
import { RootState } from '../../reducers';

interface personalDetailsProps {
  personalDetails: any;
}

export function PersonalDailyUpdates({
  personalDetails,
}: personalDetailsProps) {
  const classes = useStyles();
  const [healthStatus, setHealthStatus] = React.useState<string>('No Status');
  const [leaveType, setLeaveType] = React.useState<string>('Not on Leave');
  const [wfhYes, setWfhYes] = React.useState<boolean>(false);
  const [wfhNo, setWfhNo] = React.useState<boolean>(false);
  const [travelYes, setTravelYes] = React.useState<boolean>(false);
  const [travelNo, setTravelNo] = React.useState<boolean>(false);
  const [workLocation, setWorkLocation] = React.useState<string>('');
  const [country, setCountry] = React.useState<string>('');
  const [canSubmit, setCanSubmit] = React.useState<boolean>(true);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const countryArray = useSelector((state: RootState) => state.country);
  const countryList = countryArray.map((item: any) => item.name);

  const dailyUpdatesActions = useActions(DailyUpdatesActions);

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

  const handleHealthStatus = (event: any) => {
    setHealthStatus(event.target.value);
  };

  const handleLeaveType = (event: any) => {
    setLeaveType(event.target.value);
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

  const handleWorkLocation = (event: any) => {
    setWorkLocation(event.target.value);
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

  const handleCountry = (event: any) => {
    setCountry(event.target.value);
  };

  const submit = () => {
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
    dailyUpdatesActions.submitDailyUpdatesData(
      submitPayload,
      personalDetails.associateId
    );
    setOpenDialog(true);
    setTimeout(() => {
      setOpenDialog(false);
    }, 3000);
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

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Grid>
      <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle className={classes.dialogText}>
          Thank you for submitting your daily personal status
        </DialogTitle>
      </Dialog>

      <Paper elevation={3} className={classes.root}>
        <Grid>
          <Grid className={classes.title}>
            <Typography variant="h5">
              Please fill in your daily updates
            </Typography>
          </Grid>
          <Grid className={classes.row}>
            <FormControl className={classes.inputFields} required>
              <FormLabel className={classes.labels}>Health Status</FormLabel>
              <Select
                value={healthStatus}
                variant="outlined"
                onChange={handleHealthStatus}
                className={classes.dropDown}
              >
                {healthStatusArray.map((healthStatus: string, i: number) => {
                  return (
                    <MenuItem key={i} value={healthStatus}>
                      {healthStatus}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid className={classes.row}>
            <FormControl className={classes.inputFields} required>
              <FormLabel className={classes.labels}>Leave Type</FormLabel>
              <Select
                value={leaveType}
                variant="outlined"
                onChange={handleLeaveType}
                className={classes.dropDown}
              >
                {leaveTypeArray.map((leaveType: string, i: number) => {
                  return (
                    <MenuItem key={i} value={leaveType}>
                      {leaveType}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          {leaveType === 'Not on Leave' && (
            <Grid className={classes.row}>
              <FormControl className={classes.inputFields} required>
                <FormLabel className={classes.labels}>Work from Home</FormLabel>
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
              </FormControl>
            </Grid>
          )}
          {wfhNo && (
            <Grid className={classes.row}>
              <FormControl className={classes.inputFields} required>
                <FormLabel className={classes.labels}>Work Location</FormLabel>
                <Select
                  value={workLocation}
                  variant="outlined"
                  onChange={handleWorkLocation}
                  className={classes.dropDown}
                >
                  {workLocationArray.map((workLocation: string, i: number) => {
                    return (
                      <MenuItem key={i} value={workLocation}>
                        {workLocation}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          )}
          <Grid className={classes.row}>
            <FormControl className={classes.inputFields} required>
              <FormLabel className={classes.labels}>Travel Status</FormLabel>
              <RadioGroup
                row
                aria-label="Travel Status"
                name="Travel Status"
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
            </FormControl>
          </Grid>
          {travelYes && (
            <Grid className={classes.row}>
              <FormControl className={classes.inputFields} required>
                <FormLabel className={classes.labels}>Country</FormLabel>
                <Select
                  variant="outlined"
                  value={country}
                  onChange={handleCountry}
                  className={classes.dropDown}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 58 * 5 + 8,
                        width: 250,
                      },
                    },
                  }}
                >
                  {countryList.map((country: string, i: number) => {
                    return (
                      <MenuItem key={i} value={country}>
                        {country}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          )}
        </Grid>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={submit}
          disabled={canSubmit}
        >
          Submit
        </Button>
      </Paper>
    </Grid>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 480,
    padding: '40px 10%',
    minHeight: 600,
    justifyContent: 'space-between',
  },
  dialogText: {
    fontSize: 20,
    textAlign: 'center',
  },
  title: {
    margin: '20px 0',
  },
  inputFields: {
    width: '100%',
    // margin: '20px 0',
  },
  row: {
    marginTop: 20,
  },
  labels: {},
  dropDown: {
    marginTop: 8,
    maxHeight: 200,
  },
  button: {
    backgroundColor: '#2196f3',
    marginTop: 50,
    marginBottom: 10,
    '&:hover': {
      backgroundColor: '#1565c0',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
}));
