import { faker } from '@faker-js/faker'
import { test } from '../support';
import { expect } from '@playwright/test';

test('should add a lead to the waitlist', async ({ page , landing, toast}) => {
  const randopmName = faker.person.fullName()
  const randomEmail = faker.internet.email()
  await landing.visit()
  await landing.openLeadModal()
  await landing.submitLeadForm(randopmName, randomEmail)
  const message = "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!"
  await toast.haveText(message)

});

test('should not add a lead to the waitlist whe the email already exist', async ({ page, request, landing, toast }) => {
  const randopmName = faker.person.fullName()
  const randomEmail = faker.internet.email()

  const newLead = await request.post('http:localhost:3333/leads', {
    data: {
      name: randopmName,
      email: randomEmail
    }
  })

  expect(newLead.ok()).toBeTruthy()

  await landing.visit()
  await landing.openLeadModal()
  await landing.submitLeadForm(randopmName, randomEmail)
  const message = "O endereço de e-mail fornecido já está registrado em nossa fila de espera."
  await toast.haveText(message)

});

test('should not add a lead to the waitlist with incorrect email format', async ({ page , landing}) => {
  await landing.visit()
  await landing.openLeadModal()
  await landing.submitLeadForm('Mistercleng Toncalves', 'mrcleng.test.com')
  await landing.alertHaveText('Email incorreto')
});


test('should not add a lead to the waitlist with password not fill', async ({ page , landing}) => {
  await landing.visit()
  await landing.openLeadModal()
  await landing.submitLeadForm('Mistercleng Toncalves', '')
  await landing.alertHaveText('Campo obrigatório')

});

test('should not add a lead to the waitlist with name not fill', async ({ page , landing}) => {
  await landing.visit()
  await landing.openLeadModal()
  await landing.submitLeadForm('', 'mrcleng@test.com')
  await landing.alertHaveText('Campo obrigatório')

});


test('should not add a lead to the waitlist with not fill fields', async ({ page, landing }) => {
  await landing.visit()
  await landing.openLeadModal()
  await landing.submitLeadForm('', '')
  await landing.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])
});
