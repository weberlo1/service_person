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
  let query

  try {
    switch (true) {
      case input.visitor_id:
        query = 'SELECT * FROM persons WHERE workspace_id = $1 AND id IN (SELECT person_id FROM visitors WHERE visitor_id = $2 AND workspace_id = $1)'
        values.push(input.visitor_id)
        break
      case input.email:
        query = 'SELECT * FROM persons WHERE workspace_id = $1 AND email = $2'
        values.push(input.email)
        break
      case input.phone:
        query = 'SELECT * FROM persons WHERE workspace_id = $1 AND phone = $2'
        values.push(input.phone)
        break
      case input.name && input.ip_address:
        query = 'SELECT * FROM persons WHERE workspace_id = $1 AND name = $2 AND ip_address = $3'
        values.push(input.name, input.ip_address)
        break
      case input.first_name && input.last_name && input.ip_address:
        query = 'SELECT * FROM persons WHERE workspace_id = $1 AND first_name = $2 AND last_name = $3 AND ip_address = $4'
        values.push(input.first_name, input.last_name, input.ip_address)
        break
      default:
        break
    }

    const result = await pool.query(query, [ workspace_id, ...values ])

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