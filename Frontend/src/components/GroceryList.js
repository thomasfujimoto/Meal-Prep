import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../styles/GroceryList.css';

const GroceryList = () => {
  const [ingredients, setIngredients] = useState([]);

  // Gets ingredients from backend
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch('http://localhost:5000/get-grocery');
        if (!response.ok) {
          throw new Error('Failed to fetch ingredients data');
        }
        const responseData = await response.json();
        const groceryData = responseData.grocery;
        setIngredients(groceryData);
        console.log('Ingredients successfully fetched:', groceryData);
      } catch (error) {
        console.error('Error fetching ingredients data:', error);
      }
    };

    fetchIngredients();
  }, []);

  // indexes through array and prints out result on webpage
  const renderGroceries = () => {
    return (
      <ul>
        {Array.isArray(ingredients) && ingredients.map((item, index) => (
          <div key={index} className='grocery-box'>
            <h3 key={index}>{item[0]}</h3>
            <ul>
              {item[1].map((ingredient, idx) => (
                <li key={idx}>{ingredient}</li>
              ))}
            </ul>
          </div>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <div className='title'>GROCERY LIST</div>
      {renderGroceries()}
      <BackButton to="/MenuPage" text="back" />
      <ForwardButton to="/RecipesPage" text="next" />
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

export default GroceryList;
