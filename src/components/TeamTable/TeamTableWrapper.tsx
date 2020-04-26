import { CircularProgress, Grid } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../../actions';
import * as TeamActions from '../../actions/team';
import { ITeamList } from '../../model';
import { RootState } from '../../reducers';
import { mapLatestTeamDetails } from '../../utils/teamHelper';
import { Filter } from './Filter';
import { TeamTable } from './TeamTable';

export function TeamTableWrapper() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState<boolean>(true);
  const teamActions = useActions(TeamActions);

  const associateDetails = useSelector(
    (state: RootState) => state.associateDetails
  );
  const country = useSelector((state: RootState) => state.searchCountry);

  React.useEffect(() => {
    if (country.length > 0) {
      setLoading(true);
      fetch(
        `${process.env.REACT_APP_API_URL}/api/teams/${associateDetails.associateId}/latest-details?countryCode=${country}`,
        {
          method: 'get',
          headers: new Headers({
            'x-api-key': 'VpGpMvlvBN5KjnaL6ZPm44LR5vsNq4CiaCQRNPNF',
          }),
        }
      )
        .then((response: any) => response.json())
        .then((json: any) => {
          teamActions.setTeamList(mapLatestTeamDetails(json.resources));
          setLoading(false);
          // teamActions.setTeamList(mapLatestTeamDetails(teamListData));
        });
    }

    // eslint-disable-next-line
  }, [country]);

  const teamList = useSelector((state: RootState) => state.teamList);
  const searchList = useSelector((state: RootState) => state.searchResult);
  const searchInput = useSelector((state: RootState) => state.searchInput);

  const [filteredTeamList, setFilteredTeamList] = React.useState([]);

  let filterSelected: any = [];
  filterSelected = useSelector((state: RootState) => state.filterOptions);

  React.useEffect(() => {
    const list =
      searchInput.length > 2 ? mapLatestTeamDetails(searchList) : teamList;
    const filteredList: any = filter(list);
    setFilteredTeamList(filteredList);
    // eslint-disable-next-line
  }, [filterSelected, teamList, searchList]);

  const filter = (teamList: any) => {
    let FL = teamList;

    if (
      filterSelected.personalStatus &&
      filterSelected.personalStatus.length > 0
    ) {
      FL = helperFilterPS(FL);
    }
    if (filterSelected.travelStatus && filterSelected.travelStatus.length > 0) {
      FL = helperFilterTS(FL);
    }
    if (
      filterSelected.MISDepartment &&
      filterSelected.MISDepartment.length > 0
    ) {
      FL = helperFilterMD(FL);
    }
    if (filterSelected.workLocation && filterSelected.workLocation.length > 0) {
      FL = helperFilterWL(FL);
    }

    return FL;
  };

  const helperFilterWL = (teamList: any) => {
    let FL: any = [];
    teamList.forEach((teamMate: ITeamList) => {
      filterSelected.workLocation.forEach((selected: string) => {
        switch (selected) {
          case 'WFH':
            if (teamMate.workLocation === 'Work from home') FL.push(teamMate);
            break;

          case 'CS':
            if (teamMate.workLocation === 'Client Site') FL.push(teamMate);
            break;
        }
      });
    });
    return FL;
  };

  const helperFilterMD = (teamList: any) => {
    let FL: any = [];
    teamList.forEach((teamMate: ITeamList) => {
      filterSelected.MISDepartment.forEach((selected: string) => {
        switch (selected) {
          case 'CDE':
            if (teamMate.MISDepartment === 'CDE') FL.push(teamMate);
            break;

          case 'ABC':
            if (teamMate.MISDepartment === 'ABC') FL.push(teamMate);
            break;

          case 'HR':
            if (teamMate.MISDepartment === 'HR') FL.push(teamMate);
            break;
        }
      });
    });
    return FL;
  };

  const helperFilterTS = (teamList: any) => {
    let FL: any = [];
    teamList.forEach((teamMate: ITeamList) => {
      filterSelected.travelStatus.forEach((selected: string) => {
        switch (selected) {
          case 'NT':
            if (teamMate.travelStatus === 'No Travel') FL.push(teamMate);
            break;

          case 'T':
            if (teamMate.travelStatus === 'Travel') FL.push(teamMate);
            break;
        }
      });
    });
    return FL;
  };

  const helperFilterPS = (teamList: any) => {
    let FL: any = [];
    teamList.forEach((teamMate: ITeamList) => {
      filterSelected.personalStatus.forEach((selected: string) => {
        switch (selected) {
          case 'NS':
            if (teamMate.personalStatus === 'No Status') FL.push(teamMate);
            break;

          case 'CC':
            if (teamMate.personalStatus === 'Confirmed Case') FL.push(teamMate);
            break;

          case 'SC':
            if (teamMate.personalStatus === 'Suspected Case') FL.push(teamMate);
            break;

          case 'LOA':
            if (teamMate.personalStatus === 'Leave of Absence')
              FL.push(teamMate);
            break;

          case 'SHN':
            if (teamMate.personalStatus === 'Stay-Home Notice')
              FL.push(teamMate);
            break;

          case 'EPM':
            if (teamMate.personalStatus === 'Extra Precautionary Measure')
              FL.push(teamMate);
            break;
        }
      });
    });
    return FL;
  };

  return (
    <Grid className={classes.root}>
      <Filter />
      {loading ? (
        <Grid className={classes.loading}>
          <CircularProgress />
        </Grid>
      ) : (
        <TeamTable teamList={filteredTeamList} />
      )}
    </Grid>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    padding: '20px 3%',
  },
  titleWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  loading: {
    height: 400,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

// eslint-disable-next-line
const teamListData = [
  {
    associateId: '1234563',
    first_name: 'John',
    last_name: 'Tan',
    latest_date: '20 March 2020',
    department: 'CDE',
    wfh: 'Yes',
    personalStatus: 'No Status',
    travelStatus: 'No Travel',
    accountName: 'CDE',
  },
  {
    associateId: '1465464',
    first_name: 'Elis',
    last_name: 'Chua',
    latest_date: '20 March 2020',
    department: 'CDE',
    wfh: 'No',
    personalStatus: 'Confirmed Case',
    travelStatus: 'No Travel',
    accountName: 'CDE',
  },
  {
    associateId: '1874834',
    first_name: 'dsd',
    last_name: 'Tan',
    latest_date: '20 March 2020',
    department: 'CDE',
    wfh: 'Yes',
    personalStatus: 'Suspected Case',
    travelStatus: 'No Travel',
    accountName: 'CDE',
  },
  {
    associateId: '1255443',
    first_name: 'ahdkeiu',
    last_name: 'Tan',
    latest_date: '20 March 2020',
    department: 'CDE',
    wfh: 'Yes',
    personalStatus: 'Stay-Home Notice',
    travelStatus: 'No Travel',
    accountName: 'CDE',
  },
  {
    associateId: '1288665',
    first_name: 'sdfs',
    last_name: 'Tan',
    latest_date: '20 March 2020',
    department: 'CDE',
    wfh: 'Yes',
    personalStatus: 'Leave of Absence',
    travelStatus: 'No Travel',
    accountName: 'CDE',
  },
  {
    associateId: '1657455',
    first_name: 'Jojojojoo',
    last_name: 'Tan',
    latest_date: '20 March 2020',
    department: 'CDE',
    wfh: 'No',
    personalStatus: 'Extra Precautionary Measure',
    travelStatus: 'No Travel',
    accountName: 'CDE',
  },
  {
    associateId: '1887733',
    first_name: 'Darce',
    last_name: 'Tan',
    latest_date: '20 March 2020',
    department: 'CDE',
    wfh: 'Yes',
    personalStatus: 'No Status',
    travelStatus: 'No Travel',
    accountName: 'CDE',
  },
];
