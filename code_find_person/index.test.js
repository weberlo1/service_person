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

  test('Find person by email', async () => {
    const request = {
      arguments: {
        input: {
          workspace_id: '28765432-1234-1234-1234-123456789abc',
          email: 'emily.brown@example.com',
        },
      },
    }
    const context = {}

    const callback = (err, res) => {
      expect(res.code).toEqual(200)
      expect(res.message).toEqual('person found')
      expect(res.data[0]).toEqual({
        id: '958cd0a4-ff79-4c9d-9f16-0d02abf91f67',
        workspace_id: '28765432-1234-1234-1234-123456789abc',
        first_name: 'Emily',
        last_name: 'Brown',
        name: 'Emily Brown',
        email: 'emily.brown@example.com',
        country_code: '1',
        phone: '1234567898',
        lifetime_value: 9000,
        stage: 'lead',
        updated_at: new Date('2022-12-09T12:34:56.789Z'),
        created_at: new Date('2022-12-01T12:34:56.789Z')
      })
    }

    await handler(request, context, callback)
  })

  test('Find person by phone', async () => {
    const request = {
      arguments: {
        input: {
          workspace_id: '28765432-1234-1234-1234-123456789abc',
          phone: '1234567897',
        },
      },
    }
    const context = {}

    const callback = (err, res) => {
      expect(res.code).toEqual(200)
      expect(res.message).toEqual('person found')
      expect(res.data[0]).toEqual({
        id: 'c727e217-9244-410d-8493-8c289b371aaf',
        workspace_id: '28765432-1234-1234-1234-123456789abc',
        first_name: 'Michael',
        last_name: 'Brown',
        name: 'Michael Brown',
        email: 'michael.brown@example.com',
        country_code: '1',
        phone: '1234567897',
        lifetime_value: 8000,
        stage: 'customer',
        updated_at: new Date('2022-12-10T12:34:56.789Z'),
        created_at: new Date('2022-12-01T12:34:56.789Z')
      })
    }

    await handler(request, context, callback)
  })

  test('Find person by name and ip_address', async () => {
    const request = {
      arguments: {
        input: {
          workspace_id: '28765432-1234-1234-1234-123456789abc',
          name: 'Tom Johnson',
          ip_address: '192.168.0.3',
        },
      },
    }
    const context = {}

    const callback = (err, res) => {
      expect(res.code).toEqual(200)
      expect(res.message).toEqual('person found')
      expect(res.data[0]).toEqual({
        id: 'e460709a-7c46-413f-af50-764dd9bcbf7a',
        workspace_id: '28765432-1234-1234-1234-123456789abc',
        first_name: 'Tom',
        last_name: 'Johnson',
        name: 'Tom Johnson',
        email: 'tom.johnson@example.com',
        country_code: '1',
        phone: '1234567895',
        lifetime_value: 6000,
        stage: 'customer',
        updated_at: new Date('2022-12-12T12:34:56.789Z'),
        created_at: new Date('2022-12-01T12:34:56.789Z')
      })
    }

    await handler(request, context, callback)
  })

  test('Find person by first_name, last_name and ip_address', async () => {
    const request = {
      arguments: {
        input: {
          workspace_id: '28765432-1234-1234-1234-123456789abc',
          first_name: 'Tom',
          last_name: 'Johnson',
          ip_address: '192.168.0.3',
        },
      },
    }
    const context = {}

    const callback = (err, res) => {
      expect(res.code).toEqual(200)
      expect(res.message).toEqual('person found')
      expect(res.data[0]).toEqual({
        id: 'e460709a-7c46-413f-af50-764dd9bcbf7a',
        workspace_id: '28765432-1234-1234-1234-123456789abc',
        first_name: 'Tom',
        last_name: 'Johnson',
        name: 'Tom Johnson',
        email: 'tom.johnson@example.com',
        country_code: '1',
        phone: '1234567895',
        lifetime_value: 6000,
        stage: 'customer',
        updated_at: new Date('2022-12-12T12:34:56.789Z'),
        created_at: new Date('2022-12-01T12:34:56.789Z')
      })
    }

    await handler(request, context, callback)
  })

  test('Not enough info', async () => {
    const request = {
      arguments: {
        input: {
          workspace_id: '28765432-1234-1234-1234-123456789abc',
          ip_address: '192.168.0.3',
        },
      },
    }
    const context = {}

    const callback = (err, res) => {
      expect(res.code).toEqual(400)
      expect(res.message).toEqual('not enough info')
    }

    await handler(request, context, callback)
  })

  test('Person not found', async () => {
    const request = {
      arguments: {
        input: {
          workspace_id: '28765432-1234-1234-1234-123456789abc',
          email: 'abc@abc.com',
        },
      },
    }
    const context = {}

    const callback = (err, res) => {
      expect(res.code).toEqual(404)
      expect(res.message).toEqual('not found')
    }

    await handler(request, context, callback)
  })
})
