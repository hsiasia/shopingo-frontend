import React from 'react'
import { Footer, Navbar } from "../components";
import { useLanguage } from '../languageContext';
const Calendar = () => {
  const { translate } = useLanguage();
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">{translate('calendar')} </h1>
        <hr />
        <p className="lead text-center">
          Lorem
        </p>
      </div>
      <Footer />
    </>
  )
}

export default Calendar