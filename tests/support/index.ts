import { test as base, Page } from '@playwright/test';

import { Leads } from './actions/Leads';
import { Login } from './actions/Login';
import { Popup } from './actions/Components';
import { Movies } from './actions/Movies';

import { Api} from './api'

type PlayFixtures = {
  leads: Leads;
  login: Login;
  popup: Popup;
  movies: Movies;
  api: Api
};

// Define fixtures separately instead of mutating `page`
const test = base.extend<PlayFixtures>({
  leads: async ({ page }, use) => {
    await use(new Leads(page));
  },
  login: async ({ page }, use) => {
    await use(new Login(page));
  },
  popup: async ({ page }, use) => {
    await use(new Popup(page));
  },
  movies: async ({ page }, use) => {
    await use(new Movies(page));
  },
  api: async({request},use) => {
    const api = new Api(request)
    await api.setToken()
    await use(api)
  }
});

export { test };