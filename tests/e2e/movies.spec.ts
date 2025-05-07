import { expect } from '@playwright/test';
import { test } from '../support';

import { executeSQL } from '../support/database';

import data from '../support/fixtures/movies.json'

test.beforeAll( () => {
   executeSQL(`DELETE FROM movies`)
})

test('should add a new movie', async ({ page, movies, login, popup}) => {

  const movie = data.create
  await login.do('admin@zombieplus.com', 'pwd123', 'Admin')
  await movies.create(movie)
  await popup.haveText(`O filme '${movie.title}' foi adicionado ao catálogo.`)

})

test('should remove a film', async ({page,login,api,movies,popup}) => {
  const movie = data.to_remove
  await api.postMovie(movie)
  await login.do('admin@zombieplus.com', 'pwd123', 'Admin')
  await movies.remove(movie.title)
  await popup.haveText('Filme removido com sucesso.')

})

test('should add a new movie when this movie already exist', async ({ page, movies, login, popup, api }) => {
  const movie = data.duplicate
  await api.postMovie(movie)

  await login.do('admin@zombieplus.com', 'pwd123', 'Admin')
  await movies.create(movie)
  await popup.haveText(`O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)

})

test('should not add a new movie when the required fields are not fill', async ({ page, login, movies}) => {
  await login.do('admin@zombieplus.com', 'pwd123', 'Admin')
  await movies.goForm()
  await movies.submit()
  await movies.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório',
    'Campo obrigatório',
    'Campo obrigatório'
  ])

})  

test('should serach for tearm zumbi', async ({page,api,login,movies})=>{
  const moviess = data.search

  moviess.data.forEach(async (m) => {
    await api.postMovie(m)
  })

  await login.do('admin@zombieplus.com', 'pwd123', 'Admin')
  await movies.search(moviess.input)

  await movies.tableHave(moviess.outputs)

})
