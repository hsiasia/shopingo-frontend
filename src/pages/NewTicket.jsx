import React from "react";
import { Footer, Navbar } from "../components";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';


const NewTicket = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [peopleNumNeeded, setPeopleNumNeeded] = React.useState('');
  const [hashtag1, setHashtag1] = React.useState('');
  const [hashtag2, setHashtag2] = React.useState('');

  // handle date
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedTime, setSelectedTime] = React.useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // 獲取當前時間
    const currentDateTime = new Date().toISOString();

    // 獲取使用者輸入時間
    const datePart = dayjs(selectedDate).format('YYYY-MM-DD');
    const timePart = dayjs(selectedTime).format('HH:mm:ss.SSS');
    const combinedDateTime = `${datePart}T${timePart}Z`;

    const formData = {
      "creator": "1",
      "event_name": event.target.eventName.value,
      "company_name": event.target.companyName.value,
      "hashtag": [hashtag1, hashtag2],
      "location": event.target.location.value,
      "event_date": combinedDateTime,
      "scale": peopleNumNeeded,
      "budget": event.target.amount.value,
      "detail": event.target.detail.value,
      "create_datetime": currentDateTime,
      "update_datetime": currentDateTime,
      "delete_datetime": null,
      "score": 0
    };

    fetch(`${apiUrl}/api/event/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Handle API response as needed
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleChangePeopleNum = (event) => {
    setPeopleNumNeeded(event.target.value);
  };
  const handleChangeHashtag1 = (event) => {
    setHashtag1(event.target.value);
  }
  const handleChangeHashtag2 = (event) => {
    setHashtag2(event.target.value);
  }
  
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Add A New Ticket</h1>
        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div class="form my-3">
                <label for="Name">Event Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="eventName"
                  placeholder="Enter event name"
                />
              </div>
              <div class="form my-3">
                <label for="Name">Date & Time</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker value={selectedDate} label="Choose date" onChange={handleDateChange}/>
                  </DemoContainer>
                  <DemoContainer components={['TimePicker']}>
                    <TimePicker value={selectedTime} label="Choose time" onChange={handleTimeChange}/>
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div class="form my-3">
                <label for="Name">Brand Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="companyName"
                  placeholder="Enter brand name"
                />
              </div>
              <div class="form my-3">
                <label for="Name">Location</label>
                <input
                  type="text"
                  class="form-control"
                  id="location"
                  placeholder="Enter location"
                />
              </div>
              <div class="form my-3">
                <label for="Name">People Number Needed</label>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">People Needed</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={peopleNumNeeded}
                        onChange={handleChangePeopleNum}
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
              </div>
              <div class="form my-3">
                  <label for="Name">People Number Needed</label>
                  <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                    <OutlinedInput
                      id="amount"
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      label="Amount"
                    />
                  </FormControl>
              </div>
              <div class="form my-3">
                <label for="Name">Add Photo</label>
                <br/>
                <Button variant="outlined">Choose Photo</Button>
              </div>
              <div class="form my-3">
                <label for="Name">Choose Hashtag</label>
                <br/>
                <FormControl sx={{ m: 1, minWidth: 192 }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={hashtag1}
                  onChange={handleChangeHashtag1}
                >
                  <MenuItem value={"Coffee"}>Coffee</MenuItem>
                  <MenuItem value={"Tea"}>Tea</MenuItem>
                  <MenuItem value={"Pizza"}>Pizza</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 192 }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={hashtag2}
                  onChange={handleChangeHashtag2}
                >
                  <MenuItem value={"BOGOF"}>BOGOF</MenuItem>
                  <MenuItem value={"Discount"}>Discount</MenuItem>
                </Select>
              </FormControl>
              </div>
              <div class="form my-3">
                <label for="Name">Description</label>
                <br/>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <TextField
                  id="detail"
                  placeholder="Enter description"
                  multiline
                  rows={4}
                />
                </FormControl>
              </div>
              <div className="text-center">
                <button
                  class="my-2 px-4 mx-auto btn btn-dark"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewTicket;
