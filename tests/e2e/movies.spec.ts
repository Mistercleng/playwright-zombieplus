import { expect } from '@playwright/test';
import { test } from '../support';

import { executeSQL } from '../support/database';

import data from '../support/fixtures/movies.json'

test.beforeAll( () => {
   executeSQL(`DELETE FROM movies`)
})

test('should add a new movie', async ({ page, movies, login, toast}) => {

  const movie = data.create
  await login.do('admin@zombieplus.com', 'pwd123', 'Admin')
  await movies.create(movie)
  await toast.haveText('UhullCadastro realizado com sucesso!')

})

test('should add a new movie when this movie already exist', async ({ page, movies, login, toast, api }) => {
  const movie = data.duplicate
  await api.postMovie(movie)

  await login.do('admin@zombieplus.com', 'pwd123', 'Admin')
  await movies.create(movie)
  await toast.haveText('Oops!Este conteúdo já encontra-se cadastrado no catálogo')

})

test('should not add a new movie when the required fields are not fill', async ({ page, login, movies}) => {
  await login.do('admin@zombieplus.com', 'pwd123', 'Admin')
  await movies.goForm()
  await movies.submit()
  await movies.alertHaveText([
    'Por favor, informe o título.',
    'Por favor, informe a sinopse.',
    'Por favor, informe a empresa distribuidora.',
    'Por favor, informe o ano de lançamento.'
  ])

})  

