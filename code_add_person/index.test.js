const { handler } = require('./index')
const { Pool } = require('pg')
const { v4: uuid_v4, validate: uuidValidate } = require('uuid')

describe('lambda function', () => {
  process.env.RDS_USER = 'postgres'
  process.env.RDS_HOSTNAME = '127.0.0.1'
  process.env.RDS_DB = 'test_db'
  process.env.RDS_PW = 'pg_test'
  process.env.RDS_PORT = 5432

  const workspace_id = uuid_v4()

  test('Add person', async () => {
    const request = {
      arguments: {
        input: {
          workspace_id,
          first_name: 'John',
          last_name: 'Doe',
          name: 'John Doe',
          email: 'john.doe@example.com',
          country_code: 'US',
          phone: '+1 555 555 5555',
          lifetime_value: 1000,
          stage: 'lead',
        },
      },
    }
    const context = {}

    const callback = (err, res) => {
      expect(res.code).toEqual(200)
      expect(res.message).toEqual('person added')
      expect(uuidValidate(res.data.id)).toBeTruthy()
      expect(uuidValidate(res.data.workspace_id)).toBeTruthy()
      expect(res.data.first_name).toEqual('John')
      expect(res.data.last_name).toEqual('Doe')
      expect(res.data.name).toEqual('John Doe')
      expect(res.data.email).toEqual('john.doe@example.com')
      expect(res.data.country_code).toEqual('US')
      expect(res.data.phone).toEqual('+1 555 555 5555')
      expect(res.data.lifetime_value).toEqual(1000)
      expect(res.data.stage).toEqual('lead')
    }

    await handler(request, context, callback)
  })

  test('Person with email already exists', async () => {
    const request = {
      arguments: {
        input: {
          workspace_id,
          email: 'john.doe@example.com'
        },
      },
    }
    const context = {}

    const callback = (err, res) => {
      expect(res.code).toEqual(400)
      expect(res.message).toEqual(`person with email john.doe@example.com already exists`)
    }

    await handler(request, context, callback)
  })

  test('Person with phone number already exists', async () => {
    const request = {
      arguments: {
        input: {
          workspace_id,
          phone: '+1 555 555 5555'
        },
      },
    }
    const context = {}

    const callback = (err, res) => {
      expect(res.code).toEqual(400)
      expect(res.message).toEqual(`person with phone number +1 555 555 5555 already exists`)
    }

    await handler(request, context, callback)
  })
})
