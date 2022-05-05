import axios from '@/utils/service'
import { ArrayToObj } from "@/utils/todo.js";

export const PublicLoadData = (url,options,kinds)=>{
    const list2 = [];
    let total = 0;
    
    return new Promise((resolve, reject) => {
      axios.post(url, options).then((res) => {
        console.log(res,"res")

        if (res.msg == "成功") {
          const { rows, cols } = res.result;
          total = res.total;
          // this.pageCount = Math.ceil(res.total / this.size);
          if (rows.length > 0 && cols.length > 0) {
            if (kinds) {
              rows.map(function (item) {
                list2.push(ArrayToObj(cols, item));
              });
              list2.forEach((item) => {
                kinds.forEach((item2) => {
                  if (item2.value == item.CenterKind) {
                    item.CenterKind = item2.text;
                  }
                });
              });
              resolve({ 
                data:list2,
                total:total
               });
            }
          }else{
            resolve({ 
                data:[],
                total:0
               });
          }
        } else {
            reject({
              error:''
            })
          }
      });
    });
  }