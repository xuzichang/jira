/*
 * @Description:
 * @Date: 2022-12-03 18:29:49
 * @LastEditTime: 2022-12-03 20:18:34
 */
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";
// 返回页面url中，指定键的参数值(从url中获取参数)
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  // searchParams是对象为什么可以放在useMemo的依赖中？
  // searchParams是从useSearchParams中获取的state，只有在使用setuseSearchParam时才会改变
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    // 每次会创建新的对象，使用usememo优化
    // useMemo:只有searchParams改变时，才会运行计算()=>
    useMemo(
      () =>
        keys.reduce((prev: { [key in K]: string }, key: K) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      [searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParams;
      return setSearchParam(o);
    },
  ] as const;
};
