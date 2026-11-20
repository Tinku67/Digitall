
import {useState, useEffect} from 'react'

function RecipeForm({onSave, editingRecipe, onCancel}) {
  const [name, setName] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [instructions, setInstructions] = useState('')
  const [category, setCategory] = useState('Breakfast')

  // Fill form when editing a recipe
  useEffect(() => {
    if (editingRecipe) {
      setName(editingRecipe.name)
      setIngredients(editingRecipe.ingredients.join('\n'))
      setInstructions(editingRecipe.instructions)
      setCategory(editingRecipe.category)
    } else {
      setName('')
      setIngredients('')
      setInstructions('')
      setCategory('Breakfast')
    }
  }, [editingRecipe])

  const handleSubmit = event => {
    event.preventDefault()

    const recipe = {
      id: editingRecipe ? editingRecipe.id : Date.now(),
      name: name.trim(),
      ingredients: ingredients
        .split('\n')
        .map(item => item.trim())
        .filter(item => item !== ''),
      instructions: instructions.trim(),
      category: category,
      favourite: editingRecipe
        ? editingRecipe.favourite
        : false,
    }

    onSave(recipe)

    setName('')
    setIngredients('')
    setInstructions('')
    setCategory('Breakfast')
  }

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <h2>{editingRecipe ? 'Edit Recipe' : 'Add New Recipe'}</h2>

      <label>Recipe Name</label>
      <input
        type="text"
        placeholder="Enter recipe name"
        value={name}
        onChange={event => setName(event.target.value)}
        required
      />

      <label>Ingredients</label>
      <textarea
        placeholder="Enter ingredients (one per line)"
        value={ingredients}
        onChange={event => setIngredients(event.target.value)}
        required
      />

      <label>Instructions</label>
      <textarea
        placeholder="Enter cooking instructions"
        value={instructions}
        onChange={event => setInstructions(event.target.value)}
        required
      />

      <label>Category</label>
      <select
        value={category}
        onChange={event => setCategory(event.target.value)}
      >
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snacks">Snacks</option>
        <option value="Dessert">Dessert</option>
        <option value="Drinks">Drinks</option>
      </select>

      <button type="submit">
        {editingRecipe ? 'Update Recipe' : 'Add Recipe'}
      </button>

      {editingRecipe && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  )
}

export default RecipeForm
