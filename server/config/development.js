module.exports = {
  "port" : 9000,
  mongo: {
    uri: 'mongodb://127.0.0.1:27017/devicetracker',
    options: {
      db: {
        safe: true
      }
    }
  }
}
