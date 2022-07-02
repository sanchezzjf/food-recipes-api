import { readFile, writeFile } from 'node:fs/promises'

export default class RecipeRepository {
    constructor({ database }){
        this.database = database
    }

    //private function
    async #currentFileContent(){
        return JSON.parse(await readFile(this.database))
    }

    find(){
        return this.#currentFileContent()
    }

    async create(data){
        const currentFile = await this.#currentFileContent()
        currentFile.push(data)

        await writeFile(this.database, JSON.stringify(currentFile))

        return data.id
    }
}
/* 
const recipeRepository = new RecipeRepository({ database: './database/db.json' })


console.log(
    await recipeRepository.create({
        id: 2,
        title: 'teste'
    })
)

console.log(
    await recipeRepository.find()
)
 */