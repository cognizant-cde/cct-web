import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';

export interface DailyUpdatesTableProps {
  dailyUpdates: any;
}

export const DailyUpdatesTable = ({ dailyUpdates }: DailyUpdatesTableProps) => {
  const classes = useStyles();

  function highlight(personalStatus: string) {
    switch (personalStatus) {
      case 'Confirmed Case':
        return classes.red;

      case 'Suspected Case':
        return classes.orange;

      case 'SHN':
        return classes.green;

      case 'LOA':
        return classes.blue;

      case 'Extra Precautionary Measure':
        return classes.purple;

      default:
        return '';
    }
  }

  return (
    <Paper elevation={3}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.tableHead}>
            <TableCell>Date</TableCell>
            <TableCell>Personal Status</TableCell>
            <TableCell>Leave Type</TableCell>
            <TableCell>Work From Home</TableCell>
            <TableCell>Work Location</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>TravelStatus</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dailyUpdates.map((dailyUpdate: any, index: number) => {
            return (
              <TableRow
                key={index}
                className={highlight(dailyUpdate.personalStatus)}
              >
                <TableCell>{dailyUpdate.date || '-'}</TableCell>
                <TableCell>{dailyUpdate.personalStatus || '-'}</TableCell>
                <TableCell>{dailyUpdate.leaveType || '-'}</TableCell>
                <TableCell>{dailyUpdate.wfh || '-'}</TableCell>
                <TableCell>{dailyUpdate.address || '-'}</TableCell>
                <TableCell>{dailyUpdate.name || '-'}</TableCell>
                <TableCell>{dailyUpdate.travelStatus || '-'}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {dailyUpdates.length < 1 && (
        <Typography variant="h6" className={classes.notFound}>
          There are no previous records, please fill up and submit the daily
          update form.
        </Typography>
      )}
    </Paper>
  );
};

const useStyles = makeStyles({
  table: {
    width: '100%',
    minWidth: 900,
  },
  tableHead: {
    background: 'aliceblue',
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
  notFound: {
    padding: 50,
    textAlign: 'center',
  },
});
