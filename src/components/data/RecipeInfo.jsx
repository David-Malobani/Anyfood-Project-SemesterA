import React, { useState, useEffect } from "react";
import { auth, db } from "../../../firebase";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { useHistory, useParams } from "react-router-dom";
import Header from "../page/Header";
import { Link } from 'react-router-dom';

export default function RecipeInfo() {
  let { id } = useParams();
  let [recipe, setRecipe] = useState([]);
  let history = useHistory();
  let [count, setCount] = useState(0);

  async function getLen(id) {
    const recipeRef = doc(db, "recipes", id);
    try {
      const docSnap = await getDoc(recipeRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const emailArray = data.Email_Array || [];

        setCount(emailArray.length);
      } else {
        console.log("Document not found");
        setCount(0);
      }
    } catch (error) {
      console.error("Error getting document:", error);
      setCount(0);
    }
  }

  async function displayData() {
    try {
      const docRef = doc(db, "recipes", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setRecipe(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching recipe data:", error);
    }
  }

  async function handleDelete(recipeId) {
    const userAgrees = confirm("Are you sure you wish to delete your meal?");
    if (userAgrees) {
      try {
        const recipeRef = doc(db, "recipes", recipeId);
        await deleteDoc(recipeRef);
        console.log(`Recipe with ID ${recipeId} deleted successfully!`);
        history.push("/MyRecipes");
      } catch (error) {
        console.error("Error deleting recipe:", error);
      }
    }
  }

  async function likeCheck(id) {
    const user = auth.currentUser;

    if (!user) {
      console.log('No user is signed in');
      return;
    }

    try {
      const recipeDoc = await getDoc(doc(db, 'recipes', id));

      if (!recipeDoc.exists()) {
        console.log('Recipe not found');
        return;
      }

      const emailArray = recipeDoc.data().Email_Array || [];
      const isEmailInArray = emailArray.includes(user.email);

      if (isEmailInArray) {
        await updateRemove(id, user.email);
      } else {
        await updateAdd(id, user.email);
      }

      await getLen(id);
    } catch (error) {
      console.error('Error checking like:', error);
    }
  }
  async function updateRemove(id, email) {
    const docRef = doc(db, 'recipes', id);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const emailArray = data.Email_Array || [];

        const updatedEmailArray = emailArray.filter(item => item !== email);

        await updateDoc(docRef, {
          Email_Array: updatedEmailArray
        });

        console.log('Field updated successfully');
      } else {
        console.log('Document not found');
      }
    } catch (error) {
      console.error('Error updating field: ', error);
    }
  }

  async function updateAdd(id, email) {
    const docRef = doc(db, 'recipes', id);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const emailArray = data.Email_Array || [];

        emailArray.push(email);

        await updateDoc(docRef, {
          Email_Array: emailArray
        });

        console.log('Field updated successfully');
      } else {
        console.log('Document not found');
      }
    } catch (error) {
      console.error('Error updating field: ', error);
    }
  }

  useEffect(() => {
    displayData();
    getLen(id);
  }, [id]);

  useEffect(() => {
  }, [count]);

  return (
    <div className="info">
      <Header />
      {recipe ? (
        
        <div className='info-container'>
          <div className="info2 d-flex">
            <div className='info-image'>
              <img src={recipe.image || ""} />
            </div>

            <div className="flex-column">
              <h3>{recipe.title}</h3>

              
              <div className="d-flex ingredient-info">
                <div>Ingredients:</div>
                {recipe.ingredients && recipe.ingredients.length > 0 ? (
                  recipe.ingredients.map((ingredient, index) => (
                    <div key={index}>
                      <div className="p-info">{ingredient},&nbsp;</div>
                    </div>
                  )
                  )
                ) : (
                  <p>No ingredients available</p>
                )}
              </div>
              <p className="p-info">{recipe.description}</p>
              <p>made by:{recipe.email}</p>
              <div className="info-buttons">
                <button className="deleteB fas fa-trash-alt" onClick={() => handleDelete(id)}> Delete</button>
                <Link className=" fas fa-edit" to={`/Update/${id}`}> Edit</Link>
                <button className="Like fas fa-thumbs-up" onClick={() => likeCheck(recipe.id)}> Likes: {count}</button>
              </div>

            </div>

          </div>
        </div>
      ) : (
        <p>Loading recipe...</p>
      )}
    </div>
  );
}
