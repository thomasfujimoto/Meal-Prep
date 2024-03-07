import React from 'react';
import { Link } from 'react-router-dom';
//import '../App.css';
import '../styles/PlannerPage.css'

const PlannerPage = () => {
    return (
        <div className="planner-container">
        <div className = 'plantitle'>Weekly Planner</div>
        <div className="planner">
            {Array.from({ length: 7 }, (_, index) => (
            <div key={index} className="day">
                <h2>{getDayOfWeek(index)}</h2>
                <div className="meals">
                <div className="meal" onClick={() => handleMealClick('breakfast')}>
                    <h3 className="meal-label">Breakfast</h3>
                </div>
                <div className="meal" onClick={() => handleMealClick('lunch')}>
                    <h3 className="meal-label">Lunch</h3>
                </div>
                <div className="meal" onClick={() => handleMealClick('dinner')}>
                    <h3 className="meal-label">Dinner</h3>
                </div>
                </div>
            </div>
            ))}
        </div>
        <BackButton to="/MenuPage" text="back" />
        </div>
  );
};
    
const getDayOfWeek = (index) => {
        const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        return daysOfWeek[index];
      };
      
      // Function to handle click on meal parts
const handleMealClick = (meal) => {
        // Handle click event, e.g., show modal or navigate to another page
        console.log(`Clicked on ${meal}`);
      };
  
const BackButton = ({ to, text }) => {
    return (
      <Link to={to} className="back button">
        {text}
      </Link>
    );
  };
export default PlannerPage;