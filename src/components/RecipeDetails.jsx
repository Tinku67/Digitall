
function RecipeDetails({recipe, onClose}) {
  if (!recipe) {
    return null
  }

  return (
    <div className="recipe-details">
      <h2>{recipe.name}</h2>

      <h3>Category</h3>
      <p>{recipe.category}</p>

      <h3>Ingredients</h3>

      <ul>
        {recipe.ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <p>{recipe.instructions}</p>

      <button onClick={onClose}>Close</button>
    </div>
  )
}

export default RecipeDetails
