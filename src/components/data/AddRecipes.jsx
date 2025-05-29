import React, { useEffect, useState } from 'react'
import { collection, addDoc, getDocs, query, where, doc, setDoc,updateDoc } from "firebase/firestore";
import { auth, db } from '../../../firebase';
import Logout from '../authentication/Logout';
import MyRecipes from './MyRecipes';
import Header from '../page/Header';
import Nav from '../page/Nav';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function Addrecipes() {
  let [recipeName, setRecipeName] = useState("");
  let [recipeIngredients, setRecipeIngridients] = useState([]);
  let [image, setImage] = useState("");
  let [description, setDescription] = useState("");
  let [isPublic, setIsPublic] = useState(false);
  let [comments,setComments] = useState([]);
  let history = useHistory();




  async function setData() {
    if (!recipeName || !recipeIngredients || !description) {
      alert("Please fill in all required fields!");
      return;
    }
    const userEmail = auth.currentUser.email;
    const ingredientsArray = recipeIngredients.split(",").map((item) => item.trim());
    const emailArray = [userEmail];
  
    try {
      // יצירת מסמך עם ID אוטומטי
      const docRef = await addDoc(collection(db, "recipes"), {
        email: userEmail,
        title: recipeName,
        ingredients: ingredientsArray,
        image: image,
        description: description,
        isPublic: isPublic,
        Email_Array: emailArray,
      });
  

      await updateDoc(docRef, {
        id: docRef.id,  
      });
  
      console.log("Recipe successfully added!");
      history.push('/MyRecipes');
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  }
  


  return (
    <div className='addRec'>
      <Header />

      
        <div className='CreateRecipe d-flex flex-column'>
          <h2>Add Recipes</h2>
          <input type='text' placeholder='recipe name' onChange={(e) => setRecipeName(e.target.value)} />
          <textarea id="screen1" placeholder='ingridients' onChange={(e) => setRecipeIngridients(e.target.value)} />
          <p>(between evrey ingridient - use a ',')</p>
          <input className='img-input' type="text" placeholder='Image' onChange={(e) => setImage(e.target.value)} />
          <textarea id="screen1" placeholder='description' onChange={(e) => setDescription(e.target.value)} />
          <select onChange={(e) => setIsPublic(JSON.parse(e.target.value))}>
            <option value={false}>private</option>
            <option value={true}>public</option>
          </select>

          <button onClick={setData}>Create Recipe</button>
          <Link to="/MyRecipes"><button>Go back</button></Link>
        </div>

      
    </div>
  )
}