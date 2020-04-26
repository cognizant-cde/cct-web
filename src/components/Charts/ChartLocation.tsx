import { CircularProgress, Grid } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import DonutChart from 'react-minimal-pie-chart';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';

interface legendBox {
  title: string;
  color: string;
  value: number;
}

export function ChartLocation() {
  const classes = useStyles();
  const [data, setData] = React.useState<legendBox[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const associateDetails = useSelector(
    (state: RootState) => state.associateDetails
  );
  const country = useSelector((state: RootState) => state.searchCountry);

  React.useEffect(() => {
    if (country.length > 0) {
      setLoading(true);
      fetch(
        `${process.env.REACT_APP_API_URL}/api/teams/${associateDetails.associateId}/location?countryCode=${country}`,
        {
          method: 'get',
          headers: new Headers({
            'x-api-key': 'VpGpMvlvBN5KjnaL6ZPm44LR5vsNq4CiaCQRNPNF',
          }),
        }
      )
        .then((response: any) => response.json())
        .then((json: any) => {
          setData(json.resources);
          setLoading(false);
        });
    }

    // eslint-disable-next-line
  }, [country]);

  const filteredData = data.filter((eachLocation: any) => eachLocation.value);

  return (
    <>
      {loading ? (
        <Grid className={classes.loading}>
          <CircularProgress />
        </Grid>
      ) : (
        <Grid className={classes.chartWrapper}>
          <Grid>
            <Grid
              container
              className={classes.header}
              justify="center"
              alignItems="center"
            >
              Work Location
            </Grid>
            <DonutChart
              animate={false}
              animationDuration={800}
              animationEasing="ease-out"
              cx={50}
              cy={50}
              data={filteredData}
              label
              labelPosition={80}
              labelStyle={{
                fill: '#121212',
                fontFamily: 'sans-serif',
                fontSize: '5px',
              }}
              lengthAngle={360}
              lineWidth={40}
              onClick={undefined}
              onMouseOut={undefined}
              onMouseOver={undefined}
              paddingAngle={2}
              radius={50}
              rounded={false}
              startAngle={0}
              viewBoxSize={[100, 100]}
            />
          </Grid>
          <Grid>
            <Grid
              container
              className="chartLegend"
              justify="space-between"
              alignContent="center"
              direction="row"
            >
              <Grid></Grid>
              <Grid className={classes.noOfEmployees}>No. of Employees</Grid>
            </Grid>
            <Grid container direction="column">
              {data.map((box: legendBox, i: number) => {
                return (
                  <Grid
                    key={i}
                    container
                    className="container1"
                    direction="row"
                    justify="space-between"
                  >
                    <div className={classes.container2}>
                      <div
                        className={classes.cube}
                        style={{ backgroundColor: box.color }}
                      ></div>
                      <div className={classes.cubeReference}>{box.title}</div>
                    </div>
                    <div className={classes.countReference}>{box.value}</div>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  chartWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  noOfEmployees: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
  },
  container2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cube: {
    height: 15,
    width: 15,
    marginRight: 10,
  },
  cubeReference: {
    fontSize: 18,
    minWidth: 240,
    maxWidth: 240,
  },
  countReference: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loading: {
    height: 400,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
