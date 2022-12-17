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

  // Set default and maximum values for LIMIT and OFFSET
  const DEFAULT_LIMIT = 10
  const MAX_LIMIT = 100
  const DEFAULT_OFFSET = 0
  const MAX_OFFSET = 1000

  // Use provided values for LIMIT and OFFSET, or use default values
  let limit = input.limit || DEFAULT_LIMIT
  let offset = input.offset || DEFAULT_OFFSET

  // Limit and offset values cannot exceed maximum values
  limit = Math.min(limit, MAX_LIMIT)
  offset = Math.min(offset, MAX_OFFSET)

  try {
    const result = await pool.query(
      'SELECT * FROM people WHERE workspace_id = $1 LIMIT $2 OFFSET $3 ORDER BY updated_at DESC',
      [input.workspace_id, limit, offset]
    )

    callback(null, {
      code: 200,
      message: 'person list',
      limit,
      offset,
      data: result.rows
    })

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
