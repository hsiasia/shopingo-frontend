import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addBookmark } from "../redux/action";

import { Footer, Navbar } from "../components";

const Ticket = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState([]);
  const [similarTickets, setSimilarTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const dispatch = useDispatch();

  const addTicket = (ticket) => {
    dispatch(addBookmark(ticket));
  };

  useEffect(() => {
    const getTicket = async () => {
      setLoading(true);
      setLoading2(true);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setTicket(data);
      setLoading(false);
      const response2 = await fetch(
        `https://fakestoreapi.com/products/category/${data.category}`
      );
      const data2 = await response2.json();
      setSimilarTickets(data2);
      setLoading2(false);
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
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-3">
              <img
                className="img-fluid"
                src={ticket.image}
                alt={ticket.title}
                width="400px"
                height="400px"
              />
            </div>
            <div className="col-md-6 col-md-6 py-5">
              <h4 className="text-uppercase text-muted">{ticket.category}</h4>
              <h1 className="display-5">{ticket.title}</h1>
              <p className="lead">
                {ticket.rating && ticket.rating.rate}{" "}
                <i className="fa fa-star"></i>
              </p>
              <h3 className="display-6  my-4">${ticket.price}</h3>
              <p className="lead">{ticket.description}</p>
              <button
                className="btn btn-outline-dark"
                onClick={() => addTicket(ticket)}
              >
                Add to Bookmark
              </button>
              <Link to="/cart" className="btn btn-dark mx-3">
                Join Ticket
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  const Loading2 = () => {
    return (
      <>
        <div className="my-4 py-4">
          <div className="d-flex">
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowSimilarTicket = () => {
    return (
      <>
        <div className="py-4 my-4">
          <div className="d-flex">
            {similarTickets.map((item) => {
              return (
                <div key={item.id} className="card mx-4 text-center">
                  <img
                    className="card-img-top p-3"
                    src={item.image}
                    alt="Card"
                    height={300}
                    width={300}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {item.title.substring(0, 15)}...
                    </h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item lead">${ticket.price}</li>
                  </ul>
                  <div className="card-body">
                    <Link
                      to={"/ticket/" + item.id}
                      className="btn btn-dark m-1"
                    >
                      Join Ticket
                    </Link>
                    <button
                      className="btn btn-dark m-1"
                      onClick={() => addTicket(item)}
                    >
                      Add to Bookmark
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowTicket />}</div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
          <h2 className="">You may also Like</h2>
            <Marquee
              pauseOnHover={true}
              pauseOnClick={true}
              speed={50}
            >
              {loading2 ? <Loading2 /> : <ShowSimilarTicket />}
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Ticket;
