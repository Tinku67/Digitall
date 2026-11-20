
import RecipeItem from './RecipeItem'

function RecipeList({
  recipes,
  onView,
  onEdit,
  onDelete,
  onFavourite,
}) {
  return (
    <div className="recipe-list">
      {recipes.length === 0 ? (
        <p className="empty-message">No recipes found!</p>
      ) : (
        recipes.map(eachRecipe => (
          <RecipeItem
            key={eachRecipe.id}
            recipe={eachRecipe}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
            onFavourite={onFavourite}
          />
        ))
      )}
    </div>
  )
}

export default RecipeList
