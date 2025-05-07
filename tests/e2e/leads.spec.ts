import { faker } from '@faker-js/faker'
import { test } from '../support';
import { expect } from '@playwright/test';

test('should add a lead to the waitlist', async ({ page , leads, popup}) => {
  const randopmName = faker.person.fullName()
  const randomEmail = faker.internet.email()
  await leads.visit()
  await leads.openLeadModal()
  await leads.submitLeadForm(randopmName, randomEmail)
  const message = "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato."
  await popup.haveText(message)

});

test('should not add a lead to the waitlist whe the email already exist', async ({ page, request, leads, popup }) => {
  const randopmName = faker.person.fullName()
  const randomEmail = faker.internet.email()

  const newLead = await request.post('http:localhost:3333/leads', {
    data: {
      name: randopmName,
      email: randomEmail
    }
  })

  expect(newLead.ok()).toBeTruthy()

  await leads.visit()
  await leads.openLeadModal()
  await leads.submitLeadForm(randopmName, randomEmail)
  const message = "Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços."
  await popup.haveText(message)

});

test('should not add a lead to the waitlist with incorrect email format', async ({ page , leads}) => {
  await leads.visit()
  await leads.openLeadModal()
  await leads.submitLeadForm('Mistercleng Toncalves', 'mrcleng.test.com')
  await leads.alertHaveText('Email incorreto')
});


test('should not add a lead to the waitlist with password not fill', async ({ page , leads}) => {
  await leads.visit()
  await leads.openLeadModal()
  await leads.submitLeadForm('Mistercleng Toncalves', '')
  await leads.alertHaveText('Campo obrigatório')

});

test('should not add a lead to the waitlist with name not fill', async ({ page , leads}) => {
  await leads.visit()
  await leads.openLeadModal()
  await leads.submitLeadForm('', 'mrcleng@test.com')
  await leads.alertHaveText('Campo obrigatório')

});


test('should not add a lead to the waitlist with not fill fields', async ({ page, leads }) => {
  await leads.visit()
  await leads.openLeadModal()
  await leads.submitLeadForm('', '')
  await leads.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])
});
