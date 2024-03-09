import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../styles/MenuPage.css';

const MenuPage = () => {
  const [meals, setMeals] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch('http://localhost:5000/get-meals'); // Adjust the URL accordingly
        if (!response.ok) {
          throw new Error('Failed to fetch meals data');
        }
        const mealsData = await response.json();
        setMeals(mealsData.meals);
        console.log('Meals successfully fetched:', mealsData); // Message indicating successful fetch
      } catch (error) {
        console.error('Error fetching meals data:', error);
      }
    };

    fetchMeals();
  }, []); // Empty dependency array ensures that this effect runs only once when the component mounts

  const toggleMealSelection = (meal) => {
    setSelectedMeals(prevSelectedMeals =>
      prevSelectedMeals.some(selectedMeal => selectedMeal.title === meal.title)
        ? prevSelectedMeals.filter(selectedMeal => selectedMeal.title !== meal.title)
        : [...prevSelectedMeals, meal]
    );
  };

  const handleSubmit = async () => {
    try {
      const mealsToSend = selectedMeals.map(meal => ({
        title: meal.title,
        type: meal.type
      }));
  
      const response = await fetch('http://localhost:5000/submit-meals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mealsToSend)
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit selected meals');
      }
  
      console.log('Selected meals successfully submitted');
      alert('Survey submitted successfully!');
    } catch (error) {
      console.error('Error submitting selected meals:', error);
      alert('Error submitting selected meals:');
    }
  };
  

  return (
    <div>
      <div className="title">MENU</div>
      <div className="meals-container">
        <div className="meal-column">
          <h2>Breakfast</h2>
          <div className="meals-list">
            {meals.filter(meal => meal.type === 'breakfast').map((meal, index) => (
              <div key={index} className={`meal-item ${selectedMeals.some(selectedMeal => selectedMeal.title === meal.title) ? 'selected' : ''}`} onClick={() => toggleMealSelection(meal)}>
                {meal.title}
              </div>
            ))}
          </div>
        </div>
        <div className="meal-column">
          <h2>Lunch</h2>
          <div className="meals-list">
            {meals.filter(meal => meal.type === 'lunch').map((meal, index) => (
              <div key={index} className={`meal-item ${selectedMeals.some(selectedMeal => selectedMeal.title === meal.title) ? 'selected' : ''}`} onClick={() => toggleMealSelection(meal)}>
                {meal.title}
              </div>
            ))}
          </div>
        </div>
        <div className="meal-column">
          <h2>Dinner</h2>
          <div className="meals-list">
            {meals.filter(meal => meal.type === 'dinner').map((meal, index) => (
              <div key={index} className={`meal-item ${selectedMeals.some(selectedMeal => selectedMeal.title === meal.title) ? 'selected' : ''}`} onClick={() => toggleMealSelection(meal)}>
                {meal.title}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="navigation">
        <BackButton to="/SurveyPage" text="back" />
        <ForwardButton to="/GroceryList" text="next" />
      </div>
      <button className="submit button" onClick={handleSubmit}>submit</button>
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

export default MenuPage;
