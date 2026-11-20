
function RecipeItem({
  recipe,
  onView,
  onEdit,
  onDelete,
  onFavourite,
}) {
  return (
    <div className="recipe-card">
      <h3>{recipe.name}</h3>

      <p>Category: {recipe.category}</p>

      <p>
        Ingredients: {recipe.ingredients.length}
      </p>

      <button onClick={() => onView(recipe)}>
        View Details
      </button>

      <button onClick={() => onEdit(recipe)}>
        Edit
      </button>

      <button onClick={() => onDelete(recipe.id)}>
        Delete
      </button>

      <button onClick={() => onFavourite(recipe.id)}>
        {recipe.favourite
          ? '❤️ Remove Favourite'
          : '🤍 Add Favourite'}
      </button>
    </div>
  )
}

export default RecipeItem
