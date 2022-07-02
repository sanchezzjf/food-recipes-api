export default class RecipeService {
    constructor({ repository }){
        this.repository = repository
    }

    find(){
        return this.repository.find()
    }

    create(data){
        return this.repository.create(data)
    }
}