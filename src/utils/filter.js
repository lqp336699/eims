export const enToCn = (cols) => {
  const obj = {
    ProcNo: '工序名称',
    ProcDesc: '备注',
    CenterId: '生产中心',
    ProcType: '工序描述',
    CenterName: '生产中心',
    ProcTag: '标记',
    Modifor: '更新人'
  }
  Object.keys(obj).forEach((key, item) => {
    const arr = cols.filter(item2 => {
      return item2 == key
    })
    console.log(arr)
    console.log(key, obj[key])
  })

  // for (let j = 0; j < cols.length; j++) {
  //     for (let i in obj) {
  //         console.log(i, obj[i], cols[j])
  //         if(cols[j]==i){
  //             cols.splice(j,1,obj[i])
  //             console.log(cols)
  //         }
  //     }

  //     return cols;
  // }
}
