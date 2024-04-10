import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addBookmark } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";

// Shawn import MUI component
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { palette } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Collapse from '@mui/material/Collapse';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// Shawn add
const labelStyle = {
  backgroundColor: '#87CEFA',
  textAlign: 'center',
  borderRadius: '10px',
  margin: '3px'
};

const contentStyle = {
  backgroundColor: 'white',
  textAlign: 'left',
  borderRadius: '10px',
  margin: '3px'
};

const chipStyle = {
  fontSize: '22px',
  width: '150px',
  height: '50px',
  borderRadius: '10px',
  margin: '3px'
};

const Ticket = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  const dispatch = useDispatch();

  const addTicket = (ticket) => {
    dispatch(addBookmark(ticket))
  }

  useEffect(() => {
    const getTickets = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products/");
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    getTickets();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const filterTicket = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  }
  const ShowTickets = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => setFilter(data)}>All</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterTicket("men's clothing")}>Men's Clothing</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterTicket("women's clothing")}>
            Women's Clothing
          </button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterTicket("jewelery")}>Jewelery</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterTicket("electronics")}>Electronics</button>
        </div>

        {filter.map((ticket) => {
          return (
            <>
              {/* <div id={ticket.id} key={ticket.id} >
                <div className="card text-center h-100" key={ticket.id}>
                  <img
                    className="card-img-top p-3"
                    src={ticket.image}
                    alt="Card"
                    height={300}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {ticket.title.substring(0, 12)}...
                    </h5>
                    <p className="card-text">
                      {ticket.description.substring(0, 90)}...
                    </p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item lead">$ {ticket.price}</li> */}
                    {/* <li className="list-group-item">Dapibus ac facilisis in</li>
                      <li className="list-group-item">Vestibulum at eros</li> */}
                  {/* </ul>
                  <div className="card-body">
                    <Link to={"/ticket/" + ticket.id} className="btn btn-black m-1">
                      Join Ticket
                    </Link>
                    <button className="btn btn-dark m-1" onClick={() => addTicket(ticket)}>
                      Save to Bookmark
                    </button>
                  </div>
                </div>
              </div> */}
              {/* 以下為 Shawn 測試 MUI */}
              <Card sx={{margin: '10px', width: '1000px'}}>
                <CardHeader
                  title="3 Days 2 Hours 10 Mins Before the Event Starts"
                  sx={{bgcolor: '#FF9292'}}
                />
                <CardContent container>
                  <Grid container spacing={2}>
                    <Grid container item xs={8}>
                      <Grid item xs={1}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                      </Grid>
                      <Grid item xs={5}>
                        <Typography variant="h4" xs={2}>influencer3</Typography>
                      </Grid>
                      <Grid item xs={5}>
                        <Box sx={{display: 'flex', bgcolor: '#FFE4E3', borderRadius: '10px', justifyContent: 'center'}}>
                          <Rating value={4} readOnly size="large"></Rating>
                          <Typography variant="h5">4.0</Typography>
                          <Typography variant="h5">(12)</Typography>
                        </Box>
                      </Grid>
                      <Grid item>
                        <Typography variant="h2">Cold Stone BOGOF</Typography>
                        <Typography variant="h6" color="gray">@_coldstone_official</Typography>
                      </Grid>
                    </Grid>
                    <Grid container item xs={4}>
                      <Grid item xs={6}>
                        <IconButton>
                          <AddCircleIcon sx={{width: 100, height: 100, color: "red"}}/>
                        </IconButton>
                      </Grid>
                      <Grid item xs={6}>
                        <IconButton>
                          <BookmarkIcon sx={{width: 100, height: 100, color: "#87CEFA"}}/>
                        </IconButton>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <CardMedia
                        sx={{height: '300px', objectFit: 'over'}}
                        image={ticket.image}
                        title={ticket.title}
                      />
                      <Chip label="#ColdStone" variant="outlined" sx={chipStyle}/>
                      <Chip label="#BOGOF" variant="outlined" sx={chipStyle}/>
                      <Chip label="#Ice-Cream" variant="outlined" sx={chipStyle}/>
                    </Grid>
                    <Grid container>
                      <Grid item xs={2}>
                        <Typography variant="h5" sx={labelStyle}>LOC</Typography>
                      </Grid>
                      <Grid item xs={10}>
                        <Typography variant="h5" sx={contentStyle}>smth Rd. NO.123, Taipei, Taiwan</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant="h5" sx={labelStyle}>DATE</Typography>
                      </Grid>
                      <Grid item xs={10}>
                        <Typography variant="h5" sx={contentStyle}>4:00 PM, April 1st, 2024</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant="h5" sx={labelStyle}>SCALE</Typography>
                      </Grid>
                      <Grid item xs={10}>
                        <Typography variant="h5" sx={contentStyle}>2~4</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant="h5" sx={labelStyle}>BUDGET</Typography>
                      </Grid>
                      <Grid item xs={10}>
                        <Typography variant="h5" sx={contentStyle}>100 NTD</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant="h5" sx={labelStyle}>DETAIL</Typography>
                      </Grid>
                      <Grid item xs={10}>
                        <Typography variant="h5" sx={contentStyle}>Buy one get one free</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </>
          );
        })}
      </>
    );
  };
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">All Tickets</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowTickets />}
        </div>
      </div>
    </>
  );
};

export default Ticket;
