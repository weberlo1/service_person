const crypto = require('crypto')
const slugid = require('slugid')

const convertFromUuid = (result) => {
  if (!result || !(result instanceof Array)) return result
  return result.map(resultItem => {
    const convertedItem = {}
    for (const key of Object.keys(resultItem)) {
      if ((key.includes('_id') || key === 'id') && resultItem[key] && resultItem[key] !== 'null') {
        convertedItem[key] = slugid.encode(resultItem[key])
      } else {
        convertedItem[key] = resultItem[key]
      }
    }
    return convertedItem
  })
}

const convertToUuid = (args) => {
  const convertedArgs = {}
  for (const key of Object.keys(args)) {
    if ((key.includes('_id') || key === 'id') && args[key] && args[key] !== 'null') {
      convertedArgs[key] = slugid.decode(args[key])
    } else {
      convertedArgs[key] = args[key]
    }
  }
  return convertedArgs
}

const generateId = (arr) => {
  let name
  arr.forEach(idComponent => {
    if (!name) name = idComponent
    else name += '.' + idComponent
  })
  return crypto.createHash('md5').update(name).digest('hex')
}
const invoke = (lambda, functionName, payload) => {
  const params = {
    FunctionName: functionName,
    InvocationType: 'Event',
    Payload: JSON.stringify(payload),
  }
  return new Promise((resolve, reject) => {
    lambda.invoke(params, (err, data) => {
      if (err) {
        console.log(err, err.stack)
        reject(err)
      } else {
        console.log(data)
        resolve(data)
      }
    })
  })
}
const optional = (value) => {
  if (value && value.S) return value.S
  else if (value && value.N) return value.N
  else if (value) return value
  return undefined
}
const parseBaseAttributes = (newEvent) => {
  return {
    event: newEvent.event.S,
    time: parseInt(newEvent.time.N),
    workspaceId: newEvent.workspaceId.S,
  }
}
const parseSourceAttributes = (newEvent) => {
  return {
    utmSource: optional(newEvent.utmSource),
    utmMedium: optional(newEvent.utmMedium),
    utmCampaign: optional(newEvent.utmCampaign),
    utmContent: optional(newEvent.utmContent),
    source: optional(newEvent.source),
    category: optional(newEvent.category),
  }
}
const parsePageAttributes = (newEvent) => {
  return {
    country: optional(newEvent.country),
    website: optional(newEvent.website),
    device: optional(newEvent.device),
    pageUrl: optional(newEvent.pageUrl),
  }
}
const parseFunnelAttributes = (newEvent) => {
  return {
    funnel: optional(newEvent.funnel),
  }
}
const parseFormAttributes = (newEvent) => {
  return {
    form: optional(newEvent.form),
    formType: optional(newEvent.formType),
  }
}
const parseCallAttributes = (newEvent) => {
  return {
    trackingNumberSource: optional(newEvent.trackingNumberSource),
    trackingNumberLabel: optional(newEvent.trackingNumberLabel),
    trackingNumber: optional(newEvent.trackingNumber),
  }
}
const parseBookingAttributes = (newEvent) => {
  return {
    bookingType: optional(newEvent.bookingTypeId),
    bookingId: optional(newEvent.bookingId),
    bookingTypeName: optional(newEvent.bookingTypeName),
    bookingTimestamp: optional(newEvent.bookingTimestamp),
    bookingTypeDuration: optional(newEvent.bookingTypeDuration),
    bookingLink: optional(newEvent.bookingLink),
    bookingRep: optional(newEvent.bookingRep),
    bookingCreated: optional(newEvent.time),
  }
}
const parseTransactionAttributes = (newEvent) => {
  return {
    amount: optional(newEvent.amount),
    product: optional(newEvent.productId),
    productName: optional(newEvent.productName),
    subscription: optional(newEvent.subscription),
    connector: optional(newEvent.connector),
    country: optional(newEvent.country),
  }
}
const parsePersonAttributes = (newEvent) => {
  return {
    name: optional(newEvent.name),
    firstName: optional(newEvent.firstName),
    lastName: optional(newEvent.lastName),
    phone: optional(newEvent.phone),
    email: optional(newEvent.email),
  }
}

module.exports = {
  generateId,
  invoke,
  parseBaseAttributes,
  parseSourceAttributes,
  parsePageAttributes,
  parseFunnelAttributes,
  parseFormAttributes,
  parseCallAttributes,
  parseBookingAttributes,
  parseTransactionAttributes,
  parsePersonAttributes,
  optional,
  convertFromUuid,
  convertToUuid,
}
