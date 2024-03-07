import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import MenuPage from './components/MenuPage';
import SurveyPage from './components/SurveyPage';
import PlannerPage from './components/PlannerPage';
import GroceryList from './components/GroceryList';
import RecipesPage from './components/RecipesPage';

import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/SurveyPage" element={<SurveyPage />} />
        <Route path="/MenuPage" element={<MenuPage />} />
        <Route path="/PlannerPage" element={<PlannerPage />} />
        <Route path="/GroceryList" element={<GroceryList />} />
        <Route path="/RecipesPage" element={<RecipesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
