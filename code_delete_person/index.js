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
    const response = await client.query(
      `
      DELETE FROM persons WHERE id = $1 AND workspace_id = $2      
      RETURNING id, workspace_id;
  `,
      [input.id, input.workspace_id]
    )

    if (res.rowCount === 0) {
      callback(null, {
        code: 400,
        message: 'person doesnt exist',
      })
    } else {
      callback(null, {
        code: 200,
        message: 'person deleted',
        data: res.rows[0],
      })
    }
  } catch (e) {
    console.error(e)

    callback(e, {
      code: 500,
      message: 'internal server error',
    })
  } finally {
    client.release()
  }
}
