const { get, request } = require('http')

const defOpts = {}

module.exports = (url, parameters = {}) => new Promise((resolve, reject) => {
  const outReq = get(url, { ...defOpts, ...parameters }, res => {
    let data = ''
    res.on('data', ch => data += ch)
    res.on('end', () => resolve(data))
  })
  outReq.on('error', reject)
})
