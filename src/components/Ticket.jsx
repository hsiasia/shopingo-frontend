import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addBookmark } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";

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
            <div id={ticket.id} key={ticket.id} >
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
                  <li className="list-group-item lead">$ {ticket.price}</li>
                  {/* <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li> */}
                </ul>
                <div className="card-body">
                  <Link to={"/ticket/" + ticket.id} className="btn btn-dark m-1">
                    Join Ticket
                  </Link>
                  <button className="btn btn-dark m-1" onClick={() => addTicket(ticket)}>
                    Save to Bookmark
                  </button>
                </div>
              </div>
            </div>

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
