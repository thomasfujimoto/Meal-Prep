import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import '../App.css';
import '../styles/PlannerPage.css';

const PlannerPage = () => {
    const [mealData, setMealData] = useState([]);

    useEffect(() => {
        const fetchMealData = async () => {
            try {
                const response = await fetch('http://localhost:5000/get-schedule');
                if (!response.ok) {
                    throw new Error('Failed to fetch weekly meal data');
                }
                const data = await response.json();
                setMealData(data.schedule);
                console.log('Weekly meal data successfully fetched:', data.schedule);
            } catch (error) {
                console.error('Error fetching weekly meal data:', error);
            }
        };

        fetchMealData();
    }, []);

    const getDayOfWeek = (index) => {
        const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        return daysOfWeek[index];
    };

    return (
        <div className="planner-container">
            <div className='plantitle'>Weekly Planner</div>
            <div className="planner">
                {mealData && mealData.map((dayMeals, index) => ( // check to make sure array is able to be iterated over before iterating
                    <div key={index} WclassName="day">
                        <h2>{getDayOfWeek(index)}</h2>
                        <div className="meals">
                            <div className="meal">
                                <h3 className="meal-label">Breakfast: {dayMeals[0]}</h3>
                            </div>
                            <div className="meal">
                                <h3 className="meal-label">Lunch: {dayMeals[1]}</h3>
                            </div>
                            <div className="meal">
                                <h3 className="meal-label">Dinner: {dayMeals[2]}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <BackButton to="/MenuPage" text="back" />
            <ForwardButton to="/GroceryList" text="next" />
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

export default PlannerPage;
