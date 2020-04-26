import {
  Button,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Popover,
  Typography,
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { Theme } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useActions } from '../../actions';
import * as FilterActions from '../../actions/filter';

export function Filter() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [personalStatus, setPersonalStatus] = React.useState({
    NS: false,
    CC: false,
    SC: false,
    LOA: false,
    SHN: false,
    EPM: false,
  });
  const [travelStatus, setTravelStatus] = React.useState({
    NT: false,
    T: false,
  });
  const [MISDepartment, setMISDepartment] = React.useState({
    CDE: false,
    ABC: false,
    HR: false,
  });
  const [workLocation, setWorkLocation] = React.useState({
    WFH: false,
    CS: false,
  });
  const filterActions = useActions(FilterActions);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handlePersonalStatusChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPersonalStatus({
      ...personalStatus,
      [event.target.name]: event.target.checked,
    });
  };

  const handleTravelStatusChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTravelStatus({
      ...travelStatus,
      [event.target.name]: event.target.checked,
    });
  };

  const handleMISDepartmentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMISDepartment({
      ...MISDepartment,
      [event.target.name]: event.target.checked,
    });
  };

  const handleWorkLocationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWorkLocation({
      ...workLocation,
      [event.target.name]: event.target.checked,
    });
  };

  const clearFilters = () => {
    setPersonalStatus({
      NS: false,
      CC: false,
      SC: false,
      LOA: false,
      SHN: false,
      EPM: false,
    });
    setTravelStatus({
      NT: false,
      T: false,
    });
    setMISDepartment({
      CDE: false,
      ABC: false,
      HR: false,
    });
    setWorkLocation({
      WFH: false,
      CS: false,
    });
    filterActions.setFilter([]);
    handleClose();
  };

  const apply = () => {
    const filteredList = {
      personalStatus: filterOptions(personalStatus),
      travelStatus: filterOptions(travelStatus),
      MISDepartment: filterOptions(MISDepartment),
      workLocation: filterOptions(workLocation),
    };
    filterActions.setFilter(filteredList);
    handleClose();
  };

  function filterOptions(object: any) {
    let newObj = [];
    for (let key in object) {
      if (object[key]) newObj.push(key);
    }
    return newObj;
  }

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        className={classes.root}
        onClick={handleClick}
      >
        Filter
        <FilterListIcon className={classes.icon} />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Paper elevation={0} className={classes.paper}>
          <Grid className={classes.filterRow}>
            <Typography variant="h6" className={classes.filterTitle}>
              Personal Status
            </Typography>
            <FormGroup className={classes.filterSelection}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={personalStatus.NS}
                    onChange={handlePersonalStatusChange}
                    name="NS"
                    color="primary"
                  />
                }
                label="No Status"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={personalStatus.CC}
                    onChange={handlePersonalStatusChange}
                    name="CC"
                    color="primary"
                  />
                }
                label="Confirmed Case"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={personalStatus.SC}
                    onChange={handlePersonalStatusChange}
                    name="SC"
                    color="primary"
                  />
                }
                label="Suspected Case"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={personalStatus.LOA}
                    onChange={handlePersonalStatusChange}
                    name="LOA"
                    color="primary"
                  />
                }
                label="Leave of Absence"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={personalStatus.SHN}
                    onChange={handlePersonalStatusChange}
                    name="SHN"
                    color="primary"
                  />
                }
                label="Stay-Home Notice"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={personalStatus.EPM}
                    onChange={handlePersonalStatusChange}
                    name="EPM"
                    color="primary"
                  />
                }
                label="Extra Precautionary Measures"
              />
            </FormGroup>
          </Grid>
          <Divider />
          <Grid className={classes.filterRow}>
            <Typography variant="h6" className={classes.filterTitle}>
              Travel Status
            </Typography>
            <FormGroup className={classes.filterSelection}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={travelStatus.NT}
                    onChange={handleTravelStatusChange}
                    name="NT"
                    color="primary"
                  />
                }
                label="No Travel"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={travelStatus.T}
                    onChange={handleTravelStatusChange}
                    name="T"
                    color="primary"
                  />
                }
                label="Travel"
              />
            </FormGroup>
          </Grid>
          <Divider />
          <Grid className={classes.filterRow}>
            <Typography variant="h6" className={classes.filterTitle}>
              MIS Department
            </Typography>
            <FormGroup className={classes.filterSelection}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={MISDepartment.CDE}
                    onChange={handleMISDepartmentChange}
                    name="CDE"
                    color="primary"
                  />
                }
                label="CDE"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={MISDepartment.ABC}
                    onChange={handleMISDepartmentChange}
                    name="ABC"
                    color="primary"
                  />
                }
                label="ABC"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={MISDepartment.HR}
                    onChange={handleMISDepartmentChange}
                    name="HR"
                    color="primary"
                  />
                }
                label="HR"
              />
            </FormGroup>
          </Grid>
          <Divider />
          <Grid className={classes.filterRow}>
            <Typography variant="h6" className={classes.filterTitle}>
              Work Location
            </Typography>
            <FormGroup className={classes.filterSelection}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={workLocation.WFH}
                    onChange={handleWorkLocationChange}
                    name="WFH"
                    color="primary"
                  />
                }
                label="Work From Home"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={workLocation.CS}
                    onChange={handleWorkLocationChange}
                    name="CS"
                    color="primary"
                  />
                }
                label="Client Side"
              />
            </FormGroup>
          </Grid>
          <Divider />
          <Grid className={classes.buttonWrapper}>
            <Button className={classes.clearBtn} onClick={clearFilters}>
              Clear all filters
            </Button>
            <Grid>
              <Button className={classes.cancelBtn} onClick={handleClose}>
                Cancel
              </Button>
              <Button className={classes.applyBtn} onClick={apply}>
                Apply
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Popover>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: 20,
  },
  paper: {
    margin: 10,
  },
  icon: {
    marginLeft: 10,
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  clearBtn: {
    color: '#FC4C4C',
  },
  cancelBtn: {
    color: '#A6A6A6',
  },
  applyBtn: {
    color: '#1790FF',
  },
  filterRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 550,
    paddingTop: 10,
    paddingBottom: 10,
  },
  filterTitle: {
    marginTop: 4,
    marginLeft: 8,
  },
  filterSelection: {
    display: 'flex',
    flexDirection: 'row',
    width: 350,
  },
}));
