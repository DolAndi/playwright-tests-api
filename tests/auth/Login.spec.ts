import { test } from '@playwright/test'
import { postLogin } from '../../requests/auth/loginRequests'
import jsons from '../../fixtures/loginCredentials.js'
import validSchema from '../../fixtures/schema/login/login_200.json'
import invalidEmailSchema from '../../fixtures/schema/login/invalidEmail_400.json'
import invalidPasswordSchema from '../../fixtures/schema/login/invalidPassword_400.json'
import noFieldsSchema from '../../fixtures/schema/login/noFields_400.json'

test.describe('Authentication', () => {
  test('Login - Valid', async ({ request, context }) => {
    const authorization = await postLogin(request, validSchema, 200, 'Login realizado com sucesso', jsons.loginValid, 'loginSuccess')
    await context.setExtraHTTPHeaders({  
      'Authorization': `Bearer ${authorization}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  })
  test('Login - Invalid - Blank Email', async ({ request }) => {
    await postLogin(request, invalidEmailSchema, 400, 'email não pode ficar em branco', jsons.blankEmail, 'invalidEmail')
  })
  test('Login - Invalid - No Email field', async ({ request }) => {
    await postLogin(request, invalidEmailSchema, 400, 'email é obrigatório', jsons.noEmail, 'invalidEmail')
  })
  test('Login - Invalid - Blank Password', async ({ request }) => {
    await postLogin(request, invalidPasswordSchema, 400, 'password não pode ficar em branco', jsons.blankPassword, 'invalidPassword')
  })
  test('Login - Invalid - No password field', async ({ request }) => {
    await postLogin(request, invalidPasswordSchema, 400, 'password é obrigatório', jsons.noPassword, 'invalidPassword')
  })
  test('Login - Invalid - No fields', async ({ request }) => {
    await postLogin(request, noFieldsSchema, 400, 'password é obrigatório', jsons.noFields, 'invalidPassword')
  })
})
