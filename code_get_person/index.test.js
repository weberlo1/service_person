const { handler } = require('./index')
const { Pool } = require('pg')

describe('lambda function', () => {
  process.env.RDS_USER = 'postgres'
  process.env.RDS_HOSTNAME = '127.0.0.1'
  process.env.RDS_DB = 'test_db'
  process.env.RDS_PW = 'pg_test'
  process.env.RDS_PORT = 5432

  test('Person not found', async () => {
    const request = {
      arguments: {
        input: {
          id: 'f5da6fc0-75c4-4ead-837a-90e87fa2409e',
          workspace_id: '28765432-1234-1234-1234-123456789abc',
        },
      },
    }
    const context = {}

    const callback = (err, res) => {
      expect(res.code).toEqual(400)
      expect(res.message).toEqual('person not found')
    }

    await handler(request, context, callback)
  })

  test('Person found', async () => {
    const request = {
      arguments: {
        input: {
          id: '52345678-1234-1234-1234-123456789abc',
          workspace_id: '28765432-1234-1234-1234-123456789abc',
        },
      },
    }
    const context = {}

    const callback = (err, res) => {
      expect(res.code).toEqual(200)
      expect(res.message).toEqual('person found')
      expect(res.data.id).toEqual('52345678-1234-1234-1234-123456789abc')
      expect(res.data.workspace_id).toEqual('28765432-1234-1234-1234-123456789abc')
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
})
