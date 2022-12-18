const { handler } = require('./index')
const { Pool } = require('pg')

describe('lambda function', () => {
  process.env.RDS_USER = 'postgres'
  process.env.RDS_HOSTNAME = '127.0.0.1'
  process.env.RDS_DB = 'test_db'
  process.env.RDS_PW = 'pg_test'
  process.env.RDS_PORT = 5432

  test('List page 1', async () => {
    const request = {
      arguments: {
        input: {
          limit: 5,
          workspace_id: '28765432-1234-1234-1234-123456789abc',
        },
      },
    }
    const context = {}
    
    const callback = (err, res) => {
      expect(res.code).toEqual(200)
      expect(res.message).toEqual('person list')
      expect(res.limit).toEqual(5)
      expect(res.offset).toEqual(0)
      expect(res.data.length).toEqual(5)
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
      expect(res.data[1]).toEqual({
        id: 'f0f1ddbc-50ee-457b-85a9-d816e1ba7d7e',
        workspace_id: '28765432-1234-1234-1234-123456789abc',
        first_name: 'Jane',
        last_name: 'Doe',
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        country_code: '1',
        phone: '1234567891',
        lifetime_value: 2000,
        stage: 'customer',
        updated_at: new Date('2022-12-16T12:34:56.789Z'),
        created_at: new Date('2022-12-01T12:34:56.789Z')
      })
      expect(res.data[2]).toEqual({
        id: '15ca844e-7241-4e00-b1a7-7a546dcff574',
        workspace_id: '28765432-1234-1234-1234-123456789abc',
        first_name: 'Bob',
        last_name: 'Smith',
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
        country_code: '1',
        phone: '1234567892',
        lifetime_value: 3000,
        stage: 'lead',
        updated_at: new Date('2022-12-15T12:34:56.789Z'),
        created_at: new Date('2022-12-01T12:34:56.789Z')
      })
      expect(res.data[3]).toEqual({
        id: '3a6be760-0623-493a-b253-a3f7dafaf4bb',
        workspace_id: '28765432-1234-1234-1234-123456789abc',
        first_name: 'Alice',
        last_name: 'Smith',
        name: 'Alice Smith',
        email: 'alice.smith@example.com',
        country_code: '1',
        phone: '1234567893',
        lifetime_value: 4000,
        stage: 'customer',
        updated_at: new Date('2022-12-14T12:34:56.789Z'),
        created_at: new Date('2022-12-01T12:34:56.789Z')
      })
      expect(res.data[4]).toEqual({
        id: '17a1b072-684c-4241-a7da-0e00702a2785',
        workspace_id: '28765432-1234-1234-1234-123456789abc',
        first_name: 'Eve',
        last_name: 'Jones',
        name: 'Eve Jones',
        email: 'eve.jones@example.com',
        country_code: '1',
        phone: '1234567894',
        lifetime_value: 5000,
        stage: 'lead',
        updated_at: new Date('2022-12-13T12:34:56.789Z'),
        created_at: new Date('2022-12-01T12:34:56.789Z')
      })
    }

    await handler(request, context, callback)
  })

  test('List page 2', async () => {
    const request = {
      arguments: {
        input: {
          id: '52345678-1234-1234-1234-123456789abc',
          workspace_id: '28765432-1234-1234-1234-123456789abc',
          limit: 4,
          offset: 5
        },
      },
    }
    const context = {}

    const callback = (err, res) => {
      expect(res.code).toEqual(200)
      expect(res.message).toEqual('person list')
      expect(res.limit).toEqual(4)
      expect(res.offset).toEqual(5)
      expect(res.data.length).toEqual(4)
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
      expect(res.data[1]).toEqual({
        id: 'f305fe28-31d2-40cc-aba6-2f439bba94ca',
        workspace_id: '28765432-1234-1234-1234-123456789abc',
        first_name: 'Sally',
        last_name: 'Johnson',
        name: 'Sally Johnson',
        email: 'sally.johnson@example.com',
        country_code: '1',
        phone: '1234567896',
        lifetime_value: 7000,
        stage: 'lead',
        updated_at: new Date('2022-12-11T12:34:56.789Z'),
        created_at: new Date('2022-12-01T12:34:56.789Z')
      })
      expect(res.data[2]).toEqual({
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
      expect(res.data[3]).toEqual({
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
})
