import { test } from '../support';

test('should login as admin', async ({ page, login }) => {
    await login.visit()
    await login.submit('admin@zombieplus.com', 'pwd123')
    await login.isLoggedIn('Admin')
})

test('should not login with incorrect password', async ({ page, login, toast}) => {
    await login.visit()
    await login.submit('admin@zombieplus.com', 'abc123')
    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await toast.haveText(message)
})

test('should not login with when email is incorrect', async ({ page, login }) => {
    await login.visit()
    await login.submit('admim.com', 'abc123')
    await login.alertHaqveText('Email incorreto')
})

test('should not login with when email is not fill', async ({ page, login}) => {
    await login.visit()
    await login.submit('', 'abc123')
    await login.alertHaqveText('Campo obrigatório')
})


test('should not login with when password is not fill', async ({ page, login}) => {
    await login.visit()
    await login.submit('admin@zombieplus.com', '')
    await login.alertHaqveText('Campo obrigatório')
})

test('should not login with when not fill email and password', async ({ page, login}) => {
    await login.visit()
    await login.submit('', '')
    await login.alertHaqveText(['Campo obrigatório', 'Campo obrigatório'])
})