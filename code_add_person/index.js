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

  try {
    const res = await client.query(`
      INSERT INTO persons
        (
          workspace_id,
          first_name,
          last_name,
          name,
          email,
          country_code,
          phone,
          lifetime_value,
          stage
        )
      VALUES
        (
          $1, $2, $3, $4, $5, $6, $7, $8, $9
        )
      ON CONFLICT (workspace_id, email, phone) DO NOTHING
      RETURNING *;
    `, [
      input.workspace_id,
      input.first_name,
      input.last_name,
      input.name,
      input.email,
      input.country_code,
      input.phone,
      input.lifetime_value,
      input.stage,
    ])

    callback(null, {
      data: res.rows[0]
    })

  } catch (e) {
    console.error(e)

    callback(e, {
      status: 'ERROR',
      message: 'Something went wrong!!'
    })

  } finally {
    client.release()
  }
}
