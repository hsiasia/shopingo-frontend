import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import dayjs from "dayjs";

const apiUrl = process.env.REACT_APP_API_URL;

const mockData = {
    eventName: "ColdStone Gogo",
    date: "2024-12-12",
    time: "12:00 PM",
    brandName: "ColdStone",
    location: "Taipei City",
    peopleNumNeeded: 2,
    price: 180,
    photo: "https://source.unsplash.com/random",
    hashtag1: "Coffee",
    hashtag2: "BOGO",
    description: "Come and get your ice cream!"
    };

const EditTicket = () => {
    const { id } = useParams();
    const [eventName, setEventName] = useState(mockData.eventName);
    const [date, setDate] = useState(dayjs(mockData.date));
    const [time, setTime] = useState(dayjs(mockData.time, "HH:mm A"));
    const [brandName, setBrandName] = useState(mockData.brandName);
    const [location, setLocation] = useState(mockData.location);
    const [peopleNumNeeded, setPeopleNumNeeded] = React.useState(mockData.peopleNumNeeded);
    const [price, setPrice] = React.useState(mockData.price);
    const [photo, setPhoto] = React.useState(mockData.photo);
    const [hashtag1, setHashtag1] = React.useState(mockData.hashtag1);
    const [hashtag2, setHashtag2] = React.useState(mockData.hashtag2);
    const [description, setDescription] = React.useState(mockData.description);
    const peopleOptions = [1, 2, 3];
    const hashtagOptions1 = ["Coffee", "Tea", "Pizza", "Burger", "Sushi"];
    const hashtagOptions2 = ["BOGO", "Discount", "Free", "Coupon", "Sale"];
    
    // get ticket data
    useEffect(() => {
      const getTicket = async () => {
        setLoading(true);
        //setLoading2(true);
        const response = await fetch(`${apiUrl}/api/event/?event_id=${id}`);
        const data = await response.json();
        setTicket(data.data[0]);
        console.log(data.data[0]);
        setLoading(false);
      };
      getTicket();
    }, [id]);
    const formData = {
      creator: "1",
      event_name: eventName,
      company_name: companyName,
      hashtag: [hashtag1, hashtag2],
      location: location,
      event_date: combinedDateTime,
      scale: peopleNumNeeded,
      budget: amount,
      detail: detail,
      create_datetime: currentDateTime,
      update_datetime: currentDateTime,
      delete_datetime: null,
      score: 0,
    };

    const handleChangeEventName = (event) => {
        setEventName(event.target.value);
        };
    const handleChangeDate = (newDate) => {
        setDate(newDate);
        };
    const handleChangeTime = (newTime) => {
        setTime(newTime);
        };
    const handleChangeBrandName = (event) => {
        setBrandName(event.target.value);
    };
    const handleChangeLocation = (event) => {
        setLocation(event.target.value);
    };
    const handleChangePeopleNum = (event) => {
        setPeopleNumNeeded(event.target.value);
    };
    const handleChangePrice = (event) => {
        setPrice(event.target.value);
    };
    const handleChangePhoto = (event) => {
        const file = event.target.files[0]; // Get the selected file
        const reader = new FileReader(); // Create a new file reader
        reader.onloadend = () => {
          // Set the photo state with the data URL of the selected file
          setPhoto(reader.result);
        };
    
        if (file) {
          // Read the selected file as a data URL
          reader.readAsDataURL(file);
        }
      };
    const handleChangeHashtag1 = (event) => {
        setHashtag1(event.target.value);
    }
    const handleChangeHashtag2 = (event) => {
        setHashtag2(event.target.value);
    }
    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    }

  // 在 profile那邊的 my ticket 點擊 edit 後，會跳轉到這個頁面
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Edit My Ticket</h1>
        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form>
              <div class="form my-3">
                <label for="Name">Event Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="Name"
                    value={eventName}
                    onChange={handleChangeEventName}
                />
              </div>
              <div class="form my-3">
                <label for="Name">Date & Time</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    value={date}
                    onChange={handleChangeDate}
                    renderInput={(params) => <input {...params.inputProps} />}
                    />
                  </DemoContainer>
                  <DemoContainer components={['TimePicker']}>
                    <TimePicker 
                    value={time}
                    onChange={handleChangeTime}
                    renderInput={(params) => <input {...params.inputProps} />}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div class="form my-3">
                <label for="Name">Brand Name</label>
                <input
                  type="email"
                  class="form-control"
                  id="Name"
                  value={brandName}
                  onChange={handleChangeBrandName}
                />
              </div>
              <div class="form my-3">
                <label for="Name">Location</label>
                <input
                  type="email"
                  class="form-control"
                  id="Name"
                  value={location}
                  onChange={handleChangeLocation}
                />
              </div>
              <div class="form my-3">
                <label for="Name">People Number Needed</label>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={peopleNumNeeded}
                        onChange={handleChangePeopleNum}
                      >
                        {peopleOptions.map((value) => (
                            <MenuItem key={value} value={value}>{value}</MenuItem>
                        ))}

                      </Select>
                    </FormControl>
                  </Box>
              </div>
              <div class="form my-3">
                  <label for="Name">People Number Needed</label>
                  <FormControl fullWidth sx={{ m: 1 }}>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      value={price}
                      onChange={handleChangePrice}
                    />
                  </FormControl>
              </div>
              <div class="form my-3">
                <label for="Name">Photo</label>
                <br/>
                <img src={photo} alt="photo" width="300" height="300" />
                <br/>
                <br/>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    >
                    Change Photo
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleChangePhoto}
                        /><input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleChangePhoto}
                    />
                </Button>
              </div>
              <div class="form my-3">
                <label for="Name">Hashtag</label>
                <br/>
                <FormControl sx={{ m: 1, minWidth: 192 }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={hashtag1}
                  onChange={handleChangeHashtag1}
                >
                {hashtagOptions1.map((value) => (
                        <MenuItem key={value} value={value}>{value}</MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 192 }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={hashtag2}
                  onChange={handleChangeHashtag2}
                >
                  {hashtagOptions2.map((value) => (
                        <MenuItem key={value} value={value}>{value}</MenuItem>
                    ))}
                </Select>
              </FormControl>
              </div>
              <div class="form my-3">
                <label for="Name">Description</label>
                <br/>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <TextField
                  id="outlined-multiline-static"
                  value={description}
                  onChange={handleChangeDescription}
                  multiline
                  rows={4}
                />
                </FormControl>
              </div>
              <div className="text-center">
                <Stack direction="row" spacing={2}>
                    <Button variant="contained">
                        Save
                    </Button>
                    <Button variant="outlined">
                        Cancel
                    </Button>
                </Stack>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditTicket;