const { handler } = require('./index')
const { Pool } = require('pg')

// Mock the response object returned from calling 'client.query()'
const mockResponse = {
    rows: [
        {
        workspace_id: '1',
        first_name: 'John',
        last_name: 'Doe',
        name: 'John Doe',
        email: 'john.doe@example.com',
        country_code: 'US',
        phone: '+1 555 555 5555',
        lifetime_value: '1000',
        stage: 'lead',
        },
    ],
}

describe('lambda function', () => {
  // Mock the 'client' object returned from calling 'pool.connect()'
  const mockClient = {
    query: jest.fn(),
    release: jest.fn(),
  }

  // Mock the 'client.query()' method to return the response object
  mockClient.query.mockResolvedValue(mockResponse)

  test('should insert a new source and return it', async () => {
    const request = {
      arguments: {
        input: {
          workspace_id: '1',
          first_name: 'John',
          last_name: 'Doe',
          name: 'John Doe',
          email: 'john.doe@example.com',
          country_code: 'US',
          phone: '+1 555 555 5555',
          lifetime_value: '1000',
          stage: 'lead',
        },
      },
    }
    const context = {}
    
    // Wrap the code in an anonymous function and pass it to the 'handler()' function
    const callback = (err, res) => {
      expect(res.data).toEqual(mockResponse.rows[0])
    }

    await handler(request, context, callback)
  })
})

$ initdb /usr/local/var/postgres
$ pg_ctl -D /usr/local/var/postgres start
$ psql
postgres=# CREATE DATABASE test_db;
$ export TEST_DATABASE_URL=postgres://localhost:5432/test_db
$ npm test

  