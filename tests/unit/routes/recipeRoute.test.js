import test from 'node:test'
import assert from 'node:assert'

const callTracker = new assert.CallTracker()
process.on('exit', () => callTracker.verify())

import { routes } from './../../../src/routes/recipeRoute.js'
import { DEFAULT_HEADER } from '../../../src/util/util.js'

test("Recipe Routes - endpoint test suite", async (t) => {
    await t.test('it should call /api/recipe:get route', async () => {
        //mock object
        const databaseMock = [
            {
                "id": "ad381c41-6025-422b-b6f0-01d580abcf25",
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
        ]

        const recipeServiceStub = {
            find: async () => databaseMock
        }

        const endpoints = routes({
            recipeService: recipeServiceStub
        })

        const endpoint = '/api/recipes:get'
        const request = {}
        const response = {
            write: callTracker.calls(item => {
                const expected = JSON.stringify({
                    results: databaseMock
                })
                assert.strictEqual(item, expected, 'write should be called with the correct payload')
            }),
            end: callTracker.calls(item => {
                assert.strictEqual(item, undefined, 'end should be called with no params')
            })
        } 
        
        const route = endpoints[endpoint]
        await route(request, response)

    })
    await t.test('it should call /api/recipes:post route', async () => {
        const recipeServiceStub = {
            create: async () => 'a'
        }
    })
})