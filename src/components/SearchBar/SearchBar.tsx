import {
  FormControl,
  Grid,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../../actions/';
import * as SearchResultActions from '../../actions/searchBar';
import { RootState } from '../../reducers';

export function SearchBar() {
  const classes = useStyles();
  const [searchBy, setSearchBy] = useState<string>('associateId');

  const searchResultActions = useActions(SearchResultActions);

  const associateDetails = useSelector(
    (state: RootState) => state.associateDetails
  );
  const searchInput = useSelector((state: RootState) => state.searchInput);

  const country = useSelector((state: RootState) => state.searchCountry);

  React.useEffect(() => {
    searchResultActions.setSearchCountry(associateDetails.countryCode);
    // eslint-disable-next-line
  }, []);

  const startSearch = (value: string) => {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/teams/${associateDetails.associateId}/latest-details?${searchBy}=${value}&countryCode=${country}`,
      {
        method: 'get',
        headers: new Headers({
          'x-api-key': 'VpGpMvlvBN5KjnaL6ZPm44LR5vsNq4CiaCQRNPNF',
        }),
      }
    )
      .then((response: any) => response.json())
      .then((json: any) => {
        searchResultActions.setSearchResult(json.resources);
      });
  };

  const searchByText = (searchBy: string) => {
    switch (searchBy) {
      case 'employeeId':
        return 'employee ID';

      case 'employeeName':
        return 'employee name';

      case 'accountName':
        return 'account name';

      default:
        return '';
    }
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<{ value: string }>
  ) => {
    searchResultActions.setSearchInput(event.target.value);
    if (event.target.value.length > 2) {
      startSearch(event.target.value);
    } else if (event.target.value.length < 3) {
      resetSearch();
    }
  };

  const handleSearchByChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSearchBy(event.target.value as string);
    resetSearch();
  };

  const resetSearch = () => {
    searchResultActions.setSearchResult([]);
  };

  const handleCountryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    searchResultActions.setSearchCountry(event.target.value);
  };

  return (
    <Grid className={classes.wrapper}>
      <Paper elevation={3} className={classes.searchBar}>
        <FormControl className={classes.searchBy}>
          <Select value={searchBy} onChange={handleSearchByChange}>
            <MenuItem value="associateId">Employee ID</MenuItem>
            <MenuItem value="associateName">Employee Name</MenuItem>
            <MenuItem value="accountName">Account Name</MenuItem>
          </Select>
        </FormControl>
        <form autoComplete="off">
          <InputBase
            placeholder={'Search by ' + searchByText(searchBy)}
            className={classes.textBox}
            onChange={handleSearchInputChange}
            type={searchBy === 'employeeId' ? 'Number' : 'Text'}
            value={searchInput}
          />
        </form>
      </Paper>
      {associateDetails.accessType === 'hr' && (
        <FormControl className={classes.country}>
          <InputLabel>Country</InputLabel>
          <Select
            value={country}
            onChange={handleCountryChange}
            label="Country"
          >
            <MenuItem value="AU">Australia</MenuItem>
            <MenuItem value="CN">China</MenuItem>
            <MenuItem value="HK">Hong Kong SAR</MenuItem>
            <MenuItem value="IN">India</MenuItem>
            <MenuItem value="JP">Japan</MenuItem>
            <MenuItem value="MY">Malaysia</MenuItem>
            <MenuItem value="NZ">New Zealand</MenuItem>
            <MenuItem value="PH">Philippines</MenuItem>
            <MenuItem value="SG">Singapore</MenuItem>
            <MenuItem value="TH">Thailand</MenuItem>
          </Select>
        </FormControl>
      )}
    </Grid>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
  },
  searchBar: {
    display: 'flex',
    padding: '5px',
    height: 60,
    alignItems: 'center',
  },
  textBox: {
    width: 350,
    marginLeft: 15,
  },
  searchBy: {
    width: 150,
    margin: 10,
  },
  icon: {
    marginRight: 3,
  },
  searchResult: {
    display: 'flex',
    justifyContent: 'center',
    margin: '10px 0',
  },
  country: {
    marginLeft: 30,
    width: 120,
    // backgroundColor: 'white',
  },
}));
