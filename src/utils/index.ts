/*
 * @Description:
 * @Date: 2022-09-23 14:24:41
 * @LastEditTime: 2022-10-03 14:19:43
 */

import { useEffect, useState } from "react";

// 判断值是不是0，不是则取反变成布尔值
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

// 不修改传入对象本身
export const cleanObject = (object: object) => {
  const result: any = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    // 排除value为0的情况
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

// 将value转换为debouncedValue
// 箭头函数中使用泛型，传入参数是什么类型返回就是什么类型
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  // 每次value变化时设置一个定时器
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行。类比第一个设置的timeout被第二个清理，第二个被第三个清理，只有最后一个可以保留下来
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

// const debounce = (func,delay)=>{
//     let timeout;
//     return ()=>{
//         if(timeout){ // 一开始timeout是undefined，跳过
//             clearTimeout(timeout);
//         }
//         timeout = setTimeout(function(){
//             func();
//         },delay)
//     }
// }

// const log = debounce(()=>console.log('call'),5000)
// log()
// log()
// log()

// 原理讲解
// 0s-------->1s-------->2s-------->3s-------->....
// 三个函数同步操作，所以它们都是再0-1s时间段内瞬间完成
// log()#1  // timeout#1
// log()#2  // 发现 timeout#1！ 取消，设置timeout#2
// log()#3  // 发现 timeout#2！ 取消，设置timeout#3
//          // 所以，log()#3 结束后，只剩timeout#3在独自等待
