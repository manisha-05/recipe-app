import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {
  const APP_ID = "9206ae5f";
  const APP_KEY = "491f043bb69facd2f7d70869ff2c0ac1";

  const [recipes, setRecipes] = useState([]);
  const [search, setsearch] = useState('');
  const [query, setQuery] = useState('pizza');


  useEffect(() => {
    getRecipes();
  }, [query]);

 const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits); 
 };

 const updateSearch = e => {
    setsearch(e.target.value);
   

 }

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setsearch('');
  }
  return (
  
    <div className="App">
      <form onSubmit={getSearch} className="search-form" >
        <input type="text" className="search-bar" value={search} onChange={updateSearch}/>
        <button type="submit" className="search-button"> Search</button>
      </form>
      <div className="recipes">
   { recipes.map(recipe => (
      <Recipe 
      key={recipe.recipe.label} 
      title={recipe.recipe.label} 
      image={recipe.recipe.image}
      ingredients={recipe.recipe.ingredients}/>
    ))} 

</div>
    </div>
  );
};

export default App;
