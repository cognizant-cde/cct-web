import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../../actions';
import * as PrivacyPolicyActions from '../../actions/PrivacyPolicy';
import { history } from '../../configureStore';
import { RootState } from '../../reducers';

export default function PrivacyPolicyDialogue() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const [checked, setChecked] = React.useState(false);
  const [agree, setAgree] = React.useState(false);

  const privacyPolicyActions = useActions(PrivacyPolicyActions);

  const privacyPolicy = useSelector((state: RootState) => state.privacyPolicy);

  useEffect(() => {
    if (privacyPolicy === 'Agree') {
      setOpen(false);
    }
  });

  const handleAgree = () => {
    if (checked === false) {
      alert('Please accept the terms and conditions.');
    } else {
      setAgree(true);
      // pass in API here to update!
      privacyPolicyActions.setPrivacyPolicy('Agree');
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    localStorage.clear();
    history.push('/');
  };

  const handleChange = (event: any) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Privacy Notice'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <span>
              Cognizant Technology Solutions Corporation and its affiliated
              companies are firmly committed to protecting your privacy. We have
              the duty to ensure that you have the right to understand what we
              do with the personal information we collect when you use this
              application (Cognizant Contact Tracer). In the midst of this
              Covid-19 pandemic this year, this application has been curated to
              provide a more seamless method to enable daily tracking of our
              employees’ health status to ensure of their safety.
            </span>
            <br />
            <span>
              The following sections may require you to share with us your
              personal details such as:
              <br />
              1. Location
              <br />
              2. Health status
              <br />
              3. Contact List
            </span>
            <br />
            <span>
              All supplemental notices should be read together with this Privacy
              Notice.
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container className={classes.actionsContainer}>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  checked={checked}
                  onChange={handleChange}
                  color='default'
                />
              }
              label='I accept the terms and conditions'
            />
            <div className='buttonsContainer'>
              <Button onClick={handleAgree} color='primary' autoFocus>
                Agree
              </Button>
            </div>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '0px 20px',
  },
}));
