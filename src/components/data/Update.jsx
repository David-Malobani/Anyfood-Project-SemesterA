import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../firebase';
import { collection, getDocs, query, where, doc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { Link, useParams } from 'react-router-dom';
import Header from '../page/Header';
import Nav from '../page/Nav';
import { useHistory } from 'react-router-dom';
import { getDoc } from "firebase/firestore";
export default function Update() {
  let history = useHistory();
  let { id } = useParams();
  let [recipeName, setRecipeName] = useState("");
  let [recipeIngredients, setRecipeIngredients] = useState("");
  let [image, setImage] = useState("");
  let [description, setDescription] = useState("");
  let [isPublic, setIsPublic] = useState(false);


  async function getData() {
    try {
      const docRef = doc(db, "recipes", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // קבלת הנתונים מהמסמך
        const data = docSnap.data();
        setRecipeIngredients(data.ingredients.join(","));
        setRecipeName(data.title);
        setImage(data.image);
        setDescription(data.description);
        setIsPublic(data.isPublic);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching recipe data:", error);
    }
  }


  useEffect(() => {
    getData();
  }, [id]);



  async function updateRecipe(id) {

    try {

      if (!recipeName || !recipeIngredients || !image || !description || isPublic === undefined) {
        console.error("Missing required fields!");
        return;
      }
      let arr = recipeIngredients.split(",");
      await updateDoc(doc(db, "recipes", id), {
        title: recipeName,
        ingredients: arr,
        image: image,
        description: description,
        isPublic: isPublic,

      });

      console.log("Recipe updated successfully!");
      history.push('/MyRecipes');
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  }


  async function cancel() {
    const userAgrees = confirm("Are you sure you want to cancel?");
    if (userAgrees) {
      history.push('/MyRecipes');
    }
  }

  return (
    <div className='addRec'>
      <Header />
      <div>
        <Nav />
        <div className='CreateRecipe d-flex flex-column'>
          <h2>Update Recipes</h2>
          <input type='text' placeholder='Recipe name' value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
          <textarea id="screen1" placeholder='Ingredients' value={recipeIngredients} onChange={(e) => setRecipeIngredients(e.target.value)} />
          <p>(Between every Ingredient - use a ',')</p>
          <input className='img-input' type="text" value={image} placeholder='Image' onChange={(e) => setImage(e.target.value)} />
          <input type="text" placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
          <select value={isPublic} onChange={(e) => setIsPublic(JSON.parse(e.target.value))}>
            <option value={false}>Private</option>
            <option value={true}>Public</option>
          </select>
          <button onClick={() => updateRecipe(id)}>Update</button>
          <button onClick={cancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}