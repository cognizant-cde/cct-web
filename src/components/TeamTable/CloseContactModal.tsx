import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { ICloseContactPersonal, ITeamList } from '../../model';
import { AddCCModal } from './AddCCModal';
import { CCDetailsCard } from './CCDetailsCard';

interface Props {
  open: boolean;
  onClose: () => void;
  selectedCC: ITeamList;
  closeContactList: ICloseContactPersonal[];
  loading: boolean;
}

export function CloseContactModal(props: Props) {
  const { open, onClose, selectedCC, closeContactList, loading } = props;
  const classes = useStyles();
  const [openAddCC, setOpenAddCC] = React.useState(false);

  const handleClose = () => {
    onClose();
  };

  const addCC = () => {
    setOpenAddCC(true);
  };

  const handleCloseAddCC = () => {
    setOpenAddCC(false);
  };

  return (
    <Grid>
      <AddCCModal
        open={openAddCC}
        onClose={handleCloseAddCC}
        selectedCC={selectedCC}
      />
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle className={classes.titleWrapper}>
          <Typography className={classes.title}>
            {'People who came into close contact with ' + selectedCC.fullName}
          </Typography>
          {/*<Button*/}
          {/*  variant="contained"*/}
          {/*  color="primary"*/}
          {/*  className={classes.button}*/}
          {/*  onClick={addCC}*/}
          {/*  disabled={true}*/}
          {/*>*/}
          {/*  Add a close contacted person*/}
          {/*</Button>*/}
        </DialogTitle>
        <DialogContent dividers>
          <Grid className={classes.cards}>
            {loading ? (
              <CircularProgress />
            ) : (
              closeContactList.map(
                (employee: ICloseContactPersonal, i: number) => {
                  return <CCDetailsCard key={i} employee={employee} />;
                }
              )
            )}
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}

const useStyles = makeStyles({
  root: {},
  titleWrapper: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
  },
  button: {
    backgroundColor: '#2196f3',
    marginTop: 10,
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
  cards: {
    margin: 20,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    maxHeight: 600,
  },
});

// eslint-disable-next-line
const mockCC = [
  {
    associateId: 1234563,
    firstName: 'John Tan',
    lastName: 'asd',
    phoneNumber: '+65 9874 6572',
    email: 'abc@jod.com',
  },
  {
    associateId: 4928373,
    firstName: 'kasdjfk aieurieurie',
    lastName: 'asd',
    phoneNumber: '+65 8474 3565',
    email: 'abasdfasdfc@jeeee.com',
  },
  {
    associateId: 7846573,
    firstName: 'Jadf def',
    lastName: 'asd',
    phoneNumber: '+65 9873 5555',
    email: 'ab3333c@j55tt.com',
  },
  {
    associateId: 2094375,
    firstName: 'anc tttt',
    lastName: 'asd',
    phoneNumber: '+65 9834 2323',
    email: 'abc64565gfgee@juhy.com',
  },
  {
    associateId: 2034545,
    firstName: 'anc tttt',
    lastName: 'asd',
    phoneNumber: '+65 9834 2323',
    email: 'abc64565gfgee@juhy.com',
  },
  {
    associateId: 2022225,
    firstName: 'anc tttt',
    lastName: 'asd',
    phoneNumber: '+65 9834 2323',
    email: 'abc64565gfgee@juhy.com',
  },
  {
    associateId: 2094225,
    firstName: 'anc tttt',
    lastName: 'asd',
    phoneNumber: '+65 9834 2323',
    email: 'abc64565gfgee@juhy.com',
  },
  {
    associateId: 2456375,
    firstName: 'anc tttt',
    lastName: 'asd',
    phoneNumber: '+65 9834 2323',
    email: 'abc64565gfgee@juhy.com',
  },
  {
    associateId: 2065475,
    firstName: 'anc tttt',
    lastName: 'asd',
    phoneNumber: '+65 9834 2323',
    email: 'abc64565gfgee@juhy.com',
  },
];
