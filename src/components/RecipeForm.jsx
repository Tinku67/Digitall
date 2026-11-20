import { useState } from 'react'

const categories = ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Dessert', 'Drinks']

function RecipeForm({ onSave, editingRecipe, onCancel }) {
  const [name, setName] = useState(() => editingRecipe?.name ?? '')
  const [description, setDescription] = useState(() => editingRecipe?.description ?? '')
  const [ingredients, setIngredients] = useState(() => editingRecipe?.ingredients?.join('\n') ?? '')
  const [instructions, setInstructions] = useState(() => editingRecipe?.instructions ?? '')
  const [category, setCategory] = useState(() => editingRecipe?.category ?? 'Breakfast')
  const [prepTime, setPrepTime] = useState(() => String(editingRecipe?.prepTime ?? 30))
  const [servings, setServings] = useState(() => String(editingRecipe?.servings ?? 2))

  function handleSubmit(event) {
    event.preventDefault()

    onSave({
      id: editingRecipe?.id ?? Date.now(),
      name: name.trim(),
      description: description.trim(),
      ingredients: ingredients
        .split('\n')
        .map(item => item.trim())
        .filter(Boolean),
      instructions: instructions.trim(),
      category,
      prepTime: Number(prepTime),
      servings: Number(servings),
      favourite: editingRecipe?.favourite ?? false,
    })
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={event => {
        if (event.target === event.currentTarget) onCancel()
      }}
    >
      <section
        className="modal-panel form-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="recipe-form-title"
      >
        <div className="modal-heading">
          <div>
            <p className="eyebrow">{editingRecipe ? 'MAKE IT YOUR OWN' : 'ADD TO YOUR COOKBOOK'}</p>
            <h2 id="recipe-form-title">{editingRecipe ? 'Edit recipe' : 'A new favorite'}</h2>
          </div>
          <button className="icon-button" type="button" onClick={onCancel} aria-label="Close form">
            ×
          </button>
        </div>

        <form className="recipe-form" onSubmit={handleSubmit}>
          <label htmlFor="recipe-name">Recipe name</label>
          <input
            id="recipe-name"
            autoFocus
            maxLength="80"
            placeholder="e.g. Sunday lemon pancakes"
            value={name}
            onChange={event => setName(event.target.value)}
            required
          />

          <label htmlFor="recipe-description">A little note <span>(optional)</span></label>
          <input
            id="recipe-description"
            maxLength="140"
            placeholder="What makes this one special?"
            value={description}
            onChange={event => setDescription(event.target.value)}
          />

          <div className="form-grid">
            <div>
              <label htmlFor="recipe-category">Category</label>
              <select
                id="recipe-category"
                value={category}
                onChange={event => setCategory(event.target.value)}
              >
                {categories.map(item => <option key={item}>{item}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="recipe-time">Prep time</label>
              <div className="input-suffix">
                <input
                  id="recipe-time"
                  type="number"
                  min="1"
                  max="999"
                  value={prepTime}
                  onChange={event => setPrepTime(event.target.value)}
                  required
                />
                <span>min</span>
              </div>
            </div>
            <div>
              <label htmlFor="recipe-servings">Servings</label>
              <div className="input-suffix">
                <input
                  id="recipe-servings"
                  type="number"
                  min="1"
                  max="99"
                  value={servings}
                  onChange={event => setServings(event.target.value)}
                  required
                />
                <span>people</span>
              </div>
            </div>
          </div>

          <label htmlFor="recipe-ingredients">Ingredients <span>(one per line)</span></label>
          <textarea
            id="recipe-ingredients"
            rows="5"
            placeholder={'1 cup flour\n2 ripe bananas\nA pinch of cinnamon'}
            value={ingredients}
            onChange={event => setIngredients(event.target.value)}
            required
          />

          <label htmlFor="recipe-instructions">Method</label>
          <textarea
            id="recipe-instructions"
            rows="5"
            placeholder="Write the steps, one at a time..."
            value={instructions}
            onChange={event => setInstructions(event.target.value)}
            required
          />

          <div className="form-actions">
            <button className="button button-quiet" type="button" onClick={onCancel}>
              Cancel
            </button>
            <button className="button button-dark" type="submit">
              {editingRecipe ? 'Save changes' : 'Save recipe'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default RecipeForm
