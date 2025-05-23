import { expect } from "@playwright/test";
import { APIRequestContext } from '@playwright/test';
import dotenv from 'dotenv'

dotenv.config();


export class Api {
    [x: string]: any;
    constructor(private request: APIRequestContext) {
        this.baseApi = process.env.BASE_API
        this.request = request
        this.token = undefined
    }

    async setToken() {
        const response = await this.request.post(this.baseApi + '/sessions', {
            data: {
                email: 'admin@zombieplus.com',
                password: 'pwd123'
            }
        })

        expect(response.ok()).toBeTruthy()
        const body = JSON.parse(await response.text())
        this.token = 'Bearer ' + body.token
    }

    async postMovie(movie) {
        const companyId = await this.getCompanyByName(movie.company)
        const response = await this.request.post(this.baseApi + '/movies', {
            headers: {
                Authorization: this.token,
                ContentType: 'multipart/form-data',
                Accept: 'application/json, text/plain, */*'
            },
            multipart: {
                title: movie.title,
                overview: movie.overview,
                company_id: companyId,
                release_year: movie.release_year,
                featured: movie.featured
            }
        })
        expect(response.ok()).toBeTruthy()
    }

    async getCompanyByName(companyName){
        const response = await this.request.get(this.baseApi + '/companies', {
            headers: {
                Authorization: this.token
            },
            params:{
                name: companyName
            }
        })
        expect(response.ok()).toBeTruthy()

        const body = JSON.parse(await response.text())

        return body.data[0].id
    }

}