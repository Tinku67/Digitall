
import {useState, useEffect} from 'react'

import RecipeForm from './components/RecipeForm'
import RecipeList from './components/RecipeList'
import RecipeDetails from './components/RecipeDetails'

function App() {
  // Store recipes in state
  const [recipes, setRecipes] = useState(() => {
    const savedRecipes = localStorage.getItem('recipes')

    return savedRecipes ? JSON.parse(savedRecipes) : []
  })

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [showFavourites, setShowFavourites] = useState(false)

  const [editingRecipe, setEditingRecipe] = useState(null)
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  // Save recipes in localStorage
  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
  }, [recipes])

  // Add or update recipe
  const handleSave = recipe => {
    if (editingRecipe) {
      setRecipes(prev =>
        prev.map(eachRecipe =>
          eachRecipe.id === recipe.id ? recipe : eachRecipe
        )
      )

      setEditingRecipe(null)
    } else {
      setRecipes(prev => [...prev, recipe])
    }
  }

  // Delete recipe
  const handleDelete = id => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this recipe?'
    )

    if (confirmDelete) {
      setRecipes(prev =>
        prev.filter(eachRecipe => eachRecipe.id !== id)
      )

      if (selectedRecipe?.id === id) {
        setSelectedRecipe(null)
      }

      if (editingRecipe?.id === id) {
        setEditingRecipe(null)
      }
    }
  }

  // Add or remove favourite
  const handleFavourite = id => {
    setRecipes(prev =>
      prev.map(eachRecipe =>
        eachRecipe.id === id
          ? {
              ...eachRecipe,
              favourite: !eachRecipe.favourite,
            }
          : eachRecipe
      )
    )
  }

  // Search and filter recipes
  const filteredRecipes = recipes.filter(eachRecipe => {
    const searchText = search.toLowerCase()

    const matchesSearch =
      eachRecipe.name.toLowerCase().includes(searchText) ||
      eachRecipe.ingredients.some(item =>
        item.toLowerCase().includes(searchText)
      )

    const matchesCategory =
      category === 'All' ||
      eachRecipe.category === category

    const matchesFavourite =
      !showFavourites || eachRecipe.favourite

    return (
      matchesSearch &&
      matchesCategory &&
      matchesFavourite
    )
  })

  return (
    <div className="app">
      <h1>🍲 Digital Recipe Collection</h1>

      <p className="subtitle">
        Save, organize and explore your favourite recipes!
      </p>

      <RecipeForm
        onSave={handleSave}
        editingRecipe={editingRecipe}
        onCancel={() => setEditingRecipe(null)}
      />

      <h2>My Recipes ({filteredRecipes.length})</h2>

      {/* Search recipes */}
      <input
        type="text"
        className="search-input"
        placeholder="Search by recipe name or ingredient..."
        value={search}
        onChange={event => setSearch(event.target.value)}
      />

      {/* Filter recipes by category */}
      <select
        className="filter-select"
        value={category}
        onChange={event => setCategory(event.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snacks">Snacks</option>
        <option value="Dessert">Dessert</option>
        <option value="Drinks">Drinks</option>
      </select>

      {/* Show favourite recipes */}
      <button
        onClick={() => setShowFavourites(!showFavourites)}
      >
        {showFavourites
          ? 'Show All Recipes'
          : '❤️ Show Favourites'}
      </button>

      {/* Display recipe cards */}
      <RecipeList
        recipes={filteredRecipes}
        onView={setSelectedRecipe}
        onEdit={setEditingRecipe}
        onDelete={handleDelete}
        onFavourite={handleFavourite}
      />

      {/* Display full recipe details */}
      <RecipeDetails
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </div>
  )
}

export default App
