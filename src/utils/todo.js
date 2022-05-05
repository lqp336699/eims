export const f1 = (key, arr) => arr.map(item => ({
  [key]: item
}))

export const mergeArr = (oldArr, arr) => oldArr.map((item, index) => ({
  item,
  ...arr[index]
}))

export const ArrayToObj = (arrA, arrB) => {
  const info = {}
  for (var i = 0; i < arrA.length; i++) {
    info[arrA[i]] = arrB[i]
  }

  return info
}

