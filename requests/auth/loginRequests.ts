import { APIRequestContext, expect } from '@playwright/test'
import Ajv from 'ajv'

export async function validateResponse(responseBody: any, schema: object) {
  const ajv = new Ajv()
  const validate = ajv.compile(schema)
  const valid = validate(responseBody)
  if (!valid) console.log(validate.errors)
  expect(valid).toBe(true)
}

export async function postLogin(request: APIRequestContext, schema: object, statusCode: number, loginMessage: string, loginData: object, loginCondition: string) {
  const response = await request.post('/login', {
    data: loginData
  })
  const responseBody = await response.json()
  expect(response.status()).toBe(statusCode)
  switch (loginCondition) {
    case 'loginSuccess':
      expect(responseBody.message).toBe(loginMessage);
      break;
    case 'invalidEmail':
      expect(responseBody.email).toBe(loginMessage);
      break;
    case 'invalidPassword':
      expect(responseBody.password).toBe(loginMessage);
      break;
  } 
  await validateResponse(responseBody, schema)
  if (responseBody.authorization) {
    return responseBody.authorization
  }
}