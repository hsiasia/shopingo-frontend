import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addBookmark, addJoinTicket } from "../redux/action";

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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardActions from '@mui/material/CardActions';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// Shawn add
const labelStyle = {
  backgroundColor: '#9EC5FF',
  color: 'white',
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

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Ticket = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  // shawn
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const dispatch = useDispatch();

  const addbookmark = (ticket) => {
    dispatch(addBookmark(ticket))
  }

  const addjointicket = (ticket) => {
    dispatch(addJoinTicket(ticket))
  }

  useEffect(() => {
    const getTickets = async () => {
      setLoading(true);
      const response = await fetch("http://34.81.121.53:8000/api/event/");
      if (componentMounted) {
        const responseData = await response.json();
        setData(responseData.data);
        setFilter(responseData.data);
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
          // 計算當前時間與活動差距
          const eventDate = new Date(ticket.event_date);
          const currentDate = new Date();
          const diffInMs = eventDate - currentDate;
          const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

          const formattedEventDate = `${eventDate.getFullYear()} 年 ${eventDate.getMonth() + 1} 月 ${eventDate.getDate()} 日 ${eventDate.getHours()}:${eventDate.getMinutes() < 10 ? '0' : ''}${eventDate.getMinutes()}`;


          return (
            <>
              <Box sx={{display: 'flex', bgcolor: '#FEF1F0', justifyContent: 'center'}}>
                <Card sx={{margin: '10px', width: '1000px'}}>
                  {/* <CardHeader
                    title="3 Days 2 Hours 10 Mins Before the Event Starts"
                    sx={{bgcolor: '#FF9292'}}
                  /> */}
                  <CardHeader
                    title={`${days} Days ${hours} Hours ${minutes} Mins Before the Event Starts`}
                    sx={{bgcolor: '#FF9292'}}
                  />
                  <CardContent container>
                    <Grid container spacing={2}>
                      <Grid container item xs={8}>
                        <Grid item xs={1}>
                          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </Grid>
                        <Grid item xs={5}>
                          <Typography variant="h4" xs={2}>{ticket.creator}</Typography>
                        </Grid>
                        <Grid item xs={5}>
                          <Box sx={{display: 'flex', bgcolor: '#FFE4E3', borderRadius: '10px', justifyContent: 'center'}}>
                            <Rating value={ticket.score} readOnly size="large"></Rating>
                            <Typography variant="h5">{ticket.score}</Typography>
                            <Typography variant="h5">(12)</Typography>
                          </Box>
                        </Grid>
                        <Grid item>
                          <Typography variant="h2">{ticket.event_name}</Typography>
                          <Typography variant="h6" color="gray">{ticket.company_name}</Typography>
                        </Grid>
                      </Grid>
                      <Grid container item xs={4}>
                        <Grid item xs={6}>
                          <IconButton>
                            <AddCircleIcon onClick={() => addjointicket(ticket)} sx={{width: 100, height: 100, color: "red"}}/>
                          </IconButton>
                        </Grid>
                        <Grid item xs={6}>
                          <IconButton>
                            <BookmarkIcon onClick={() => addbookmark(ticket)} sx={{width: 100, height: 100, color: "#9EC5FF"}}/>
                          </IconButton>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <CardMedia
                          sx={{height: '300px', objectFit: 'over'}}
                          image={ticket.image}
                          title={ticket.title}
                        />
                        {ticket.hashtag.map((tag, index) => (
                          <Chip key={index} label={tag} variant="outlined" sx={chipStyle} />
                        ))}
                      </Grid>
                      <Grid container>
                        <Grid item xs={2}>
                          <Typography variant="h5" sx={labelStyle}>LOC</Typography>
                        </Grid>
                        <Grid item xs={10}>
                          <Typography variant="h5" sx={contentStyle}>{ticket.location}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography variant="h5" sx={labelStyle}>DATE</Typography>
                        </Grid>
                        <Grid item xs={10}>
                          <Typography variant="h5" sx={contentStyle}>{formattedEventDate}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography variant="h5" sx={labelStyle}>SCALE</Typography>
                        </Grid>
                        <Grid item xs={10}>
                          <Typography variant="h5" sx={contentStyle}>{ticket.scale}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography variant="h5" sx={labelStyle}>BUDGET</Typography>
                        </Grid>
                        <Grid item xs={10}>
                          <Typography variant="h5" sx={contentStyle}>{ticket.budget}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography variant="h5" sx={labelStyle}>DETAIL</Typography>
                        </Grid>
                        <Grid item xs={10}>
                          <Typography variant="h5" sx={contentStyle}>{ticket.detail}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <CardActions disableSpacing>
                      <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography paragraph>
                          Test
                        </Typography>
                      </CardContent>
                    </Collapse>
                  </CardContent>
                </Card>
              </Box>
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
