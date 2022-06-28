import test from 'node:test'
import assert from 'node:assert'
import { promisify } from 'node:util'

test('Recipe integration test suite', async (t) => {
    const testPort = 9000

    // Bad pratice
    process.env.PORT = testPort

    const {server} = await import('../../src/index.js')
    
    const testServerAddress = `http://localhost:${testPort}/api/recipe`

    await t.test('it should create a recipe', async (t) => {
        const data = {
            "tittle": "Bolinho de Arroz Vegano",
            "ingredients": [
                {
                    "name": "Arroz",
                    "qntd": "2 xicaras"
                },
                {
                    "name": "Farinha de Trigo",
                    "qntd": "3 xicaras"
                },
                {
                    "name": "Linhaça",
                    "qntd": "2 colheres de sopa"
                },
                {
                    "name": "Agua",
                    "qntd": "1 xicara"
                },
                {
                    "name": "Tempero",
                    "qntd": "A gosto"
                }
            ],
            "prepare": "Dolore ullamco Lorem dolore ullamco mollit id id eu proident nostrud velit sint consequat est. Eu veniam cupidatat adipisicing in eiusmod consequat minim tempor amet consequat quis incididunt nostrud enim. Occaecat elit ullamco magna commodo consectetur incididunt quis et culpa. Et dolor do ea dolore minim ullamco consequat adipisicing Lorem id excepteur. Duis duis elit occaecat duis cupidatat dolore veniam do sit cillum ex minim magna."
        }

        const req = await fetch(testServerAddress, {
            method: 'POST',
            body: JSON.stringify(data)
        })

        assert.deepStrictEqual(
            req.headers.get('content-type'),
            'application/json'
        )

        assert.strictEqual(req.status, 201)

        const result = await req.json()

        assert.deepStrictEqual(
            result.success,
            'Recipe created with success!',
            'It should return a valid response'
        )
        assert.ok(
            result.id.length > 30,
            'ID should be a UUID',

        )

    })
    await promisify(server.close.bind(server))()
})