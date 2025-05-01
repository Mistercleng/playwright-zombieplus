import { expect } from "@playwright/test";

export class Toast {

        page: any;
        
        constructor(page){
            this.page = page;
        }

        async haveText(message){
            const toast = this.page.locator('.toast')
            await expect(toast).toHaveText(message)
            await expect(toast).toBeHidden({ timeout: 5000 })
        }

}

