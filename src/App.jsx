import { useEffect, useMemo, useState } from 'react'
import RecipeForm from './components/RecipeForm'
import RecipeList from './components/RecipeList'
import RecipeDetails from './components/RecipeDetails'
import './App.css'

const categories = ['All recipes', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Dessert', 'Drinks']

function readSavedRecipes() {
  const savedRecipes = window.localStorage.getItem('recipes')
  return savedRecipes ? JSON.parse(savedRecipes) : []
}

function App() {
  const [recipes, setRecipes] = useState(readSavedRecipes)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All recipes')
  const [showFavourites, setShowFavourites] = useState(false)
  const [editingRecipe, setEditingRecipe] = useState(null)
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    window.localStorage.setItem('recipes', JSON.stringify(recipes))
  }, [recipes])

  const filteredRecipes = useMemo(() => {
    const searchText = search.trim().toLowerCase()

    return recipes.filter(recipe => {
      const ingredients = Array.isArray(recipe.ingredients)
        ? recipe.ingredients.join(' ')
        : ''
      const matchesSearch = [
        recipe.name,
        recipe.description,
        recipe.category,
        ingredients,
      ]
        .join(' ')
        .toLowerCase()
        .includes(searchText)

      return (
        matchesSearch &&
        (category === 'All recipes' || recipe.category === category) &&
        (!showFavourites || recipe.favourite)
      )
    })
  }, [recipes, search, category, showFavourites])

  const favouriteCount = recipes.filter(recipe => recipe.favourite).length
  const categoryCount = new Set(recipes.map(recipe => recipe.category)).size

  function openNewRecipe() {
    setEditingRecipe(null)
    setIsFormOpen(true)
  }

  function openEditRecipe(recipe) {
    setSelectedRecipe(null)
    setEditingRecipe(recipe)
    setIsFormOpen(true)
  }

  function handleSave(recipe) {
    setRecipes(currentRecipes =>
      editingRecipe
        ? currentRecipes.map(current =>
            current.id === recipe.id ? recipe : current
          )
        : [recipe, ...currentRecipes]
    )
    setIsFormOpen(false)
    setEditingRecipe(null)
  }

  function handleDelete(id) {
    if (!window.confirm('Delete this recipe from your collection?')) {
      return
    }

    setRecipes(currentRecipes =>
      currentRecipes.filter(recipe => recipe.id !== id)
    )
    setSelectedRecipe(current =>
      current?.id === id ? null : current
    )
    setEditingRecipe(current =>
      current?.id === id ? null : current
    )
  }

  function handleFavourite(id) {
    setRecipes(currentRecipes =>
      currentRecipes.map(recipe =>
        recipe.id === id
          ? { ...recipe, favourite: !recipe.favourite }
          : recipe
      )
    )
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Savor recipe journal home">
          <span className="brand-mark" aria-hidden="true">s</span>
          <span>
            <strong>savor</strong>
            <small>YOUR RECIPE JOURNAL</small>
          </span>
        </a>
        <nav className="topbar-actions" aria-label="Main navigation">
          <a className="nav-link" href="#collection">My collection</a>
          <button className="button button-dark button-small" onClick={openNewRecipe}>
            <span aria-hidden="true">＋</span> Add a recipe
          </button>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span aria-hidden="true">✦</span> A LITTLE MORE DELICIOUS</p>
            <h1>Good food.<br /><em>Good memories.</em></h1>
            <p className="hero-description">
              Keep the recipes you love in one lovely place. Make something
              wonderful, then save it for next time.
            </p>
            <div className="hero-actions">
              <button className="button button-dark" onClick={openNewRecipe}>
                <span aria-hidden="true">＋</span> Add your first recipe
              </button>
              <a className="text-link" href="#collection">Explore your collection <span aria-hidden="true">↓</span></a>
            </div>
            <div className="hero-note">
              <span className="note-icon" aria-hidden="true">♡</span>
              <span>Made for the recipes that feel like home.</span>
            </div>
          </div>
          <div className="hero-art" aria-label="Illustration of a warm meal">
            <div className="art-sun" />
            <span className="art-sparkle sparkle-one" aria-hidden="true">✳</span>
            <span className="art-sparkle sparkle-two" aria-hidden="true">✦</span>
            <div className="plate">
              <span className="plate-food" aria-hidden="true">🍝</span>
            </div>
            <div className="art-caption">
              <span className="caption-dot" />
              <span>Something good is cooking</span>
            </div>
            <div className="art-leaf leaf-one" />
            <div className="art-leaf leaf-two" />
          </div>
        </section>

        <section className="collection-stats" aria-label="Collection summary">
          <div className="stat-item">
            <span className="stat-icon stat-icon-green" aria-hidden="true">▤</span>
            <span><strong>{recipes.length}</strong><small>recipes saved</small></span>
          </div>
          <span className="stat-divider" />
          <div className="stat-item">
            <span className="stat-icon stat-icon-peach" aria-hidden="true">♡</span>
            <span><strong>{favouriteCount}</strong><small>favorites</small></span>
          </div>
          <span className="stat-divider" />
          <div className="stat-item">
            <span className="stat-icon stat-icon-yellow" aria-hidden="true">✿</span>
            <span><strong>{categoryCount}</strong><small>categories explored</small></span>
          </div>
        </section>

        <section className="collection-section" id="collection">
          <div className="section-heading">
            <div>
              <p className="eyebrow">YOUR PERSONAL COOKBOOK</p>
              <h2>Recipes to come back to</h2>
              <p className="section-subtitle">
                A collection of tried, loved, and soon-to-be favorites.
              </p>
            </div>
            <button className="button button-outline" onClick={openNewRecipe}>
              <span aria-hidden="true">＋</span> New recipe
            </button>
          </div>

          <div className="recipe-toolbar">
            <label className="search-box">
              <span className="search-icon" aria-hidden="true">⌕</span>
              <span className="sr-only">Search recipes</span>
              <input
                type="search"
                placeholder="Search recipes or ingredients..."
                value={search}
                onChange={event => setSearch(event.target.value)}
              />
              {search && (
                <button
                  className="clear-search"
                  type="button"
                  onClick={() => setSearch('')}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </label>
            <button
              className={`favorite-filter${showFavourites ? ' is-active' : ''}`}
              onClick={() => setShowFavourites(value => !value)}
              aria-pressed={showFavourites}
            >
              <span aria-hidden="true">{showFavourites ? '♥' : '♡'}</span>
              Favorites
            </button>
          </div>

          <div className="category-tabs" aria-label="Filter by category">
            {categories.map(item => (
              <button
                className={`category-tab${category === item ? ' is-active' : ''}`}
                key={item}
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="results-row">
            <span>{showFavourites ? 'YOUR FAVORITES' : category.toUpperCase()}</span>
            <span>{filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'}</span>
          </div>

          <RecipeList
            recipes={filteredRecipes}
            onView={setSelectedRecipe}
            onEdit={openEditRecipe}
            onDelete={handleDelete}
            onFavourite={handleFavourite}
            onAddRecipe={openNewRecipe}
          />
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark" aria-hidden="true">s</span>
          <span><strong>savor</strong><small>YOUR RECIPE JOURNAL</small></span>
        </a>
        <p>Made with care, and a little pinch of salt.</p>
        <a href="#top" className="back-to-top">Back to top ↑</a>
      </footer>

      {isFormOpen && (
        <RecipeForm
          onSave={handleSave}
          editingRecipe={editingRecipe}
          onCancel={() => {
            setIsFormOpen(false)
            setEditingRecipe(null)
          }}
        />
      )}

      <RecipeDetails
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        onEdit={openEditRecipe}
      />
    </div>
  )
}

export default App
