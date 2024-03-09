import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../styles/RecipesPage.css';
import logo from '../images/prepandplate1.png'
//import html2canvas from 'html2canvas'
//import jsPDF from 'jspdf'


const RecipesPage = () => {
  // Example recipe data (you can replace this with your actual recipe data)
  const recipeUrl = 'http://localhost:5000/RecipesPage'

  const leftLink = "/GroceryList"
  const rightLink = "/PlannerPage"

  const fakeRecipe = [ {id: "1", name:'Cook spaghetti according to package instructions.'},
    {id: "2", name:  'In a skillet, cook bacon until crispy. Remove bacon and set aside. Keep the bacon fat in the skillet.'},
    {id: "3", name:  'In a bowl, whisk together eggs, grated cheese, salt, and pepper.'},
    {id: "4", name:  'Add cooked spaghetti to the skillet with bacon fat. Toss to coat the spaghetti in the fat.'},
    {id: "5", name:  'Remove skillet from heat. Quickly add the egg and cheese mixture to the spaghetti, stirring continuously to coat the spaghetti.'},
    {id: "6", name:  'Crumble the cooked bacon and add it to the skillet. Stir to combine. Serve immediately.'}
  ]

  async function getRecipe(){
    try {
      const response = await fetch (recipeUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error)
      return fakeRecipe;
    }
  }

  const fetchRecipe = async () => {
    /*
    const g = localStorage.getItem("RecipePage")
    if (g) {
      setRecipe(JSON.parse(g))
      return;
    } else {
      const data = await getRecipe();
      setRecipe(data);
    }
    */
    const data = await getRecipe();
    setRecipe(data);
  };

  const [recipeSteps, setRecipe] = useState([]);

/*
  const pdfRef = useRef()

  const genPdf = () => {
    const input = pdfRef.current;
    html2canvas(input).then( canvas => {
      const imgData = canvas.toDataURL("image/png")
      const pdf = jsPDF("p", "mm", "letter", true)
      const width = pdf.internal.pageSize.getWidth()
      const height = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(width/imgWidth, height/imgHeight)
      const imageX = (width - imgWidth*ratio) / 2
      const imageY = 30
      pdf.addImage(imgData, 'PNG', imageX, imageY, imgWidth*ratio, imgHeight*ratio)
      pdf.save('recipe.pdf')
    })
  }
*/
  

  useEffect(() => {
    fetchRecipe()
  }, [])

  return (
    <>
      
      <div className='center-container'>
        
          <div  className='hor-container'>
            <div className='hor-item hor-mid title'><center>Recipe</center></div>
            <div className='hor-item hor-right'><img width='100' src={logo} alt="Logo"/></div>
          </div>
          <div className='hor-item hor-mid'>
            {recipeSteps.map((item, index) => (            
              <div key={item._id}>
                <p>{index+1}. {item.name}</p>
              </div>
            ))}

          </div>
        
        <div className='hor-container'>
          <BackButton to={leftLink} text="Grocery List" />
          <ForwardButton to={rightLink} text="Weekly Planner" />
        </div>
      </div>
    </>
  )
}

const BackButton = ({ to, text }) => {
  return (
    <Link to={to} className='back button'>
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