var sesion = {
  // 存储
  set(key, value) {
    // 记忆在sessionStorage
    let v = value
    switch (typeof (value)) {
      case 'object':
        try {
          v = JSON.stringify(value)
        } catch {
          v = '{}'
        }
        break
      case 'boolean':
        v = value ? 'true' : 'false'
        break
      case 'number':
        v = value
        break
      case 'undefined':
        v = ''
        break
    }
    sessionStorage.setItem(key, v)
  },
  // 取出数据
  get(key, defValue) {
    const t = typeof (defValue)
    const value = sessionStorage.getItem(key)
    // console.log("sessionStorage-"+key, value);
    if (value == undefined || value == null || value == 'null' || value == 'undefined') {
      return defValue
    } else {
      switch (t) {
        case 'object':
          try {
            return JSON.parse(value)
          } catch {}
        case 'boolean':
          return (value == '1' || value == 'true')
        case 'number':
          return parseFloat(value)
      }
      return value
    }
  },
  getFloat(key) {
    try {
      return parseFloat(sessionStorage.getItem(key))
    } catch {
      return 0
    }
  },
  getInt(key) {
    try {
      return parseInt(sessionStorage.getItem(key))
    } catch {
      return 0
    }
  },
  getBoolean(key) {
    const s = sessionStorage.getItem(key)
    return (s == '1' || s == 'true')
  },
  getObject(key) {
    try {
      return JSON.parse(sessionStorage.getItem(key))
    } catch {
      return null
    }
  },
  // 删除数据
  remove(key) {
    sessionStorage.removeItem(key)
  }
}

export default sesion
