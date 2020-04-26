import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { OtherDetails } from './OtherDetails';
import { PersonalDailyUpdates } from './PersonalDailyUpdates';
import { PersonalHistory } from './PersonalHistory';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

interface personalDetailsProps {
  personalDetails: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} className={classes.tabWrapper}>
          {children}
        </Box>
      )}
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export function DailyUpdateTabs({ personalDetails }: personalDetailsProps) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [dailyUpdatesArray, setDailyUpdatesArray] = React.useState<any>([]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const callDailyUpdate = () => {
    setLoading(true);
    fetch(
      `${process.env.REACT_APP_API_URL}/api/associates/${personalDetails.associateId}/daily-updates`,
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
        setLoading(false);
      });
  };

  React.useEffect(() => {
    callDailyUpdate();
    // eslint-disable-next-line
  }, [personalDetails.associateId]);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab wrapped label="Daily Status Update" {...a11yProps(0)} />
          <Tab
            wrapped
            label="Personal History"
            onClick={callDailyUpdate}
            {...a11yProps(1)}
          />
          <Tab wrapped label="Other Personal Details" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <PersonalDailyUpdates personalDetails={personalDetails} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <PersonalHistory
            dailyUpdatesArray={dailyUpdatesArray}
            loading={loading}
          />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <OtherDetails personalDetails={personalDetails} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  tabWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
  },
}));
