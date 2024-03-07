import React from 'react';
import logo from '../images/prepandplate1.png';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="center-container">
      <img src={logo} alt="Logo" className="logo" />
      <GetStartedButton to="/SurveyPage" text="GET STARTED!" />
    </div>
  );
};

const GetStartedButton = ({ to, text }) => {
    return (
      <Link to={to} className="button">
        {text}
      </Link>
    );
};

export default LandingPage;
