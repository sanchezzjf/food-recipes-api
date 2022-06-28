import { readFile, writeFile } from 'node:fs/promises'

export default class RecipeRepository {
    constructor({ file }){
        this.file = file
    }

    //private function
    async #currentFileContent(){
        return JSON.parse(await readFile(this.file))
    }

    find(){
        return this.#currentFileContent()
    }

    create(data){
        const currentFile = this.#currentFileContent()
        currentFile.push(data)

        await writeFile(this.file, JSON.stringify(currentFile))

        return data.id
    }

}