const { handler } = require('./index')

describe('lambda function', () => {
  process.env.RDS_USER = 'postgres'
  process.env.RDS_HOSTNAME = '127.0.0.1'
  process.env.RDS_DB = 'test_db'
  process.env.RDS_PW = 'pg_test'
  process.env.RDS_PORT = 5432

  test('Find person by visitor_id', async () => {
    const request = {
      arguments: {
        input: {
          workspace_id: '28765432-1234-1234-1234-123456789abc',
          visitor_id: '58781984-9085-45bc-9830-26f597cd71a4',
        },
      },
    }
    const context = {}

    const callback = (err, res) => {
      expect(res.code).toEqual(200)
      expect(res.message).toEqual('person found')
      expect(res.data[0]).toEqual({
        id: '7460b87a-9455-4eaa-b84b-1e24eab2b6cb',
        workspace_id: '28765432-1234-1234-1234-123456789abc',
        first_name: 'John',
        last_name: 'Doe',
        name: 'John Doe',
        email: 'john.doe@example.com',
        country_code: '1',
        phone: '1234567890',
        lifetime_value: 1000,
        stage: 'lead',
        updated_at: new Date('2022-12-17T12:34:56.789Z'),
        created_at: new Date('2022-12-01T12:34:56.789Z')
      })
    }

    await handler(request, context, callback)
  })
})
