const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.RDS_USER,
  host: process.env.RDS_HOSTNAME,
  database: process.env.RDS_DB,
  password: process.env.RDS_PW,
  port: process.env.RDS_PORT,
})

exports.handler = async (request, context, callback) => {
  const client = await pool.connect()
  const { input } = request.arguments

  try {
    const result = await pool.query(
      'SELECT * FROM people WHERE (id = $1 AND workspace_id = $2)',
      [input.id, input.workspace_id]
    )

    callback(null, {
      data: result.rows[0]
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