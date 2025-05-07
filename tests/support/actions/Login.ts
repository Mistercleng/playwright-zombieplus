import { expect } from "@playwright/test";

export class Login {
    page: any;
    
    constructor(page){
        this.page = page;
    }

    async do(email,password,username){
        this.visit()
        await this.page.waitForLoadState('networkidle')
        this.submit(email,password)
        this.isLoggedIn(username)
    }

    async visit(){
        await this.page.goto('/admin/login')
    
        const loginForm = this.page.locator('.login-form')
        await expect(loginForm).toBeVisible() 
    }

    async submit(email: string,passwoerd: string) {
        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(passwoerd)
        await this.page.getByText('Entrar').click()
    }

    async alertHaqveText(text){
        const alert = this.page.locator('span[class$=alert]')
        await expect(alert).toHaveText(text)
    }

    async isLoggedIn(usename) {
        const loggedUser = this.page.locator('.logged-user')
        await expect(loggedUser).toHaveText(`Olá, ${usename}`,{timeout:5000})
    }
}