import { expect } from "@playwright/test";


export class Movies {
    page: any;
    
    constructor(page){
        this.page = page;
    }

    async goForm(){
        await this.page.locator('[href$="register"]').click()
    }
    
    async submit(){
        await this.page.getByRole('button', {name: 'Cadastrar'}).click()
    }

    async create(movie){
        this.goForm()
        await this.page.getByLabel('Titulo do filme').fill(movie.title)
        await this.page.getByLabel('Sinopse').fill(movie.overview)

        await this.page.locator('#select_company_id .react-select__indicator').click()
        
        /*this functionality get all content below after click
        it help handle optiosn when the element is not accessible 
        const html = await this.page.content()
        console.log(html)
        */
       
       await this.page.locator('.react-select__option').filter({hasText: movie.company}).click()
       
       await this.page.locator('#select_year .react-select__indicator').click()
       
       await this.page.locator('.react-select__option').filter({hasText: movie.release_year}).click()

       await this.page.locator('input[name=cover]').setInputFiles('tests/support/fixtures' + movie.cover)

       if(movie.featured){
        await this.page.locator('.featured .react-switch').click()
       }

       this.submit()

    }

    async search(target){
        await this.page.getByPlaceholder('Busque pelo nome').fill(target) 
    }

    async tableHave(content){
        const rows = this.page.getByRole('row')
        await expect(rows).toContainText(content)
    }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target)
    }

    async remove(title){
         // await page.click(`//td[text()='${movie.title}']/..//button`)
        await this.page.getByRole('row',{name: title}).getByRole('button').click()
        await this.page.click('.confirm-removal')
    }
}