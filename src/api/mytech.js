import axios from '@/utils/service'
import { ArrayToObj } from "@/utils/todo.js";

// 工序列表
export const procList = 'api/tech/proc/list'
// 工序中心inds
// export const procKinds = 'api/tech/proc/kinds'
// 生产中心列表
export const centerList = 'api/pm/center/list'
// 生产中心编辑
export const centerSave = 'api/pm/center/save'

// 生产中心删除
export const centerDel = 'api/pm/center/del'
// 生产中心添加
export const centerAdd = 'api/pm/center/add'
// 工序类型添加
export const procAdd = 'api/tech/proc/add'
// 工序类型
export const kindsApi = 'api/tech/proc/kinds'



// export const techCenter = 'api/tech/proc/list'
// export const techCenter = 'api/tech/proc/list'
// export const techCenter = 'api/tech/proc/list'
// export const techCenter = 'api/tech/proc/list'
// export const techCenter = 'api/tech/proc/list'
// export const techCenter = 'api/tech/proc/list'
// export const techCenter = 'api/tech/proc/list'
// export const techCenter = 'api/tech/proc/list'
// export const techCenter = 'api/tech/proc/list'
// export const techCenter = 'api/tech/proc/list'
// export const techCenter = 'api/tech/proc/list'
// export const techCenter = 'api/tech/proc/list'
// export const techCenter = 'api/tech/proc/list'

//

export const get_kinds = () => {
  return new Promise((resolve, reject) => {
    axios.get(kindsApi).then((rsp) => {
      var { success, result } = rsp
      if (success) {
        resolve(result)
      }
    })
  })
}

export const center_add = (data) => {
  return new Promise((resolve, reject) => {
    axios.post(centerAdd,data).then((rsp) => {
        resolve(rsp)
    })
  })
}

export const get_proc_kinds = (data) => {
  return new Promise((resolve, reject) => {
    axios.get(procKinds,data).then((rsp) => {
        resolve(rsp)
    })
  })
}

export const proc_add = (data) => {
  return new Promise((resolve, reject) => {
    axios.post(procAdd,data).then((rsp) => {
        resolve(rsp)
    })
  })
}






