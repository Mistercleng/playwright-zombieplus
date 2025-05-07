import { expect } from "@playwright/test";

export class Popup {

        page: any;
        
        constructor(page){
            this.page = page;
        }

        async haveText(message){
            const element = this.page.locator('.swal2-html-container')
            await expect(element).toHaveText(message,{timeout:30000})
        }

}

