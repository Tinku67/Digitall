const categoryEmojis = {
  Breakfast: '🥞',
  Lunch: '🥗',
  Dinner: '🍝',
  Snacks: '🥑',
  Dessert: '🍰',
  Drinks: '🍹',
}

function RecipeItem({ recipe, onView, onEdit, onDelete, onFavourite }) {
  const categoryClass = (recipe.category ?? 'dinner').toLowerCase()

  return (
    <article className="recipe-card">
      <div className={`recipe-card-art recipe-art--${categoryClass}`}>
        <span className="card-category">{recipe.category ?? 'Recipe'}</span>
        <span className="card-emoji" aria-hidden="true">
          {categoryEmojis[recipe.category] ?? '🍽️'}
        </span>
        <button
          className={`favorite-button${recipe.favourite ? ' is-favorite' : ''}`}
          onClick={() => onFavourite(recipe.id)}
          aria-label={recipe.favourite ? `Remove ${recipe.name} from favorites` : `Add ${recipe.name} to favorites`}
          aria-pressed={Boolean(recipe.favourite)}
        >
          {recipe.favourite ? '♥' : '♡'}
        </button>
      </div>

      <div className="recipe-card-content">
        <h3>{recipe.name}</h3>
        <p className="recipe-description">
          {recipe.description || `${recipe.ingredients?.length ?? 0} simple ingredients, made with love.`}
        </p>

        <div className="recipe-meta">
          <span><span aria-hidden="true">◷</span> {recipe.prepTime ?? '—'} min</span>
          <span><span aria-hidden="true">♧</span> Serves {recipe.servings ?? '—'}</span>
        </div>

        <div className="recipe-card-actions">
          <button className="view-recipe-button" onClick={() => onView(recipe)}>
            View recipe <span aria-hidden="true">→</span>
          </button>
          <div className="card-icon-actions">
            <button className="icon-button" onClick={() => onEdit(recipe)} aria-label={`Edit ${recipe.name}`}>
              <span aria-hidden="true">✎</span>
            </button>
            <button className="icon-button" onClick={() => onDelete(recipe.id)} aria-label={`Delete ${recipe.name}`}>
              <span aria-hidden="true">⌫</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default RecipeItem
