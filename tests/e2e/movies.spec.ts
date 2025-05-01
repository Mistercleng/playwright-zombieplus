import { test } from '../support';

import { executeSQL } from '../support/database';

import data from '../support/fixtures/movies.json'


test('should add a new movie', async ({ page, movies, login, toast}) => {

  const movie = data.create
  executeSQL(`DELETE FROM movies WHERE title='${movie.title}';`)
  await login.do('admin@zombieplus.com', 'pwd123', 'Admin')
  await movies.create(movie.title, movie.overview, movie.company, movie.release_year)
  await toast.haveText('UhullCadastro realizado com sucesso!')

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