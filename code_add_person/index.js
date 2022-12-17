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
      code: 200,
      message: 'person added'
      data: res.rows[0]
    })

  } catch (e) {
    if (e.code === '23505' && e.message.includes('unique_email_workspace_id'))
      callback(e, {
        code: 400,
        message: `person with email ${input.email} already exists`
      })
    else if (e.code === '23505' && e.message.includes('unique_phone_workspace_id'))
      callback(e, {
        code: 400,
        message: `person with phone number ${input.phone} already exists`
      })
    else {
      console.error(e)
      callback(e, {
        code: 500,
        message: 'server error'
      })
    }
  } finally {
    client.release()
  }
}
