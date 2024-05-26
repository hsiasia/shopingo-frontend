import { Navbar, Main, Ticket, Footer } from "../components";

import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { TroubleshootRounded } from "@mui/icons-material";
import { useLanguage } from '../languageContext';

const apiUrl = process.env.REACT_APP_API_URL;

const HomeShowAllTicket = () => {
  const { translate } = useLanguage();
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  useEffect(() => {
    // 取得使用者位置
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        // 將位置資訊存儲到 localStorage 中
        localStorage.setItem('latitude', latitude);
        localStorage.setItem('longitude', longitude);
      });
    };
    getLocation();

    const getTickets = async () => {
      setLoading(true);
      
      const response = await fetch(`${apiUrl}/api/event`);
      if (componentMounted) {
        const responseData = await response.json();
        setData(responseData.data);
        setFilter(responseData.data);
        setLoading(false);
        console.log(responseData.data[0].hashtag);
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
  const [search, setSearch] = useState('');
  const [value, setValue] = React.useState(999);
  const filterTicket = (cat) => {
    if (data.length > 0) {
        const updatedList = data.filter((item) => {
        const lowercaseCat = cat.toLowerCase();
        const withinBudget = item.budget <= value;
        return (
          (item.hashtag.some(tag => typeof tag === 'string' && tag.toLowerCase().includes(lowercaseCat)) ||
          item.event_name.toLowerCase().includes(lowercaseCat))
          && withinBudget
        );
      });
      setFilter(updatedList);
    }
  };

  const handleReorderLocation = async () => {
    const latitude = localStorage.getItem('latitude');
    const longitude = localStorage.getItem('longitude');

    if (!latitude || !longitude) {
      alert('Location data is not available. Please enable location services.');
      return;
    }

    const userLocation = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };

    const requestBody = {
      UserLocation: userLocation,
    };

    try {
      const response = await fetch(`${apiUrl}/api/map/GetDistance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      setFilter(responseData.data); // 更新過濾後的資料狀態
      console.log('API response:', responseData);
      // Handle the API response as needed
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const ShowTickets = () => {
    const handleSliderChange = (event, newValue) => {
      setValue(newValue);
      filterTicket(search);
    };
    const handleInputChange = (event) => {
      setValue(event.target.value === '' ? 0 : Number(event.target.value));
      filterTicket(search);
    };
    const handleBlur = () => {
      if (value < 0) {
        setValue(0);
      } else if (value > 20) {
        setValue(20);
      }
    };
    return (
      <>
    <div className=" text-center">
        <TextField id="standard-basic" variant="standard" placeholder="Search"  style={{ width: '250px' }}
          value={search}
          inputProps={{ 'aria-label': 'search', inputMode: 'text' }}
          autoFocus
          onChange={(e) => {
            setSearch(e.target.value);
            filterTicket(e.target.value);
          }}
        />
      </div>
      <br />
      <Box sx={{ width: 450, marginTop: 5 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography>{translate('budget')}</Typography>
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            max={999}
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            onBlur={handleBlur}
            onChange={handleInputChange}
            inputProps={{
              step: 10,
              min: 0,
              max: 30,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
        <div className="buttons text-center py-5">
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => setFilter(data)}>{translate('All Events')}</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterTicket("coffee")}>{translate('Coffee')}</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterTicket("tea")}>{translate('Tea')}</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterTicket("dessert")}>{translate('Dessert')}</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterTicket("BOGOF")}>{translate('BOGOF')}</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={handleReorderLocation}>{translate('searchByLocation')}</button>

        </div>
        {filter.map((ticket) => {
          return (
            <Ticket ticket={ticket}/>
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
            <h2 className="display-5 text-center">{translate('All Events')}</h2>
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

function Home() {
  return (
    <>
      <Navbar />
      <Main />
      <HomeShowAllTicket />
      <Footer />
    </>
  )
}

export default Home