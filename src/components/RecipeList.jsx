import RecipeItem from './RecipeItem'

function RecipeList({
  recipes,
  onView,
  onEdit,
  onDelete,
  onFavourite,
  onAddRecipe,
}) {
  if (recipes.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-illustration" aria-hidden="true">🥣</span>
        <p className="eyebrow">A FRESH PAGE</p>
        <h3>No recipes here just yet</h3>
        <p>
          Add a favorite from your kitchen, or try a different search or category.
        </p>
        <button className="button button-dark" onClick={onAddRecipe}>
          <span aria-hidden="true">＋</span> Add a recipe
        </button>
      </div>
    )
  }

  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <RecipeItem
          key={recipe.id}
          recipe={recipe}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          onFavourite={onFavourite}
        />
      ))}
    </div>
  )
}

export default RecipeList
