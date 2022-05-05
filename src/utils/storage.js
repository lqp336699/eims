var storage = {
  // 存储
  set(key, value) {
    // 记忆在localStorage
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
    localStorage.setItem(key, v)
  },
  // 取出数据
  get(key, defValue) {
    const t = typeof (defValue)
    const value = localStorage.getItem(key)
    // console.log("localStorage-"+key, value);
    if (value == undefined || value == null || value == 'null' || value == 'undefined') {
      return defValue
    } else {
      switch (t) {
        case 'object':
          try {
            return JSON.parse(value)
          } catch {
            return null
          }
        case 'boolean':
          return (value == '1' || value == 'true')
        case 'number':
          try {
            return parseFloat(value)
          } catch {
            return 0
          }
      }
      return value
    }
  },
  getFloat(key) {
    try {
      return parseFloat(localStorage.getItem(key))
    } catch {
      return 0
    }
  },
  getInt(key) {
    try {
      return parseInt(localStorage.getItem(key))
    } catch {
      return 0
    }
  },
  getBoolean(key) {
    const v = localStorage.getItem(key)
    return (v == '1' || v == 'true')
  },
  getObject(key) {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch {
      return null
    }
  },
  // 删除数据
  remove(key) {
    localStorage.removeItem(key)
  }
}

export default storage
