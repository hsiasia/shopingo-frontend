import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../components";
import { useParams, useNavigate } from "react-router-dom";
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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useLanguage } from "../languageContext";

const apiUrl = process.env.REACT_APP_API_URL;

const EditTicket = () => {
    const { translate } = useLanguage();

    // get the ticket
    const { id } = useParams();
    const [ticket, setTicket] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
      const getTicket = async () => {
        setLoading(true);
        //setLoading2(true);
        const response = await fetch(`${apiUrl}/api/event/?event_id=${id}`);
        const data = await response.json();
        setTicket(data.data[0]);
        setHashtag1(data.data[0].hashtag[0]);
        setHashtag2(data.data[0].hashtag[1]);
        // setPeopleNumNeeded(data.data[0].scale.toString());
        setPeopleNumNeeded(data.data[0].scale);
        setLoading(false);
      };
      getTicket();
    }, [id]);

    useEffect(() => {
      if (ticket && ticket.hashtag) {
        setEventName(ticket.event_name);
        setSelectedDate(dayjs(ticket.event_date));
        setSelectedTime(dayjs(ticket.event_date));
        setCompanyName(ticket.company_name);
        setLocation(ticket.location);
        // setPeopleNumNeeded(ticket.scale);
        setAmount(ticket.budget);
        setHashtag(ticket.hashtag);
        // setHashtag1(ticket.hashtag);
        // setHashtag2(ticket.hashtag);
        setDetail(ticket.detail);
        // alert(ticket.hashtag);
      }
    }, [ticket]);

    const [hashtag, setHashtag] = React.useState(ticket.hashtag);
    const [eventName, setEventName] = React.useState(ticket.event_name);
    const [companyName, setCompanyName] = React.useState(ticket.company_name);
    const [location, setLocation] = React.useState(ticket.location);
    const [peopleNumNeeded, setPeopleNumNeeded] = React.useState("");
    
    const [hashtag1, setHashtag1] = React.useState("");
    const [hashtag2, setHashtag2] = React.useState("");
    

    // handle date
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [selectedTime, setSelectedTime] = React.useState(null);
    const [signedUrl, setSignedUrl] = React.useState("");
    const [selectedfile, setFile] = React.useState("");

    const [amount, setAmount] = React.useState(ticket.budget);
    const [detail, setDetail] = React.useState(ticket.detail);

    const handleChangeEventName = (event) => {
      setEventName(event.target.value);
    };
  
    const handleChangeCompanyName = (event) => {
      setCompanyName(event.target.value);
    };

    const handleChangeLocation = (event) => {
      setLocation(event.target.value);
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
          console.log(data.data[0][1]);
          setSignedUrl(data.data[0][0]);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    const handleChangePeopleNum = (event) => {
      setPeopleNumNeeded(event.target.value);
    };

    const handleChangeHashtag1 = (event) => {
      setHashtag1(event.target.value);
    };
    const handleChangeHashtag2 = (event) => {
      setHashtag2(event.target.value);
    };

    const postFormData = (url, formData) => {
      return fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error("Error:", error);
          throw error; // 可以根據需要決定是否重新拋出錯誤
        });
    };

    const uploadImage = async (signedUrl, file) => {
      try {
        await fetch(signedUrl, {
          method: "POST",
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

    const handleSave = (event) => {
      event.preventDefault();
  
      // 獲取當前時間
      const currentDateTime = new Date().toISOString();
  
      // 獲取使用者輸入時間
      const datePart = dayjs(selectedDate).format("YYYY-MM-DD");
      const timePart = dayjs(selectedTime).format("HH:mm:ss.SSS");
      const combinedDateTime = `${datePart}T${timePart}Z`;
      console.log(location);
  
      const formData = {
        event_name: eventName,
        hashtag: [hashtag1, hashtag2],
        event_date: combinedDateTime,
        budget: amount,
        detail: detail,
      };
  
      // 送出表單資料
      postFormData(`${apiUrl}/api/event/?event_id=${id}`, formData).then((data) => {
        console.log("表單資料已送出:");
        console.log(data);
      });
  
      // 上傳圖片到雲端
      uploadImage(signedUrl, selectedfile);
  
      setOpen(false);
      navigate(`/ticket/${id}`);
    };

    const peopleOptions = [1, 2, 3];
    const hashtagOptions1 = ["coffee", "Tea", "Pizza", "Burger", "Sushi"];
    const hashtagOptions2 = ["BOGOF", "Discount", "Free", "Coupon", "Sale"];
    
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const backToTicket = () => {
      navigate("/info");
    };


  // 在 profile那邊的 my ticket 點擊 edit 後，會跳轉到這個頁面
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">{translate('edit')}</h1>
        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form>
              <div class="form my-3">
                <label for="Name">{translate('eventName')}</label>
                <input
                    type="text"
                    className="form-control"
                    id="Name"
                    value={eventName}
                    onChange={handleChangeEventName}
                />
              </div>
              <div class="form my-3">
                <label for="Name">{translate('datetime')}</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    value={selectedDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <input {...params.inputProps} />}
                    />
                  </DemoContainer>
                  <DemoContainer components={['TimePicker']}>
                    <TimePicker 
                    value={selectedTime}
                    onChange={handleTimeChange}
                    renderInput={(params) => <input {...params.inputProps} />}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div class="form my-3">
                <label for="Name">{translate('brand')}</label>
                <input
                  type="email"
                  class="form-control"
                  id="Name"
                  value={companyName}
                  onChange={handleChangeCompanyName}
                />
              </div>
              <div class="form my-3">
                <label for="Name">{translate('location')}</label>
                <input
                  type="email"
                  class="form-control"
                  id="Name"
                  value={location}
                  onChange={handleChangeLocation}
                />
              </div>
              <div class="form my-3">
                <label for="Name">{translate('scale')}</label>
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
                  <label for="Name">{translate('budget')}</label>
                  <FormControl fullWidth sx={{ m: 1 }}>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      value={amount}
                      onChange={handleChangeAmount}
                    />
                  </FormControl>
              </div>
              <div class="form my-3">
                <label for="Name">{translate('photo')}</label>
                <br/>
                {/* <img src={file} alt="photo" width="300" height="300" /> */}
                <img src={`${process.env.PUBLIC_URL}/assets/${id}.jpg`} height="300px"/>
                <br/>
                <br/>
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
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        /><input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
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
                <label for="Name">{translate('description')}</label>
                <br/>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <TextField
                  id="outlined-multiline-static"
                  value={detail}
                  onChange={handleChangeDetail}
                  multiline
                  rows={4}
                />
                </FormControl>
              </div>
              <div className="text-center">
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={handleClickOpen}>
                    {translate('saveEdit')}
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>{translate('saveEdit')}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                            {translate('askToSaveEdit')}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>{translate('cancel')}</Button>
                            <Button onClick={handleSave}>{translate('saveEdit')}</Button>
                        </DialogActions>
                    </Dialog>
                    <Button variant="outlined" onClick={backToTicket}>
                    {translate('cancel')}
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