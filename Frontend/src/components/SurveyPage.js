import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../styles/SurveyPage.css';

const SurveyPage = () => {
  const [foodPreferences, setFoodPreferences] = useState({
    vegetarian: 0,
    vegan: 0,
    nutFree: 0,
    dairyFree: 0,
  });

  const [caloriesPerMeal, setCaloriesPerMeal] = useState({
    calories: 0,
  });

  const [mealFrequency, setMealFrequency] = useState({
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    twentyMinMeals: 0,
    dessert: 0,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFoodPreferences((prevState) => ({
      ...prevState,
      [name]: checked ? 1 : 0,
    }));
    console.log('Updated food preferences:', foodPreferences);
  };

  const handleCaloriesChange = (event) => {
    const { checked } = event.target;
    setCaloriesPerMeal(checked ? 1 : 0);
    console.log('Updated calories per meal:', checked ? 1 : 0);
  };

  const handleMealFrequencyChange = (event) => {
    const { name, checked } = event.target;
    console.log('Previous mealFrequency:', mealFrequency); // Log previous state
    setMealFrequency((prevState) => ({
      ...prevState,
      [name]: checked ? 1 : 0,
    }));
    console.log('Updated mealFrequency:', mealFrequency); // Log updated state
  };

  const submitSurvey = async (event) => {
    event.preventDefault();
  
    const surveyData = {
      mealFrequency,
      caloriesPerMeal,
      foodPreferences,
    };
  
    try {
      const response = await fetch('http://localhost:5000/submit-survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit survey');
      }
  
      const responseData = await response.json();
      console.log('Survey submitted:', responseData);
      alert('Survey submitted successfully!');
    } catch (error) {
      console.error('Error submitting survey:', error);
      alert('Error submitting survey. Please try again later.');
    }
  };


  return (
    <div>
      <div className='title'>SURVEY</div>

      {/* Question 1 */}
      <p className="survey-question">
        Q1: Which <span style={{ fontStyle: 'italic', textDecoration: 'underline' }}>Meals</span> would you like? Select all that apply. 
      </p> 
      <div className="survey-options">
        <label className="survey-checkbox-label">
          <input
            type="checkbox"
            name="breakfast"
            checked={mealFrequency.breakfast}
            onChange={handleMealFrequencyChange}
          />
          Breakfast
        </label>
        <br />
        <label className="survey-checkbox-label">
          <input
            type="checkbox"
            name="lunch"
            checked={mealFrequency.lunch}
            onChange={handleMealFrequencyChange}
          />
          Lunch
        </label>
        <br />
        <label className="survey-checkbox-label">
          <input
            type="checkbox"
            name="dinner"
            checked={mealFrequency.dinner}
            onChange={handleMealFrequencyChange}
          />
          Dinner
        </label>
        <br />
        <label className="survey-checkbox-label">
          <input
            type="checkbox"
            name="twentyMinMeals"
            checked={mealFrequency.twentyMinMeals}
            onChange={handleMealFrequencyChange}
          />
          20 Minute Meals
        </label>
        <br />
        <label className="survey-checkbox-label">
          <input
            type="checkbox"
            name="dessert"
            checked={mealFrequency.dessert}
            onChange={handleMealFrequencyChange}
          />
          Dessert
        </label>
      </div>
      
      {/* Question 2 */}
      <p className="survey-question">
      Q2: Would you like greater than 500 <span style={{ fontStyle: 'italic', textDecoration: 'underline' }}>Calories</span> per meal?
      </p>
      <div className="survey-options">
        <label className="survey-checkbox-label">
          <input
            type="checkbox"
            name="caloriesPerMeal"
            checked={caloriesPerMeal === 1}
            onChange={handleCaloriesChange}
          />
          Yes
        </label>
      </div>

      
      {/* Question 3 */}
      <p className="survey-question">
        Q3: What are your <span style={{ fontStyle: 'italic', textDecoration: 'underline' }}>Food Preferences</span>? Select all that apply.
      </p>
      <div className="survey-options">
        <label className="survey-checkbox-label">
          <input
            type="checkbox"
            name="vegetarian"
            checked={foodPreferences.vegetarian}
            onChange={handleCheckboxChange}
          />
          Vegetarian
        </label>
        <br />
        <label className="survey-checkbox-label">
          <input
            type="checkbox"
            name="vegan"
            checked={foodPreferences.vegan}
            onChange={handleCheckboxChange}
          />
          Vegan
        </label>
        <br />
        <label className="survey-checkbox-label">
          <input
            type="checkbox"
            name="nutFree"
            checked={foodPreferences.nutFree}
            onChange={handleCheckboxChange}
          />
          Nut-Free
        </label>
        <br />
        <label className="survey-checkbox-label">
          <input
            type="checkbox"
            name="dairyFree"
            checked={foodPreferences.dairyFree}
            onChange={handleCheckboxChange}
          />
          Dairy-Free
        </label>
      </div>

      {/* Back and Forward buttons */}
      <BackButton to="/" text="back" />
      <ForwardButton to="/MenuPage" text="next" />
      <SubmitButton text="submit" onClick={submitSurvey} />
    </div>
  );
};

const BackButton = ({ to, text }) => {
  return (
    <Link to={to} className="back button">
      {text}
    </Link>
  );
};

const ForwardButton = ({ to, text }) => {
  return (
    <Link to={to} className="next button">
      {text}
    </Link>
  );
};

const SubmitButton = ({ text, onClick }) => {
  return (
    <button className="submit button" onClick={onClick}>
      {text}
    </button>
  );
};

export default SurveyPage;
