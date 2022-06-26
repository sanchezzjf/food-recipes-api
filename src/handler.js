import { parse } from 'node:url'
import { routes } from './routes/recipeRoute.js'
import { DEFAULT_HEADER } from './util/util.js'

const recipeRoutes = routes({
    recipeService: {}
})
const allRoutes = {
    ...recipeRoutes,
    default: (req, res) => {
        res.writeHead(404, DEFAULT_HEADER)
        res.write('Hello')
        res.end()
    }
}

function handler (req, res) {
    const {
        url,
        method
    } = req

    const { pathname } = parse(url, true)

    const key = `${pathname}:${method.toLowerCase()}`

    const chosenRoute = allRoutes[key] || allRoutes.default
    
    return Promise.resolve(chosenRoute(req,res))
                    .catch(errorHandler(res))
}

function errorHandler(res){
    return err => {
        console.log('Something bad happened **', err.stack)
        res.writeHead(500, DEFAULT_HEADER)
        res.write(JSON.stringify({
            error: 'Internal server error'
        }))

        return res.end()
    }
}

export { handler }