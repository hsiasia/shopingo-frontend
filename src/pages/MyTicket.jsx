import React, { useEffect } from "react";
import { Footer, Navbar } from "../components";


const MyTicket = () => {
  useEffect(() => {
    const getProducts = async () => {
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

    getProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">My Ticket</h1>
        <hr />
        
        <br />
        <br />
      </div>
      <Footer />
    </>
  );
};

export default MyTicket;
