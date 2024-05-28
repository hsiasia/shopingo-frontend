import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBookmark, addJoinTicket } from "../redux/action";
import "react-loading-skeleton/dist/skeleton.css";
// import MUI component
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Chip from '@mui/material/Chip';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardActions from '@mui/material/CardActions';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useLanguage } from '../languageContext';

const apiUrl = process.env.REACT_APP_API_URL;
const defaultImageUrl = "/assets/ticketDefaultImage.png";

const labelStyle = {
  backgroundColor: '#9EC5FF',
  color: 'white',
  textAlign: 'center',
  borderRadius: '10px',
  margin: '5px',
  fontSize: '16px',
  height: '25px',
  width: '110px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const contentStyle = {
  backgroundColor: 'white',
  textAlign: 'left',
  borderRadius: '10px',
  margin: '5px',
  fontSize: '16px',
  height: '25px'
};

// 處理展開細節
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  display: expand ? 'none' : 'block', // 如果展開，則隱藏
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Ticket = ({ticket, defaultExpanded}) => {
  const dispatch = useDispatch();
  const addbookmark = (ticket) => {
    dispatch(addBookmark(ticket))
    fetch(`${apiUrl}/api/saveEvent/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: ticket.id,
        user: localStorage.getItem("user_id"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const addjointicket = (ticket) => {
    dispatch(addJoinTicket(ticket));
    // input: event_id, user_id
    fetch(`${apiUrl}/api/eventInfo/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: ticket.id,
        user: localStorage.getItem("user_id"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
    setOpen(false);
  }

  // 處理展開
  const [expanded, setExpanded] = React.useState(defaultExpanded);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // 計算當前時間與活動差距
  const eventDate = new Date(ticket.event_date);
  const currentDate = new Date();
  const diffInMs = eventDate - currentDate;
  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

  // 將日期轉換成使用者易懂的方式
  const formattedEventDate = `${eventDate.getFullYear()} 年 ${eventDate.getMonth() + 1} 月 ${eventDate.getDate()} 日 ${eventDate.getHours()}:${eventDate.getMinutes() < 10 ? '0' : ''}${eventDate.getMinutes()}`;

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { translate } = useLanguage();

  const [creatorInfo,setCreatorInfo] = React.useState({});
  function FetchUserInfo (ID) {
    fetch(`${apiUrl}/api/user?user_id=${ID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }
      return response.json();
    })
    .then(data => {
      console.log('User Info:', data.data);
      if (data.data){
        setCreatorInfo(data.data)
      }
    })
    .catch(error => {
      console.error('Error fetching user info:', error);
    });
  };
  FetchUserInfo(ticket.creator);

  return (
    <Box sx={{display: 'flex', bgcolor: 'white', justifyContent: 'center'}}>
      <Card sx={{margin: '8px', width: '800px'}}>
        <CardHeader
          title={`${days} ${translate('day')} ${hours} ${translate('hour')} ${minutes} ${translate('min')} ${translate('Before the Event Starts')}`}
          sx={{
            bgcolor: '#FF9292',
            color: 'white', 
            fontSize: '16px',
            textAlign: 'center' // 新增居中對齐
          }}
        />
        <CardContent container>
          <Grid container spacing={2}>
            <Grid container item xs={10} alignItems="center">
              <Grid item xs={1} sx={{display: 'flex', justifyContent: 'center'}}>
                <Avatar alt="User Avatar" src={creatorInfo.profile_pic} />
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h6">{creatorInfo.name}</Typography>
                <Box sx={{display: 'flex', bgcolor: 'white', borderRadius: '10px', alignItems: 'center'}}>
                  <Rating value={creatorInfo.score} readOnly size="small" precision={0.5}></Rating>
                  <Typography variant="h7">{`(${creatorInfo.score_amount})`}</Typography>
                </Box>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="h5">{ticket.event_name}</Typography>
                <Typography variant="h7" color="gray">{ticket.company_name}</Typography>
              </Grid>
            </Grid>
            <Grid container item xs={2}>
              <Grid item xs={6}>
                <IconButton>
                  <AddCircleIcon onClick={handleClickOpen} sx={{width: 50, height: 50, color: "#FF9292"}}/>
                </IconButton>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>{translate('join')}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                    {translate('askToJoin')}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <IconButton onClick={handleClose}>{translate('cancel')}</IconButton>
                    <IconButton onClick={() => addjointicket(ticket)}>{translate('join')}</IconButton>
                  </DialogActions>
                </Dialog>
              </Grid>
              <Grid item xs={6}>
                <IconButton>
                  <BookmarkIcon onClick={() => addbookmark(ticket)} sx={{width: 50, height: 50, color: "#BDBDBD"}}/>
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
            <CardActions disableSpacing>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                sx={{fontSize: '16px'}}
              >
                {translate('showMore')}
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
          </Grid>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
            <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
              <img src={ticket.images.length > 0 ? ticket.images[0] : defaultImageUrl} height="300px" alt="Event" />
            </Grid>
              {/* map 問題待確認 */}
              {/* <Grid item xs={12}>
                {ticket.hashtag.map((tag, index) => (
                  <Chip key={index} label={tag} variant="outlined" sx={chipStyle} />
                ))}
              </Grid> */}
              <Grid item xs={12} sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {ticket.hashtag && Array.isArray(ticket.hashtag) && ticket.hashtag.map((tag, index) => (
                  <Typography key={index} variant="h5" sx={labelStyle}>{tag}</Typography>
                ))}
              </Grid>
              <Grid container sx={{alignItems: 'center'}}>
                <Grid item xs={2}>
                  <Typography variant="h5" sx={labelStyle}>{translate('location')}</Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="h5" sx={contentStyle}>{ticket.location}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="h5" sx={labelStyle}>{translate('datetime')}</Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="h5" sx={contentStyle}>{formattedEventDate}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="h5" sx={labelStyle}>{translate('scale')}</Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="h5" sx={contentStyle}>{ticket.scale}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="h5" sx={labelStyle}>{translate('budget')}</Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="h5" sx={contentStyle}>{ticket.budget}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="h5" sx={labelStyle}>{translate('description')}</Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="h5" sx={contentStyle}>{ticket.detail}</Typography>
                </Grid>
                {ticket.distance && (
                  <>
                    <Grid item xs={2}>
                      <Typography variant="h5" sx={labelStyle}>{translate('distance')}</Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <Typography variant="h5" sx={contentStyle}>walk {ticket.distance.walk.w_time} ({ticket.distance.walk.w_dist}) drive {ticket.distance.drive.d_time} ({ticket.distance.drive.d_dist})</Typography>
                    </Grid>
                  </>
                )}
              </Grid>
            </CardContent>
          </Collapse>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Ticket;
