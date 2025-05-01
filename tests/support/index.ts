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
    const context = page
     context['planding'] = new LandingPage(page),
     context['plogin'] = new LoginPage(page),
     context['ptoast'] = new Toast(page),
     context['pmovies'] = new MoviesPage(page)
    await use(context)
  }
})

export { test }