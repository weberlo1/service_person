const { handler } = require('./index')
const { Pool } = require('pg')

describe('lambda function', () => {
  process.env.RDS_USER = 'postgres'
  process.env.RDS_HOSTNAME = '127.0.0.1'
  process.env.RDS_DB = 'test_db'
  process.env.RDS_PW = 'pg_test'
  process.env.RDS_PORT = 5432

  test('Person doesnt exist', async () => {
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
      expect(res.message).toEqual('person doesnt exist')
    }

    await handler(request, context, callback)
  })

  test('Person deleted', async () => {
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
      expect(res.message).toEqual('person deleted')
      expect(res.data.id).toEqual('52345678-1234-1234-1234-123456789abc')
      expect(res.data.workspace_id).toEqual('28765432-1234-1234-1234-123456789abc')
    }

    await handler(request, context, callback)
  })
})
