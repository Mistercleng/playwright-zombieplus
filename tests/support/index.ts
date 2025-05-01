import { test as base, Page } from '@playwright/test';

import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { Toast } from '../pages/Components';
import { MoviesPage } from '../pages/MoviesPage';

type PlayFixtures = {
  landing: LandingPage;
  login: LoginPage;
  toast: Toast;
  movies: MoviesPage;
};

// Define fixtures separately instead of mutating `page`
const test = base.extend<PlayFixtures>({
  landing: async ({ page }, use) => {
    await use(new LandingPage(page));
  },
  login: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  toast: async ({ page }, use) => {
    await use(new Toast(page));
  },
  movies: async ({ page }, use) => {
    await use(new MoviesPage(page));
  },
});

export { test };