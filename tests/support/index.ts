// fixtures.ts
import { test as base } from '@playwright/test'

import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { Toast } from '../pages/Components'
import { MoviesPage } from '../pages/MoviesPage'

type PlayFixtures = {
  page: any,
  landing: LandingPage,
  login: LoginPage,
  toast: Toast,
  movies: MoviesPage
}

const test = base.extend<PlayFixtures>({
  page: async ({ page }, use) => {
   
    await use({
        ...page,
        landing: new LandingPage(page),
        login: new LoginPage(page),
        toast: new Toast(page),
        movies: new MoviesPage(page)
    })
  }
})

export { test }