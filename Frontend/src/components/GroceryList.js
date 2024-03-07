import { React, useState, useEffect, useRef } from 'react'
import '../styles/GroceryList.css'
import { Link } from "react-router-dom"
import logo from '../images/prepandplate1.png'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

/**
 * Need the backend to return a List of objects {_id: id1, name: "name"}.
 * 
 * Assumption: the backend enables CORS. 
 * 
 * @returns 
 */
const GroceryList = () => {
  const groceryUrl = 'http://localhost:5000/groceryList'

  // populate the nagivation links (buttons) at the bottom
  const leftLink = "/PlannerPage"
  const rightLink = "/RecipesPage"

  // just to ensure that some list is displayed
  const fakeItems = [ {_id: "1", name: "Sugar"}, 
    {_id: "2", name: "Milk"},
    {_id: "3", name: "Butter"},
    {_id: "4", name: "Orange juice"}
  ]

  async function getGroceries() {
    try {
      const response = await fetch(groceryUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      const data = await response.json();
      //console.log(`retrieved data: ${data}`)
      return data
    } catch (error) {
      console.log(error)
      return fakeItems
    }
  }

  const fetchGroceryList = async () => {
    /*
    const g = localStorage.getItem("groceryList")
    if (g) {
      setGroceryItems(JSON.parse(g))
      return;
    } else {
      const data = await getGroceries();
      setGroceryItems(data);
    }
    */
    const data = await getGroceries();
    setGroceryItems(data);
};

  const [groceryItems, setGroceryItems] = useState([]);

  const [selectedItems, setSelectedItems] = useLocalStorage("selectedItems", [])

  // to generate PDF
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
      pdf.save('grocery_list.pdf')
    })
  }

  // Only on 1st loading of page (every refresh is a page load) 
  useEffect(() => {
    fetchGroceryList()
  }, [])

  const handleCheckboxChange = (e) => {
		const isSelected = e.target.checked;
		const value = e.target.value;

		if ( isSelected ) {
      console.log(value + " is selected")
      if (selectedItems && selectedItems.length > 0)
			  setSelectedItems( [...selectedItems, value ] )
      else
        setSelectedItems( [value ] )
        console.log("[handleCheckboxChange selected] " + selectedItems)
		} else { // unchecked, so remove it
      setSelectedItems(selectedItems.filter((id) => {
        return (id !== value)
      }))
		}
    
  }

  return (
    <>
      <div className='hor-item hor-left top left'><button onClick={genPdf}>PDF</button></div>
      <div className='center-container'>
        <div className='top' ref={pdfRef}>
          <div  className='hor-container'>
            <div className='hor-item hor-mid title'><center>Grocery List</center></div>
            <div className='hor-item hor-right'><img width='100' src={logo} alt="Logo"/></div>
          </div>
          <div className='hor-item hor-mid'>
            {groceryItems.map((item) => (            
              <div key={item._id}>
                <label className="survey-checkbox-label">
                    <input type='checkbox' value={item._id}
                        checked={ selectedItems && selectedItems.includes(item._id) }
                        onChange={handleCheckboxChange}
                    />&nbsp;
                    {item.name}
                </label>
              </div>
            ))}

          </div>
        </div>
        <div className='hor-container'>
          <BackButton to={leftLink} text="Weekly Planner" />
          <ForwardButton to={rightLink} text="Recipes" />
        </div>
      </div>
    </>
  )
}

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

/**
 * To store values in local storage so that they don't disappear on page refresh
 * @param {*} key: must the string of same key in return
 * @param {*} initialValue 
 * @returns 
 */
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = localStorage.getItem(key);
      return item && (item != "undefined") ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);

      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
};

export default GroceryList
