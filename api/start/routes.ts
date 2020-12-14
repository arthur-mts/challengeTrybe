/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('/login', 'TokenController.create').as('Login')

    Route.group(() => {
      Route.get('/', 'CryptosController.index').as('Get actual crypto currencies')
      Route.post('/', 'CurrenciesController.update').as('Update currency')
    })
      .prefix('/crypto')
      .middleware(['auth'])
  }).prefix('/api')

  //CAPTURANDO ENDPOINTS INEXISTENTES
  Route.any('*', async ({ response }) => {
    return response.status(404).send({
      message: 'Endpoint não encontrado',
    })
  })
}).middleware(async (ctx, next) => {
  if (process.env.NODE_ENV !== 'testing')
    console.log(`[${ctx.request.method()}] ON ${ctx.request.url()}`)
  await next()
})
