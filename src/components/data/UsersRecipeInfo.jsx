import React, { useState, useEffect } from "react";
import { auth, db } from "../../../firebase";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { useHistory, useParams } from "react-router-dom";
import Header from "../page/Header";


export default function UserRecipeInfo() {
  let { id } = useParams();
  let [recipe, setRecipe] = useState([]);
  let history = useHistory();
  let [count, setCount] = useState(0);
  let [comment, setComment] = useState("");
  let [comments, setComments] = useState([]);

  async function handleCommentSubmit() {
    const user = auth.currentUser;
    const newComment = {
      text: comment,
      user: user.email,
    };

    try {
      const docRef = doc(db, "recipes", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const updatedComments = [...(data.comments || []), newComment];

        await updateDoc(docRef, {
          comments: updatedComments,
        });

        setComments(updatedComments);
        setComment("");
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  }

  async function handleDeleteComment(index) {
    const user = auth.currentUser;
    if (!user) {
      console.log("No user is signed in");
      return;
    }

    try {
      const docRef = doc(db, "recipes", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const updatedComments = data.comments.filter(
          (comment, i) => i !== index || comment.user !== user.email
        );

        await updateDoc(docRef, {
          comments: updatedComments,
        });

        setComments(updatedComments);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  }

  
  async function getLen(id) {
    const recipeRef = doc(db, "recipes", id);
    try {
      const docSnap = await getDoc(recipeRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const emailArray = data.Email_Array || [];

        console.log("Fetched Email_Array:", emailArray); 
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

  async function likeCheck(id) {
    const user = auth.currentUser;

    if (!user) {
      console.log("No user is signed in");
      return;
    }

    try {
      const recipeDoc = await getDoc(doc(db, "recipes", id));

      if (!recipeDoc.exists()) {
        console.log("Recipe not found");
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
      console.error("Error checking like:", error);
    }
  }
  async function updateRemove(id, email) {
    const docRef = doc(db, "recipes", id);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const emailArray = data.Email_Array || [];

        const updatedEmailArray = emailArray.filter((item) => item !== email);

        await updateDoc(docRef, {
          Email_Array: updatedEmailArray,
        });

        console.log("Field updated successfully");
      } else {
        console.log("Document not found");
      }
    } catch (error) {
      console.error("Error updating field: ", error);
    }
  }

  async function updateAdd(id, email) {
    const docRef = doc(db, "recipes", id);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const emailArray = data.Email_Array || [];

        emailArray.push(email);

        await updateDoc(docRef, {
          Email_Array: emailArray,
        });

        console.log("Field updated successfully");
      } else {
        console.log("Document not found");
      }
    } catch (error) {
      console.error("Error updating field: ", error);
    }
  }

  useEffect(() => {
    displayData();
    getLen(id);
  }, [id]);

  useEffect(() => {}, [count]);

  return (
    <div className="info">
      <Header />
      {recipe ? (
        <div className="info-container">
          <div className="info2 d-flex">
            <div className="info-image">
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
                  ))
                ) : (
                  <p>No ingredients available</p>
                )}
              </div>
              <p className="p-info">{recipe.description}</p>
              <p>made by:{recipe.email}</p>
              <div className="info-buttons">
                <button
                  className="Like fas fa-thumbs-up"
                  onClick={() => likeCheck(recipe.id)}
                >
                  {" "}
                  Likes: {count}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading recipe...</p>
      )}
      <div className="comments">
        <h4>Comments</h4>
        <div className="add-comments">
          <div className="add-comment-title">add a commend:</div>
          <div className="add-commend-sub">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment"
            />
          </div>
        </div>
        <button className="add-comments-b" onClick={handleCommentSubmit}>
          Submit
        </button>
        <div>
          {comments.map((comment, index) => (
            <div key={index} className="commentt">
              <div className="comment">
                <div className="commend-top">
                  <strong>{comment.user}:</strong>
                </div>
                <div className="commend-buttom">{comment.text}</div>
              </div>
              {auth.currentUser && auth.currentUser.email === comment.user && (
                <button className="delete-com" onClick={() => handleDeleteComment(index)}> Delete ↑</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}