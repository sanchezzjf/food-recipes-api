import { once } from 'node:events'
import Recipe from '../entities/recipe.js'
import { DEFAULT_HEADER } from '../util/util.js'

const routes = ({
    recipeService
}) => ({
    '/api/recipes:get': async (req, res) => {
        const recipes = await recipeService.find()
        res.write(JSON.stringify({results: recipes}))
        res.end()
    },
    '/api/recipes:post': async (req, res) => {

        const data = await once(req, 'data')
        const item = JSON.parse(data)
        const recipe = new Recipe(item)

        const id = await recipeService.create(recipe)

        res.writeHead(201, DEFAULT_HEADER)
        res.write(JSON.stringify({
            id,
            success: 'Recipe created with success!',
        }))

        return res.end()
    }
})

export { routes }