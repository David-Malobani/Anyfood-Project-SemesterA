import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../firebase';
import { collection, getDocs, doc, deleteDoc, where, query } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../page/Header';


export default function MyRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [user, setUser] = useState(null);


    const fetchRecipes = async () => {
        const user = auth.currentUser;
        try {
            const q = query(collection(db, "recipes"), where("email", "==", user.email));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                console.log("No recipes found for this user.");
                return;
            }

            const fetchedData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setRecipes(fetchedData);
        } catch (error) {
            console.error("Error fetching recipes: ", error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        fetchRecipes();
    }, []);





    return (
        <div className='my-recipes'>
            <Header />
            <div className='title-backg d-flex justify-content-evenly'>
                <div className='rec-title-img1'><img src="https://m.media-amazon.com/images/I/61puwQ4QrYL._AC_UF1000,1000_QL80_.jpg" /></div>
                <div>
                    <div className='recipes-title'>
                        <h2>My Recipes</h2>
                    </div>
                    <div className='create-button'>
                        <Link className='fas fa-plus-circle' to="/AddRecipes"> New recipe</Link>
                    </div>
                </div>
                <div className='rec-title-img2'><img src="https://m.media-amazon.com/images/I/61puwQ4QrYL._AC_UF1000,1000_QL80_.jpg" /></div>
            </div>
            <div className="d-flex flex-wrap justify-content-evenly">
                {recipes.map((recipe) => (
                    <Link className='cardd col-6 col-md-3' key={recipe.id} to={`/RecipeInfo/${recipe.id}`}>
                        <div className='meal-img'>
                            <img src={recipe.image || "https://via.placeholder.com/150"} />
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
