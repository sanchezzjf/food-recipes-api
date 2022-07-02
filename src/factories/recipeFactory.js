import RecipeRepository from "../repositories/recipeRepository.js"
import RecipeService from "../services/recipeService.js"

const generateInstance = ({ filePath }) => {
    //here goes all db connections

    const recipeRepository = new RecipeRepository({ database: filePath })

    const recipeService = new RecipeService({ repository: recipeRepository })

    return recipeService
}

export { generateInstance }