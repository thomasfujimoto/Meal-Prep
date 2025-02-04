import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../styles/RecipesPage.css';

const RecipesPage = () => {
  const [recipeSteps, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get recipe from backend
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch('http://localhost:5000/get-recipes');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setRecipe(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, []);

  // Render each recipe step in a bordered box
  const renderRecipes = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    return recipeSteps.recipes.map((recipe, index) => (
      <div key={index} className="recipe-box">
        <h3 className = "recipe-title" key={index}>{recipe[0]}</h3>
        <ul>
          {recipe[1].map((ingredient, idx) => (
              <li key={idx}>{ingredient}</li>
          ))}
        </ul>
      </div>
    ));
  };

  // Return Recipe if successful/not null
  return (
    <div>
        <div className="title">RECIPE</div>
      <div className="recipe-steps">{renderRecipes()}</div>
      <BackButton to="/GroceryList" text="back" />
      <ForwardButton to="/PlannerPage" text="next" />
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

export default RecipesPage;
