import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { ITeamList } from '../../model';

interface Props {
  open: boolean;
  onClose: () => void;
  selectedCC: ITeamList;
}

export function AddCCModal(props: Props) {
  const { open, onClose, selectedCC } = props;
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  const add = () => {
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle className={classes.title}>
        Please fill up the form to add a person who has been in close contact
        with {selectedCC.fullName}
      </DialogTitle>
      <DialogContent dividers>
        <Grid className={classes.row}>
          <Typography className={classes.text}>Employee ID</Typography>
          <TextField
            required
            placeholder="Employee's ID"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid className={classes.row}>
          <Typography className={classes.text}>Employee Name</Typography>
          <TextField
            required
            placeholder="Employee's Name"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid className={classes.row}>
          <Typography className={classes.text}>Phone Number</Typography>
          <TextField
            required
            placeholder="Employee's Phone Number"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid className={classes.row}>
          <Typography className={classes.text}>Email</Typography>
          <TextField
            required
            placeholder="Employee's Email"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid className={classes.buttonWrapper}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={add}
          >
            Add
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    margin: '0px 20px',
  },
  row: {
    margin: '10px 20px 40px 20px',
  },
  text: {
    fontSize: 18,
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row-reverse',
    margin: '0px 20px 20px 20px',
  },
  button: {
    backgroundColor: '#2196f3',
    width: 100,
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
});
