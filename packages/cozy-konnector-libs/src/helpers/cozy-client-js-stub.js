const fs = require('fs')
const path = require('path')
const log = require('cozy-logger').namespace('cozy-client-js-stub')
const uuid = require('uuid/v5')
const sha1 = require('uuid/lib/sha1')
const bytesToUuid = require('uuid/lib/bytesToUuid')
const mimetypes = require('mime-types')

let fixture = {}
const FIXTURE_PATH = path.resolve('fixture.json')
if (fs.existsSync(FIXTURE_PATH)) {
  log('debug', `Found ${FIXTURE_PATH} fixture file`)
  fixture = require(FIXTURE_PATH)
}

module.exports = {
  fetchJSON() {
    Promise.resolve({})
  },
  data: {
    create(doctype, item) {
      log('info', item, `creating ${doctype}`)
      const ns = bytesToUuid(sha1(doctype))
      const _id = uuid(JSON.stringify(item), ns).replace(/-/gi, '')
      return Promise.resolve(Object.assign({}, item, { _id }))
    },
    updateAttributes(doctype, id, attrs) {
      log('info', attrs, `updating ${id} in ${doctype}`)
      return Promise.resolve(Object.assign({}, attrs, { _id: id }))
    },
    defineIndex(doctype) {
      return Promise.resolve({ doctype })
    },
    query(index) {
      let result = null
      if (fixture[index.doctype]) {
        result = fixture[index.doctype]
      } else {
        result = []
      }
      return Promise.resolve(result)
    },
    findAll(doctype) {
      let result = null
      if (fixture[doctype]) {
        result = fixture[doctype]
      } else {
        result = []
      }
      return Promise.resolve(result)
    },
    delete() {
      return Promise.resolve({})
    },
    find(doctype) {
      // Find the doc in the fixture
      // exeption for "io.cozy.accounts" doctype where we return konnector-dev-config.json content
      let result = null
      if (doctype === 'io.cozy.accounts') {
        const configPath = path.resolve('konnector-dev-config.json')
        const config = require(configPath)
        result = { auth: config.fields }
      } else {
        return Promise.reject(
          new Error('find is not implemented yet in cozy-client-js stub')
        )
      }
      return Promise.resolve(result)
    }
  },
  files: {
    statByPath(pathToCheck) {
      // check this path in .
      return new Promise((resolve, reject) => {
        log('debug', `Checking if ${pathToCheck} exists`)
        const realpath = path.join('.', pathToCheck)
        log('debug', `Real path : ${realpath}`)
        if (fs.existsSync(realpath)) {
          resolve({ _id: pathToCheck })
        } else {
          reject(new Error(`${pathToCheck} does not exist`))
        }
      })
    },
    statById(idToCheck) {
      // just return the / path for dev purpose
      return Promise.resolve({ attributes: { id: idToCheck, path: '/' } })
    },
    create(file, options) {
      return new Promise((resolve, reject) => {
        log('debug', `Creating new file ${options.name}`)
        const finalPath = path.join('.', options.dirID, options.name)
        log('debug', `Real path : ${finalPath}`)
        let writeStream = fs.createWriteStream(finalPath)
        file.pipe(writeStream)

        file.on('end', () => {
          log('info', `File ${finalPath} created`)
          const extension = path.extname(options.name).substr(1)
          resolve({
            _id: options.name,
            attributes: {
              mime: mimetypes.lookup(extension),
              name: options.name
            }
          })
        })

        writeStream.on('error', err => {
          log('warn', `Error : ${err} while trying to write file`)
          reject(new Error(err))
        })
      })
    },
    createDirectory(options) {
      return new Promise(resolve => {
        log('info', `Creating new directory ${options.name}`)
        const finalPath = path.join('.', options.dirID, options.name)
        log('info', `Real path : ${finalPath}`)
        fs.mkdirSync(finalPath)
        resolve()
      })
    }
  }
}
