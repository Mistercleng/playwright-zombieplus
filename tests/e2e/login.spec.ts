import { test } from '../support';

test('should login as admin', async ({page}) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com','pwd123')
    await page.movies.isLoggedIn()
})

test('should not login with incorrect password', async({page}) =>{
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com','abc123')
    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await page.toast.haveText(message)
})

test('should not login with when email is incorrect', async({page}) =>{
    await page.login.visit()
    await page.login.submit('admim.com','abc123')
    await page.login.alertHaqveText('Email incorreto')
})

test('should not login with when email is not fill', async({page}) =>{
    await page.login.visit()
    await page.login.submit('','abc123')
    await page.login.alertHaqveText('Campo obrigatório')
})


test('should not login with when password is not fill', async({page}) =>{
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com','')
    await page.login.alertHaqveText('Campo obrigatório')
})

test('should not login with when not fill email and password', async({page}) =>{
    await page.login.visit()
    await page.login.submit('','')
    await page.login.alertHaqveText(['Campo obrigatório','Campo obrigatório'])
})