import React , { useState, useEffect } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Footer,
  Navbar,
} from "../components"; //baisc website components
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useLanguage } from "../languageContext";

const apiUrl = process.env.REACT_APP_API_URL;

const styles = {
  tableHeader: {
    border: '1px solid #dddddd',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
  },
  tableCell: {
    border: '1px solid #dddddd',
    padding: '8px',
    textAlign: 'left',
  },
}

const Info = () => {
  const { translate } = useLanguage();
  //Use these paras while working on local site
  //localStorage.setItem('user_id', "105302000994518372665");
  //localStorage.setItem('auth_token',  "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFjM2UzZTU1ODExMWM3YzdhNzVjNWI2NTEzNGQyMmY2M2VlMDA2ZDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMDQzNTE0OTgxOTkxLTUwbnJkcTZjc3QzdGVjbzNmdDJtMzZoMDZyOTBxc3E4LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTA0MzUxNDk4MTk5MS01MG5yZHE2Y3N0M3RlY28zZnQybTM2aDA2cjkwcXNxOC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwNTMwMjAwMDk5NDUxODM3MjY2NSIsImVtYWlsIjoid2VpLmx1bi5icnlhbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmJmIjoxNzE1MDA1NDg4LCJuYW1lIjoiTHVuIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0x0aFFBNVdja0FqUHhYZ0RuY2FjekstUWRrSjFQUXdzYlhyZ21iMmZBRDF3SWdoaWN2d2c9czk2LWMiLCJnaXZlbl9uYW1lIjoiTHVuIiwiaWF0IjoxNzE1MDA1Nzg4LCJleHAiOjE3MTUwMDkzODgsImp0aSI6ImM1MTNiNGFiNjM2ZmM1NjBlMWM1ZmNkMDhmNDJlNTAzYzY1MDNmYzIifQ.mr1ZbSYXcid912rBiWTHh_d3VuLNCe6OVZU5Gjk-J1PKlI5oB95Ti_gfDTkEAvcI1eVZfUg4t1EyyYv0RmNefQSZICc-paCfqUsnx1pm_kQuGm38jgMIFZrgyvzM8LxoRoxMCI5xtWcC-TuadNj2isCry27ExpyGWpbN9exzb7EDTg6_d-tkk9ovktHpJ2DmkByjUVtBaQO_mQ2jUHdPoq4EgFnzQFvN_lhN1veLB5Wt60PUGo_pdZMYXIA418SuHSFg2QDBLYFmGq6BYt5Eux0cmY8DKABzJfUAEePkjVUu5pq0VgylZ2GFQDdAPN3WSF6E9LHxo4GNeJ2S9PD0sg");

  //Upadtaing Newest Event Data
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${apiUrl}/api/event`);
          const json = await result.json();
          const updatedData = json.data.map(item => {
            const eventDate = new Date(item.event_date); 
            return { ...item, event_date: eventDate }; 
          });
          setApiData(updatedData);}
    fetchData();
  }, []);
  
  //Personal Info Bar Related
  const DefaultUser = {
    name: "Anonymous",
    score: 0,
    profile_pic:"https://example.com/profile.jpg"
  };

  const [userID,setUserID] = useState("");
  const [token,setToken] = useState("");
  const [userData, setUserData] = useState(DefaultUser);

  useEffect(() => {
    setUserID(localStorage.getItem('user_id'));
    setToken(localStorage.getItem('auth_token'));
    console.log(Date())

    fetch(`${apiUrl}/api/user?user_id=${userID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }
        return response.json();
      })
      .then(data => {
        console.log('User Info:', data.data[0]);
        if (data.data[0]){
          setUserData(data.data[0]); 
        }
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
        setUserData(DefaultUser); 
      });
  }, [apiData]);

  //Calling UserEvent API
  const [myEvent,setMyEvent] = useState([]);
  const [pastEvent,setPastEvent] = useState([]);
  const [futureEvent,setFutureEvent] = useState([]);
  useEffect(() => {
    //setUserID(localStorage.getItem('user_id'));
    //setToken(localStorage.getItem('auth_token'));
    function fetchData(Catagory, Setting)  {
      fetch(`${apiUrl}/api/userEvent?user_id=${userID}&status=${Catagory}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch user info');
          }
          return response.json();
        })
        .then(data => {
          console.log(`${Catagory}:`, data.data);
          Setting(data.data);
        })
        .catch(error => {
          console.error('Error fetching user info:', error);
        });
      };
      fetchData("creator", setMyEvent);
      fetchData("expired", setPastEvent);
      fetchData("ongoing", setFutureEvent);
  }, [apiData]);

  function Personal ({User}) {
    const [open, setOpen] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogout = () => {
      setOpen(false);
      setIsLoggedIn(false); // 設置登入狀態為false
      localStorage.removeItem('isLoggedIn'); // 從localStorage中刪除登入信息
      localStorage.removeItem("user_id");
      localStorage.removeItem("auth_token");
      // refresh the page
      window.location.reload();
  };
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    }
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', marginRight: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <Avatar alt={User && User.name} src={User && User.profile_pic} style={{ marginRight: '10px' }} />
            <div style={{ fontSize: '24px' }}>
              <strong>{User && User.name}</strong>
            </div>
          </div>
          <div>
            <Rating name="read-only" defaultValue={0} value={User && User.score} size="large" precision={0.5} readOnly/>
          </div>
        </div>
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
              <LogoutIcon />{translate('logout')}
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>{translate('logout')}</DialogTitle>
              <DialogContent>
                  <DialogContentText>
                  {translate('askToLogout')}
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleClose}>{translate('cancel')}</Button>
                  <Button onClick={handleLogout}>{translate('logout')}</Button>
              </DialogActions>
          </Dialog>
        </div>
      </div>
    )
  };

  function Comp_ListBar (InfoProps) {
    return (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{InfoProps.BarTitle}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <div style={{ height: '300px', overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={styles.tableHeader}>ID</th>
                      <th style={styles.tableHeader}>{translate('eventName')}</th>
                      <th style={styles.tableHeader}>{translate('datetime')}</th>
                      <th style={styles.tableHeader}>{translate('location')}</th>
                      <th style={styles.tableHeader}>{translate('view')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {InfoProps.Data && InfoProps.Data.map(event => (
                      <tr key={event.id}>
                        <td style={styles.tableCell}>{event.id}</td>
                        <td style={styles.tableCell}>{event.event_name}</td>
                        <td style={styles.tableCell}>{event.event_date.toLocaleString()}</td>
                        <td style={styles.tableCell}>{event.location}</td>
                        <td style={styles.tableCell}>
                          <Link to={`/ticket/${event.id}`}>
                            <Button variant="contained" href={""}>
                              <VisibilityIcon />
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
    );
  };

  function Comp_ListBar_MyTicket (InfoProps) {
    const [MyTicket, setMyTicket] = useState(InfoProps.Data);
    const [openDialog, setOpenDialog] = useState({});
    const toEditTicketPage = (id) => {
      window.location.href = `/editticket/${id}`;
    }
    const handleClickOpen = (id) => {
      setOpenDialog({ ...openDialog, [id]: true });
    };
    const handleClose = (id) => {
      setOpenDialog({ ...openDialog, [id]: false });
    };
    const handleDelete = (id) => {
      fetch(`${apiUrl}/api/event/?event_id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to delete event');
          }
          console.log('Event deleted successfully');
          setMyTicket(MyTicket.filter((item) => item.id !== id));
          handleClose(id);
        })
        .catch(error => {
          console.error('Error deleting event:', error);
        });
    }

    return (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{InfoProps.BarTitle}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <div style={{ height: '300px', overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={styles.tableHeader}>ID</th>
                      <th style={styles.tableHeader}>{translate('eventName')}</th>
                      <th style={styles.tableHeader}>{translate('datetime')}</th>
                      <th style={styles.tableHeader}>{translate('location')}</th>
                      <th style={styles.tableHeader}>{translate('view')}</th>
                      <th style={styles.tableHeader}>{translate('edit')}</th>
                      <th style={styles.tableHeader}>{translate('delete')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {InfoProps.Data && InfoProps.Data.map(event => (
                      <tr key={event.id}>
                        <td style={styles.tableCell}>{event.id}</td>
                        <td style={styles.tableCell}>{event.event_name}</td>
                        <td style={styles.tableCell}>{event.event_date.toLocaleString()}</td>
                        <td style={styles.tableCell}>{event.location}</td>
                        <td style={styles.tableCell}>
                          <Link to={`/ticket/${event.id}`}>
                            <Button variant="contained" href={""}>
                              <VisibilityIcon />
                            </Button>
                          </Link>
                        </td>
                        <td style={styles.tableCell}>
                          <Button variant="outlined" href={""} color="success" onClick={() => toEditTicketPage(event.id)}>
                              <EditIcon />
                          </Button>
                        </td>
                        <td style={styles.tableCell}>
                          <Button variant="outlined" href={""} color="error" onClick={() => handleClickOpen(event.id)}>
                              <DeleteIcon />
                          </Button>
                          <Dialog open={openDialog[event.id] || false} onClose={() => handleClose(event.id)}>
                            <DialogTitle>{translate('delete')}</DialogTitle>
                            <DialogContent>
                              <DialogContentText>
                              {translate('askToDelete')}
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={() => handleClose(event.id)}>{translate('cancel')}</Button>
                              <Button onClick={() => handleDelete(event.id)}>{translate('delete')}</Button>
                            </DialogActions>
                          </Dialog>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">{translate('personalPage')}</h1>
        <Personal User={userData}/>
        <hr />
        <Comp_ListBar_MyTicket BarTitle={translate('mine')} Data={myEvent}/>
        <Comp_ListBar BarTitle={translate('saved')} Data={apiData}/>
        <Comp_ListBar BarTitle={translate('incoming')} Data={futureEvent}/>
        <Comp_ListBar BarTitle={translate('finished')} Data={pastEvent}/>
        <hr />
      </div>
      <Footer />
    </>
  );
};

export default Info;
