import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Hashids from 'hashids';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { history } from '../../configureStore';
import { ITeamList } from '../../model';
import { RootState } from '../../reducers';
import { CloseContactModal } from './CloseContactModal';

const hashids = new Hashids();

interface Props {
  teamList: teamList;
}

interface teamList extends Array<ITeamList> {}

export function TeamTable(props: Props) {
  const classes = useStyles();
  const { teamList } = props;
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [closeContactList, setCloseContactList] = React.useState([]);
  const [selectedCC, setSelectedCC] = React.useState<ITeamList>({
    employeeId: '',
    fullName: '',
    latestDate: '',
    MISDepartment: '',
    workLocation: '',
    personalStatus: '',
    travelStatus: '',
    accountName: '',
  });

  const associateDetails = useSelector(
    (state: RootState) => state.associateDetails
  );

  const handleCloseCC = () => {
    setOpen(false);
    setLoading(true);
    setCloseContactList([]);
  };

  const handleOpenCC = async (teamMate: ITeamList) => {
    setSelectedCC(teamMate);
    setOpen(true);
    const cc = await getCloseContact(teamMate);
    setCloseContactList(cc);
  };

  const getCloseContact = (teamMate: ITeamList) => {
    return fetch(
      `${process.env.REACT_APP_API_URL}/api/associates/${teamMate.employeeId}/close-contacts?managerId=${associateDetails.associateId}`,
      {
        method: 'get',
        headers: new Headers({
          'x-api-key': 'VpGpMvlvBN5KjnaL6ZPm44LR5vsNq4CiaCQRNPNF',
        }),
      }
    )
      .then((response: any) => response.json())
      .then((json: any) => {
        setLoading(false);
        return json.resources;
      });
  };

  function highlight(personalStatus: string) {
    switch (personalStatus) {
      case 'Confirmed Case':
        return classes.red;

      case 'Suspected Case':
        return classes.orange;

      case 'Stay-Home Notice':
        return classes.green;

      case 'Leave of Absence':
        return classes.blue;

      case 'Extra Precautionary Measure':
        return classes.purple;

      default:
        return '';
    }
  }

  const redirectDailyUpdate = (employeeId: string) => {
    const id = hashids.encode(employeeId);
    history.push('/dailyupdates?id=' + id);
  };

  return (
    <Grid item xs={12}>
      <CloseContactModal
        open={open}
        onClose={handleCloseCC}
        selectedCC={selectedCC}
        closeContactList={closeContactList}
        loading={loading}
      />
      <Paper elevation={3}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.tableHead}>
              <TableCell>Latest Date</TableCell>
              <TableCell>Employee ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Account Name</TableCell>
              <TableCell>Work Location</TableCell>
              <TableCell>Personal Status</TableCell>
              <TableCell>Travel Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teamList.map((teamMate: ITeamList, i: number) => {
              return (
                <TableRow
                  key={i}
                  className={
                    highlight(teamMate.personalStatus) + ' ' + classes.row
                  }
                >
                  <TableCell
                    onClick={() => redirectDailyUpdate(teamMate.employeeId)}
                  >
                    {teamMate.latestDate}
                  </TableCell>
                  <TableCell
                    onClick={() => redirectDailyUpdate(teamMate.employeeId)}
                  >
                    {teamMate.employeeId}
                  </TableCell>
                  <TableCell
                    onClick={() => redirectDailyUpdate(teamMate.employeeId)}
                  >
                    {teamMate.fullName}
                  </TableCell>
                  <TableCell
                    onClick={() => redirectDailyUpdate(teamMate.employeeId)}
                  >
                    {teamMate.MISDepartment}
                  </TableCell>
                  <TableCell
                    onClick={() => redirectDailyUpdate(teamMate.employeeId)}
                  >
                    {teamMate.accountName}
                  </TableCell>
                  <TableCell
                    onClick={() => redirectDailyUpdate(teamMate.employeeId)}
                  >
                    {teamMate.workLocation}
                  </TableCell>
                  <TableCell
                    onClick={() => redirectDailyUpdate(teamMate.employeeId)}
                  >
                    {teamMate.personalStatus}
                  </TableCell>
                  <TableCell
                    onClick={() => redirectDailyUpdate(teamMate.employeeId)}
                  >
                    {teamMate.travelStatus}
                  </TableCell>
                  <TableCell>
                    {highlight(teamMate.personalStatus) ? (
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpenCC(teamMate)}
                      >
                        Close Contact
                      </Button>
                    ) : null}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {teamList.length < 1 && (
          <Typography variant="h6" className={classes.notFound}>
            No team members found, please change search/filter values.
          </Typography>
        )}
      </Paper>
    </Grid>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    width: '100%',
    minWidth: 900,
  },
  tableHead: {
    background: 'aliceblue',
  },
  row: {
    cursor: 'pointer',
  },
  red: {
    background: '#FF6283',
  },
  orange: {
    background: '#FF9F41',
  },
  green: {
    background: '#4DBFC0',
  },
  blue: {
    background: '#37A3EB',
  },
  purple: {
    background: '#A54FFB',
  },
  button: {
    background: '#',
  },
  notFound: {
    padding: 50,
    textAlign: 'center',
  },
}));
