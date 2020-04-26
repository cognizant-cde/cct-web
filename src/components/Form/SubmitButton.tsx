import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';

export interface SubmitButtonProps {
  onClick: any;
  disable: boolean;
}

/*
Button component with the necessary colors 
*/
// eslint-disable-next-line
const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText('#ffd54f'),
    backgroundColor: '#ffd54f',
    '&:hover': {
      backgroundColor: '#ffecb3',
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: 10,
    marginLeft: 70,
    marginBottom: 10,
    width: 200,
  },
}));

const SubmitButton: React.SFC<SubmitButtonProps> = ({ onClick, disable }) => {
  const classes = useStyles();
  return (
    <div>
      <Button
        onClick={onClick}
        variant="contained"
        className={classes.margin}
        disabled={disable}
      >
        Submit
      </Button>
    </div>
  );
};

export default SubmitButton;
