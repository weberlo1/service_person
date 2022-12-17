const { Pool } = require('pg')

exports.handler = async (request, context, callback) => {
  const pool = new Pool({
    user: process.env.RDS_USER,
    host: process.env.RDS_HOSTNAME,
    database: process.env.RDS_DB,
    password: process.env.RDS_PW,
    port: process.env.RDS_PORT,
  })
  
  const client = await pool.connect()
  const { input } = request.arguments
  const values = []

  try {
    switch (true) {
      case input.visitor_id:
        query = 'SELECT * FROM people WHERE id IN (SELECT person_id FROM visitors WHERE visitor_id = $1)'
        values.push(input.visitor_id)
        break
      case input.email:
        query = 'SELECT * FROM people WHERE email_address = $1'
        values.push(input.email)
        break
      case input.phone:
        query = 'SELECT * FROM people WHERE phone_number = $1'
        values.push(input.phone)
        break
      case input.name && input.ip_address:
        query = 'SELECT * FROM people WHERE (name = $1 AND ip_address = $2)'
        values.push(input.name, input.ip_address)
        break
      case input.last_name && input.ip_address:
        query = 'SELECT * FROM people WHERE (last_name = $1 AND ip_address = $1)'
        values.push(input.last_name, input.ip_address)
        break
      case input.first_name && input.ip_address:
        query = 'SELECT * FROM people WHERE (last_name = $1 AND ip_address = $2)'
        values.push(input.last_name, input.ip_address)
        break
      default:
        break
    }

    const result = await pool.query(query, values)

    callback(null, {
      data: result.rows
    })

  } catch (e) {
    callback(e, {
      status: 'ERROR',
      message: 'Something went wrong!!'
    })

  } finally {
    client.release()
  }
}