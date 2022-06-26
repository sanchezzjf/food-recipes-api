import { randomUUID } from 'node:crypto'

export default class Recipe {
    constructor({ tittle, ingredients, prepare }){
        this.id = randomUUID()
        this.tittle = tittle
        this.ingredients = ingredients
        this.prepare = prepare
    }
}