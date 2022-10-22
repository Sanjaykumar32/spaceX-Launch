import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";


export default function Cards() {
  const [year, setYear] = useState("");
  const [launchSuccess, setLaunchSuccess] = useState("");
  const [landSuccess, setLandSuccess] = useState("");
  const [allFilter, setAllFilter] = useState([]);

  const data = useSelector((state) => state?.spaceXdata?.spaceData);


  const fatchYearData = async () => {
    await axios
      .get(
        `https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${launchSuccess}&land_success=${landSuccess}&launch_year=${year}`
      )
      .then((res) => {
        setAllFilter(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    fatchYearData();
  }, [year]);

  const fatchlaunchData = async () => {
    await axios
      .get(
        `https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${launchSuccess}`
      )
      .then((res) => {
        setAllFilter(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    fatchlaunchData();
  }, [launchSuccess]);

  const fatchlandData = async () => {
    await axios
      .get(
        `https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${launchSuccess}&land_success=${landSuccess}`
      )
      .then((res) => {
        setAllFilter(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    fatchlandData();
  }, [landSuccess]);


  return (
    <div className="bg-color">
      <h3>SpaceX Launch Programs</h3>
      <Grid  columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={4} md={4} className="fixed">
            <Card className="card">
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  fontWeight="bold"
                >
                  Filters
                </Typography>
                <Typography textAlign="center">Launch Year</Typography>
                <Divider className="line" />
                <CardActions>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    {data.map((items) => {
                      const filters = items.map((year) => {
                        return year?.launch_year;
                      });
                      const data = [...new Set(filters)];
                      return data.map((yearAll, index) => {
                        return (
                          <Grid item xs={6}>
                            <Link to={`/${yearAll}`}>
                              <Button
                                key={index}
                                variant="contained"
                                color="success"
                                className="button"
                                onClick={() => setYear(yearAll)}
                              >
                                {yearAll}
                              </Button>
                            </Link>
                          </Grid>
                        );
                      });
                    })}
                  </Grid>
                </CardActions>
              </CardContent>
              <CardContent>
                <Typography textAlign="center">Successful Launch</Typography>
                <Divider className="line" />
                <CardActions>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="success"
                      className="button"
                      onClick={() => setLaunchSuccess("true")}
                    >
                      True
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="success"
                      className="button"
                      onClick={() => setLaunchSuccess("false")}
                    >
                      False
                    </Button>
                  </Grid>
                </CardActions>
              </CardContent>
              <CardContent>
                <Typography textAlign="center">Successful Landing</Typography>
                <Divider className="line" />
                <CardActions>
                  <Grid container>
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        color="success"
                        className="button"
                        onClick={() => setLandSuccess("true")}
                      >
                        True
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        color="success"
                        className="button"
                        onClick={() => setLandSuccess("false")}
                      >
                        False
                      </Button>
                    </Grid>
                  </Grid>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
          <div className="manu">
          {data.map((items) => {
            return (
              year == "" && launchSuccess == "" && landSuccess == ""
                ? items
                : allFilter
            ).map((details, index) => {
              return (
                <Grid item xs={6} md={8} >
                  <Card className="cardsAll" key={index}>
                    <span className="images">
                      <img src={details?.links?.mission_patch_small} />
                    </span>
                    <CardContent>
                      <Typography
                        component="div"
                        color="primary"
                        className="subText"
                      >
                        {details?.mission_name} # {details?.flight_number}
                      </Typography>
                      <Typography className="text-1" fontWeight="bold">
                        {" "}
                        Mission Ids :{" "}
                        {details?.mission_id[0] ? (
                          <span className="text-color">
                            {details?.mission_id[0]}
                          </span>
                        ) : (
                          "--"
                        )}
                      </Typography>
                      <Typography className="text-1" fontWeight="bold">
                        Launch Year :
                        <span className="text-color">
                          {" "}
                          {details?.launch_year}{" "}
                        </span>
                      </Typography>
                      <Typography className="text-1" fontWeight="bold">
                        Successful Launch :{" "}
                        <span className="text-color">
                          {" "}
                          {details?.launch_success === true
                            ? "true"
                            : "false"}{" "}
                        </span>
                      </Typography>
                      <Typography className="text-1" fontWeight="bold">
                        Successful Landing :{" "}
                        <span className="text-color">
                          {" "}
                          {details?.rocket?.first_stage?.cores[0]
                            ?.land_success === true
                            ? "true"
                            : details?.rocket?.first_stage?.cores[0]
                                ?.land_success === null
                            ? "--"
                            : "false"}{" "}
                        </span>
                      </Typography>
                    </CardContent>
                  
                  </Card>
                </Grid>
              );
            });
          })}
          </div>
        </Grid>
      <div className="footer">
        <h4>
          {" "}
          <b>Developed by :</b> <small>Sanjay kumar</small>
        </h4>
      </div>
    </div>
  );
}
