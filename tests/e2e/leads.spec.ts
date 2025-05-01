import { faker } from '@faker-js/faker'
import { test } from '../support';
import { expect } from '@playwright/test';

test('should add a lead to the waitlist', async ({ page }) => {
  const randopmName = faker.person.fullName()
  const randomEmail = faker.internet.email()
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(randopmName,randomEmail)
  const message = "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!"
  await page.toast.haveText(message)

});

test('should not add a lead to the waitlist whe the email already exist', async ({ page, request }) => {
  const randopmName = faker.person.fullName()
  const randomEmail = faker.internet.email()

  const newLead = await request.post('http:localhost:3333/leads',{
    data: {
      name: randopmName,
      email: randomEmail 
    }
  })

  expect(newLead.ok()).toBeTruthy()

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(randopmName,randomEmail)
  const message = "O endereço de e-mail fornecido já está registrado em nossa fila de espera."
  await page.toast.haveText(message)

});

test('should not add a lead to the waitlist with incorrect email format', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('Mistercleng Toncalves','mrcleng.test.com')
  await page.landing.alertHaveText('Email incorreto')
});


test('should not add a lead to the waitlist with password not fill', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('Mistercleng Toncalves','')
  await page.landing.alertHaveText('Campo obrigatório')

});

test('should not add a lead to the waitlist with name not fill', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('','mrcleng@test.com')
  await page.landing.alertHaveText('Campo obrigatório')

});


test('should not add a lead to the waitlist with not fill fields', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('','')
  await page.landing.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])
});
