import React, { useState, useEffect } from 'react';
import { getDocs } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { collection } from "firebase/firestore";
import Header from '../page/Header';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function UsersRecipes() {

  const [recipes, setRecipes] = useState([]);
  const [filterRecipes, setFilterRecipes] = useState([]);
  const [docId, setDocID] = useState([]);
  const [search, setSearch] = useState('');
  const user = auth.currentUser;

  function searchInput(event) {
    const searchValue = event.target.value;
    setSearch(searchValue);

    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilterRecipes(filtered);
  }

  async function displayData() {
    const querySnapshot = await getDocs(collection(db, "recipes"));
    const fetchedData = [];
    const docIdArr = [];

    querySnapshot.forEach((doc) => {
      if (doc.data().isPublic) {
        fetchedData.push({ ...doc.data(), id: doc.id }); 
        docIdArr.push(doc.id);
      }
    });

    setRecipes(fetchedData);
    setFilterRecipes(fetchedData);
    setDocID(docIdArr);
  }

  useEffect(() => {
    displayData();
  }, []);

  return (
    <div className='my-recipes'>
      <Header />
      <div className='title-backg d-flex justify-content-evenly'>
        <div className='rec-title-img1'>
          <img src="https://m.media-amazon.com/images/I/61puwQ4QrYL._AC_UF1000,1000_QL80_.jpg" alt="Placeholder" />
        </div>
        <div>
          <div className='recipes-title'>
            <h2>Users Recipes</h2>
          </div>
          <div className='searchInput'>
            <input
              type="text"
              placeholder='Search your next meal'
              value={search}
              onChange={searchInput}
            />
          </div>
        </div>
        <div className='rec-title-img2'>
          <img src="https://m.media-amazon.com/images/I/61puwQ4QrYL._AC_UF1000,1000_QL80_.jpg" alt="Placeholder" />
        </div>
      </div>
      <div className="d-flex flex-wrap justify-content-evenly">
        {filterRecipes.map((recipe, index) => (
          <Link className="cardd col-6 col-md-3" key={index} to={`/UserRecipeInfo/${recipe.id}`}>
            <div className='meal-img'>
              <img src={recipe.image || "https://via.placeholder.com/150"} alt="Recipe" />
            </div>
            <div className='d-flex flex-column'>
              <h6>{recipe.title || "No Title Available"}</h6>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
