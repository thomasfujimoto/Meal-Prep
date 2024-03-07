import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../styles/RecipesPage.css';
import logo from '../images/prepandplate1.png'

/*
const RecipesPage = () => {
  // Example recipe data (you can replace this with your actual recipe data)
  const recipe = {
    id: 1,
    title: 'Spaghetti Carbonara',
    description: 'A classic Italian pasta dish with bacon, eggs, and cheese.',
    steps: [
      'Cook spaghetti according to package instructions.',
      'In a skillet, cook bacon until crispy. Remove bacon and set aside. Keep the bacon fat in the skillet.',
      'In a bowl, whisk together eggs, grated cheese, salt, and pepper.',
      'Add cooked spaghetti to the skillet with bacon fat. Toss to coat the spaghetti in the fat.',
      'Remove skillet from heat. Quickly add the egg and cheese mixture to the spaghetti, stirring continuously to coat the spaghetti.',
      'Crumble the cooked bacon and add it to the skillet. Stir to combine. Serve immediately.'
    ]
  };

  const genPdf = () => {

  }

  return (
    <div className='top-container'>
    <div  className='hor-container'>
      <div className='hor-item hor-left'><button onClick={genPdf}>PDF</button></div>
      <div className='hor-item hor-mid title'><center>Recipe</center></div>
      <div className='hor-item hor-right'><img width='100' src={logo} alt="Logo"/></div>
    </div>

    //Display recipe steps
    <div className="recipe-steps">
        <ol>
          {recipe.steps.map((step, index) => (
          <p key={index}><strong>Step {index + 1}:</strong> {step}</p>
          ))}
        </ol>
      </div>

    <div className='hor-container'>
      <div className='hor-item hor-left'><a className='back button' href="#/GroceryList">&lt; Grocery List</a></div>
      <div className='hor-item hor-right'><a className='next button' href="#/PlannerPage">Weekly Planner &gt;</a></div>
      
    </div>
  </div>
 )
}  
*/

//{Backend Integration} (Should work)
const RecipesPage = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch('http://localhost:3000/submit-recipe');
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!recipe) {
    return <div>Error: Recipe not found</div>;
  }

  const genPdf = () => {

  }

  return (
    <div className='top-container'>
    <div  className='hor-container'>
      <div className='hor-item hor-left'><button onClick={genPdf}>PDF</button></div>
      <div className='hor-item hor-mid title'><center>Recipe</center></div>
      <div className='hor-item hor-right'><img width='100' src={logo} alt="Logo"/></div>
    </div>

    //Display recipe steps
    <div className="recipe-steps">
        <ol>
          {recipe.steps.map((step, index) => (
          <p key={index}><strong>Step {index + 1}:</strong> {step}</p>
          ))}
        </ol>
      </div>

    <div className='hor-container'>
      <div className='hor-item hor-left'><a className='back button' href="#/GroceryList">&lt; Grocery List</a></div>
      <div className='hor-item hor-right'><a className='next button' href="#/PlannerPage">Weekly Planner &gt;</a></div>
      
    </div>
  </div>
 )
}  
export default RecipesPage;
