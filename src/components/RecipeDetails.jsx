import { useEffect } from 'react'

function RecipeDetails({ recipe, onClose, onEdit }) {
  useEffect(() => {
    if (!recipe) return undefined

    const handleKeyDown = event => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [recipe, onClose])

  if (!recipe) return null

  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : []
  const steps = (recipe.instructions ?? '')
    .split(/\n+/)
    .map(step => step.trim())
    .filter(Boolean)

  return (
    <div
      className="modal-backdrop"
      onMouseDown={event => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <article
        className="modal-panel details-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="recipe-detail-title"
      >
        <div className={`details-art recipe-art--${(recipe.category ?? 'dinner').toLowerCase()}`}>
          <span className="details-category">{recipe.category ?? 'Recipe'}</span>
          <span className="details-emoji" aria-hidden="true">🍽️</span>
          <button className="icon-button details-close" onClick={onClose} aria-label="Close recipe">
            ×
          </button>
        </div>

        <div className="details-content">
          <p className="eyebrow">FROM YOUR RECIPE JOURNAL</p>
          <h2 id="recipe-detail-title">{recipe.name}</h2>
          {recipe.description && <p className="details-description">{recipe.description}</p>}

          <div className="details-meta">
            <span><span aria-hidden="true">◷</span> {recipe.prepTime ?? '—'} min</span>
            <span><span aria-hidden="true">♧</span> Serves {recipe.servings ?? '—'}</span>
            <span><span aria-hidden="true">♡</span> {ingredients.length} ingredients</span>
          </div>

          <div className="details-columns">
            <section>
              <h3>What you’ll need</h3>
              {ingredients.length ? (
                <ul className="ingredient-list">
                  {ingredients.map((ingredient, index) => (
                    <li key={`${ingredient}-${index}`}>{ingredient}</li>
                  ))}
                </ul>
              ) : (
                <p className="muted-copy">No ingredients added yet.</p>
              )}
            </section>
            <section>
              <h3>Let’s make it</h3>
              {steps.length ? (
                <ol className="instruction-list">
                  {steps.map((step, index) => <li key={`${step}-${index}`}>{step}</li>)}
                </ol>
              ) : (
                <p className="muted-copy">No method added yet.</p>
              )}
            </section>
          </div>

          <div className="details-actions">
            <button className="button button-quiet" onClick={onClose}>Close</button>
            {onEdit && (
              <button className="button button-dark" onClick={() => onEdit(recipe)}>
                Edit recipe
              </button>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}

export default RecipeDetails
