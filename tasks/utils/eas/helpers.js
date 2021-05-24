const { camelCase } = require('@keg-hub/jsutils')

/**
 * Converts the string response from eas-cli build:list into a json object
 * @function
 * @param {string} data - Response from the eas-cli build:list command
 *
 * @returns {Array} - JSON array of build items
 */
const jsonOutput = (data) => {
  // In the eas-cli items list, each item is separated by ---
  // So split on it, to get each individual item
  return data.split('———')
    .reduce((items, part) => {

      const built = part.split('\n')
        .reduce((item, line) => {
          // // Skip empty or invalid lines
          if(!line.trim() || line.startsWith('✔')) return item

          // Split on double space to separate the full key from the value 
          const [ key, ...values ] = line.split('  ')
            .reduce((parts, val) => {
              const trimmed = val.trim()
              trimmed && parts.push(trimmed)
              return parts
            }, [])

          // Format the key to be camel case and join the values, then add to the item
          key && (item[camelCase(key)] = values.join(' '))

          return item
        }, {})

      items.push(built)

      return items
    }, [])
}

module.exports = {
  jsonOutput
}