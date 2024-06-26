import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../components";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";
import { useLanguage } from '../languageContext';

const apiKey = process.env.REACT_APP_API_KEY;
const userLatitude = localStorage.getItem('latitude');
const userLongitude = localStorage.getItem('longitude');
const userId = localStorage.getItem("user_id");

const NewTicket = () => {
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [infowindow, setInfowindow] = useState(null);
  const [marker, setMarker] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [location, setLocation] = useState("");
  const [bias, setBias] = useState(true);
  const [strictBounds, setStrictBounds] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const { translate } = useLanguage();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&v=weekly&solution_channel=GMP_CCS_autocomplete_v1`;
    script.defer = true;
    script.onload = initMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initMap = () => {
    const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: parseFloat(userLatitude), lng: parseFloat(userLongitude)} || { lat: 25.0170, lng: 121.5397 },
      zoom: 15,
      mapTypeControl: false,
    });
    setMap(mapInstance);

    const autocompleteInstance = new window.google.maps.places.Autocomplete(
      document.getElementById("pac-input"),
      { fields: ["formatted_address", "geometry", "name"], strictBounds: false }
    );
    setAutocomplete(autocompleteInstance);
    autocompleteInstance.bindTo("bounds", mapInstance);

    const infowindowInstance = new window.google.maps.InfoWindow();
    setInfowindow(infowindowInstance);

    const markerInstance = new window.google.maps.Marker({
      map: mapInstance,
      anchorPoint: new window.google.maps.Point(0, -29),
    });
    setMarker(markerInstance);

    autocompleteInstance.addListener("place_changed", () => {
      infowindowInstance.close();
      markerInstance.setVisible(false);

      const place = autocompleteInstance.getPlace();

      if (!place.geometry || !place.geometry.location) {
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      if (place.geometry.viewport) {
        mapInstance.fitBounds(place.geometry.viewport);
      } else {
        mapInstance.setCenter(place.geometry.location);
        mapInstance.setZoom(17);
      }

      markerInstance.setPosition(place.geometry.location);
      // 回傳地址
      setLatitude(place.geometry.location.lat());
      setLongitude(place.geometry.location.lng());

      markerInstance.setVisible(true);
      infowindowInstance.open(mapInstance, markerInstance);

        // 結合 place.name 和 place.formatted_address
      const locationValue = `${place.name}, ${place.formatted_address}`;
      setLocation(locationValue);
    });
  };
  // 上面為 map
  const apiUrl = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();
  const currentDate = dayjs(); // 获取当前日期和时间


  const [eventName, setEventName] = React.useState("");
  const [companyName, setCompanyName] = React.useState("");
  const [peopleNumNeeded, setPeopleNumNeeded] = React.useState("");
  const [photo, setPhoto] = React.useState(null);
  const [hashtag1, setHashtag1] = React.useState("");
  const [hashtag2, setHashtag2] = React.useState("");

  // handle date
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedTime, setSelectedTime] = React.useState(null);
  const [signedUrl, setSignedUrl] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

  const [selectedfile, setFile] = React.useState("");

  const [amount, setAmount] = React.useState("");
  const [detail, setDetail] = React.useState("");

  const handleChangeEventName = (event) => {
    setEventName(event.target.value);
  };

  const handleChangeCompanyName = (event) => {
    setCompanyName(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleChangeAmount = (event) => {
    setAmount(event.target.value);
  };
  const handleChangeDetail = (event) => {
    setDetail(event.target.value);
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    const fileName = event.target.files[0].name;
    const photoformData = { blob_names: [fileName]};

    fetch(`${apiUrl}/api/google/image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(photoformData),
    })
      .then((response) => response.json())
      .then((data) => {
        setSignedUrl(data.data[0][0]);
        setImageUrl(data.data[0][1]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const postFormData = (url, formData) => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then((response) => {
      return response.json();
    })
    .then(async (data) => {
      const locationData = {
        event_id: data["data"].id,
        coords: {
          "latitude":latitude, 
          "longitude":longitude
        }
      };
      // 存經緯度
      await saveEventInfo(`${apiUrl}/api/map/SaveEventLocation`, locationData);

      const eventParticipantData = {
        event: data["data"].id,
        user: userId
      };
      // 存 event_participant
      await saveEventInfo(`${apiUrl}/api/eventInfo/`, eventParticipantData);

      const imageData = {
        event_id: data["data"].id,
        old_urls: [],
        new_urls: [imageUrl]
      };
      // 存圖片
      await saveEventInfo(`${apiUrl}/api/event/images`, imageData);

      const calendarEvent = {
        user_id: userId,
        event_id: data["data"].id,
      };

      console.log(calendarEvent);
      // 存 calendarEvent
      await saveEventInfo(`${apiUrl}/api/calendar/createCalendarEvent`, calendarEvent);
    })
    .catch((error) => {
        console.error("Error:", error);
        throw error;
    });
  };

  // 可用來 saveLocation、saveImageToDatabase 或是 createCalendarEvent
  const saveEventInfo = (url, formData) => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
        console.error("Error:", error);
        throw error; // 可以根據需要決定是否重新拋出錯誤
    });
  };

  const uploadImage = async (signedUrl, file) => {
    try {
      await fetch(signedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });
      console.log("圖片上傳成功");
    } catch (error) {
      console.error("上傳圖片時發生錯誤:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // 獲取當前時間
    const currentDateTime = new Date().toISOString();

    // 獲取使用者輸入時間
    const datePart = dayjs(selectedDate).format("YYYY-MM-DD");
    const timePart = dayjs(selectedTime).format("HH:mm:ss.SSS");
    const combinedDateTime = `${datePart}T${timePart}Z`;

    const formData = {
      creator: localStorage.getItem('user_id'),
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

    console.log(formData);

    // 上傳圖片到雲端換取網址
    uploadImage(signedUrl, selectedfile);

    // 送出表單資料
    postFormData(`${apiUrl}/api/event/`, formData);

    setOpen(false);
    navigate("/");
  };

  const handleChangePeopleNum = (event) => {
    setPeopleNumNeeded(event.target.value);
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
  };
  const handleChangeHashtag2 = (event) => {
    setHashtag2(event.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">{translate('create')}</h1>
        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form>
              <div class="form my-3">
                <label for="Name">{translate('eventName')}</label>
                <input
                  type="text"
                  class="form-control"
                  id="eventName"
                  placeholder={translate('Enter event name')}
                  onChange={handleChangeEventName}
                />
              </div>
              <div class="form my-3">
                <label for="Name">{translate('datetime')}</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      value={selectedDate}
                      label={translate('Choose date')}
                      onChange={handleDateChange}
                      minDate={currentDate} // 设置最小日期为当前日期
                    />
                  </DemoContainer>
                  <DemoContainer components={["TimePicker"]}>
                    <TimePicker
                      value={selectedTime}
                      label={translate('Choose time')}
                      onChange={handleTimeChange}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div class="form my-3">
                <label for="Name">{translate('brand')}</label>
                <input
                  type="text"
                  class="form-control"
                  id="companyName"
                  placeholder={translate('Enter brand name')}
                  onChange={handleChangeCompanyName}
                />
              </div>
              <div class="form my-3">
                <label for="Name">{translate('location')}</label>
                <br />
                <input id="pac-input" type="text" placeholder={translate('Enter location')} value={location} onChange={(e) => setLocation(e.target.value)} />
                <div id="map" style={{ height: "300px", width: "100%" }}></div>
              </div>
              <div class="form my-3">
                <label for="Name">{translate('scale')}</label>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                    {translate('scale')}
                    </InputLabel>
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
                <label for="Name">{translate('budget')}</label>
                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    {translate('budget')}
                  </InputLabel>
                  <OutlinedInput
                    id="amount"
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Amount"
                    onChange={handleChangeAmount}
                  />
                </FormControl>
              </div>
              <div class="form my-3">
                <label for="Name">{translate('upload')}</label>
                <br />
                {/* <img src={file} alt="photo" width="300" height="300" /> */}
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  {translate('upload')}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </Button>
              </div>
              <div class="form my-3">
                <label for="Name">{translate('Choose Hashtag')}</label>
                <br />
                <FormControl sx={{ m: 0, minWidth: 200, marginRight:"3%" }}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={hashtag1}
                    onChange={handleChangeHashtag1}
                  >
                    <MenuItem value={"Coffee"}>{translate('Coffee')}</MenuItem>
                    <MenuItem value={"Tea"}>{translate('Tea')}</MenuItem>
                    <MenuItem value={"Pizza"}>{translate('Dessert')}</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 0, minWidth: 200 }}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={hashtag2}
                    onChange={handleChangeHashtag2}
                  >
                    <MenuItem value={"BOGOF"}>{translate('BOGOF')}</MenuItem>
                    <MenuItem value={"Discount"}>{translate('Discount')}</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div class="form my-3">
                <label for="Name">{translate('description')}</label>
                <br />
                <FormControl fullWidth>
                  <TextField
                    id="detail"
                    placeholder={translate('description')}
                    multiline
                    rows={4}
                    onChange={handleChangeDetail}
                  />
                </FormControl>
              </div>
              <div className="text-center">
                <button
                  class="my-2 px-4 mx-auto btn btn-dark"
                  type="button"
                  onClick={handleClickOpen}
                >
                  {translate('Submit')}
                </button>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>{translate('Submit')}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                    {translate('askToSubmit')}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>{translate('cancel')}</Button>
                    <Button type="submit" onClick={handleSubmit}>
                    {translate('Submit')}
                    </Button>
                  </DialogActions>
                </Dialog>
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
