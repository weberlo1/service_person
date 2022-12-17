const { handler } = require('./index')
const { Pool } = require('pg')
const { uuidv4 } = require('uuid')
  
  uuidv1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a' 
  uuidv4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1' 
describe('lambda function', () => {
  process.env.RDS_USER = 'postgres'
  process.env.RDS_HOSTNAME = '127.0.0.1'
  process.env.RDS_DB = 'test_db'
  process.env.RDS_PW = 'pg_test'
  process.env.RDS_PORT = 5432

  test('add person', async () => {
    const request = {
      arguments: {
        input: {
          workspace_id: uuidv4(),
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
      // expect(res.data).toEqual({ data: {  } })
      console.log(res)
    }

    await handler(request, context, callback)
  })
})
