import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addBookmark } from "../redux/action";
import { Footer, Navbar,Ticket } from "../components";

const apiUrl = process.env.REACT_APP_API_URL;

const TicketInfo = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const dispatch = useDispatch();

  const addTicket = (ticket) => {
    dispatch(addBookmark(ticket));
  };

  useEffect(() => {
    const getTicket = async () => {
      const response = await fetch(`${apiUrl}/api/event/?event_id=${id}`);
      const data = await response.json();
      setTicket(data.data[0]);
      setIsDataLoaded(true);
    };
    getTicket();
  }, [id]);

  const Loading = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 py-3">
              <Skeleton height={400} width={400} />
            </div>
            <div className="col-md-6 py-5">
              <Skeleton height={30} width={250} />
              <Skeleton height={90} />
              <Skeleton height={40} width={70} />
              <Skeleton height={50} width={110} />
              <Skeleton height={120} />
              <Skeleton height={40} width={110} inline={true} />
              <Skeleton className="mx-3" height={40} width={110} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowTicket = () => {
    return (
      <>
        <Ticket ticket={ticket} defaultExpanded={true}/>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{isDataLoaded ? <ShowTicket /> : <Loading />}</div>
      </div>
      <Footer />
    </>
  );
};

export default TicketInfo;
