import React from 'react'
import Addrecipes from './components/Data/AddRecipes';
import SignUp from './components/authentication/Signup';
import SignIn from './components/authentication/SignIn';
import UsersRecipes from './components/data/UsersRecipes';
import ApiRecipes from './components/data/ApiRecipes';
import MyRecipes from './components/Data/MyRecipes';
import ApiInfo from './components/data/ApiInfo';
import RecipeInfo from "./components/data/RecipeInfo";
import Update from "./components/data/Update";
import UserRecipeInfo from './components/data/UsersRecipeInfo';




import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <>
      <Router>
        <div>
          <Switch>
            <Route path="/AddRecipes">
              <Addrecipes />
            </Route>
            <Route path="/SignIn">
              <SignIn />
            </Route>
            <Route path="/SignUp">
              <SignUp />
            </Route>
            <Route path="/ApiRecipes">
              <ApiRecipes/>
            </Route>
            <Route path="/UsersRecipes">
              <UsersRecipes/>
            </Route>
            <Route path="/MyRecipes">
              <MyRecipes/>
            </Route>
            <Route path="/ApiInfo/:id">
              <ApiInfo/>
            </Route>
            <Route path="/RecipeInfo/:id">
              <RecipeInfo/>
            </Route>
            <Route path="/Update/:id">
              <Update/>
            </Route>
            <Route path="/UserRecipeInfo/:id">
              <UserRecipeInfo/>
            </Route>
            <Route path="/">
              <Home/>
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

function Home() {
  return (
    <>
      <SignIn />
    </>
  )
}