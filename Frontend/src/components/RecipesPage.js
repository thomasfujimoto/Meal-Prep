import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PDFDocument, rgb } from 'pdf-lib'; // Import necessary functions from pdf-lib
import '../App.css';
import '../styles/RecipesPage.css';
import logo from '../images/prepandplate1.png'

const RecipesPage = () => {
  

  //Fake recipe, replace if needed
  const fakeRecipe = {
    id: 1,
    steps: [
      'Using an electric mixer on medium-high speed, beat butter, sugar, orange zest, salt, and cardamom, if using, in a large bowl until fluffy.',
      'Pour 3 Tbsp. warm water (105°F–115°F) into a small bowl. Add yeast and 1 Tbsp. sugar and whisk to combine. Let sit until foamy, about 10 minutes.',
      'Using electric mixer on medium-high speed, beat egg yolk, orange juice, oil, salt, and remaining 1 Tbsp. sugar in a large bowl. Add 1 2/3 cups flour and yeast mixture. Beat until dough just comes together. Turn out dough onto a lightly floured surface. Knead several times with floured hands until smooth, about 5 minutes (dough will be sticky).',
      'Spray a clean large bowl with nonstick spray. Place dough in bowl and turn to coat. Cover with a towel and let sit in a warm place until doubled in size, about 45 minutes.'
    ]
  };


  const [recipeSteps, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);


  //Get recipe from backend
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch('http://localhost:5000/RecipesPage');
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


  // Function to handle PDF download
  const handleDownloadPDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    const stepY = height - 150;
    fakeRecipe.steps.forEach((step, index) => {          //replace with fakeRecipe with recipeSteps once done testing
      page.drawText(`Step ${index + 1}: ${step}`, {
        x: 50,
        y: stepY - index * 20,
        size: 12,
      });
    });

    const pdfBytes = await pdfDoc.save();
    downloadPdf(pdfBytes, 'recipe.pdf');
  };

  const downloadPdf = (data, filename) => {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  if (loading) {
    return <div>Loading...</div>;
  }


  // Return fakeRecipe as fallback when recipeSteps is null, used for testing purposes
  if (!recipeSteps) {
    return (
      <div>
        <div className="header">
          <button onClick={handleDownloadPDF} className="pdf-button">Download PDF</button>
          <div className='title'>RECIPE</div>
          <img src={logo} alt="Prep and Plate 1" className="recipe-image" />
        </div>
        <div className="recipe-steps">
          {fakeRecipe.steps.map((step, index) => (
            <p key={index} className ="recipe-step"><strong className="large-font">Step {index + 1}:</strong> <span className="large-font" style={{ color: '#006400' }}>{step}</span></p>

          ))}

        </div>
        <BackButton to="/GroceryList" text="<- Grocery List" />
        <ForwardButton to="/PlannerPage" text="Weekly Planner ->" />
      </div>
    );
  }


  //Return Recipe if successful/not null
  return (
    <div>
      <div className="header">
        <button onClick={handleDownloadPDF} className="pdf-button">Download PDF</button>
        <div className='title'>RECIPE</div>
        <img src={logo} alt="Prep and Plate 1" className="recipe-image" />
      </div>
      <div className="recipe-steps">
        {recipeSteps.steps.map((step, index) => (
          <p key={index} className ="recipe-step"><strong className="large-font">Step {index + 1}:</strong> <span className="large-font" style={{ color: '#006400' }}>{step}</span></p>

        ))}

      </div>
      <BackButton to="/GroceryList" text="<- Grocery List" />
      <ForwardButton to="/PlannerPage" text="Weekly Planner ->" />
    </div>
  );
};

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
