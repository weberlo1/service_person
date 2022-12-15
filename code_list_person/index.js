exports.handler = async (request, context, callback) => {
  const client = await pool.connect()
  const { input } = request.arguments

  // Set default and maximum values for LIMIT and OFFSET
  const DEFAULT_LIMIT = 10
  const MAX_LIMIT = 100
  const DEFAULT_OFFSET = 0
  const MAX_OFFSET = 1000

  // Use provided values for LIMIT and OFFSET, or use default values
  const limit = input.limit || DEFAULT_LIMIT
  const offset = input.offset || DEFAULT_OFFSET

  // Limit and offset values cannot exceed maximum values
  limit = Math.min(limit, MAX_LIMIT)
  offset = Math.min(offset, MAX_OFFSET)

  try {
    const result = await pool.query(
      'SELECT * FROM people WHERE workspace_id = $1 LIMIT $2 OFFSET $3',
      [input.workspace_id, limit, offset]
    )

    callback(null, {
      limit,
      offset,
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
