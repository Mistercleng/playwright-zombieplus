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

    async create(title, overview, company, release_year){
        this.goForm()
        await this.page.getByLabel('Titulo do filme').fill(title)
        await this.page.getByLabel('Sinopse').fill(overview)

        await this.page.locator('#select_company_id .react-select__indicator').click()
        
        /*this functionality get all content below after click
        it help handle optiosn when the element is not accessible 
        const html = await this.page.content()
        console.log(html)
        */
       
       await this.page.locator('.react-select__option').filter({hasText: company}).click()
       
       await this.page.locator('#select_year .react-select__indicator').click()
       
       await this.page.locator('.react-select__option').filter({hasText: release_year}).click()

       this.submit()

    }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target)
    }
}