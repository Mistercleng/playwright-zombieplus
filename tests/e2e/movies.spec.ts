import { test } from '../support';

import { executeSQL } from '../support/database';

import data  from '../support/fixtures/movies.json'


test('should add a ne movie', async({page})=> {

    const movie = data.create
    executeSQL(`DELETE FROM movies WHERE title='${movie.title}';`)
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com','pwd123')
    await page.movies.isLoggedIn()
    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year)
    await page.toast.haveText('UhullCadastro realizado com sucesso!')

})
