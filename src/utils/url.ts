/*
 * @Description:
 * @Date: 2022-12-03 18:29:49
 * @LastEditTime: 2023-02-21 22:00:25
 */

import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { cleanObject, subset } from "utils";
// 返回页面url中，指定键的参数值(从url中获取参数)
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  // searchParams是对象为什么可以放在useMemo的依赖中？
  // searchParams是从useSearchParams中获取的state，只有在使用setuseSearchParam时才会改变
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  const [stateKeys] = useState(keys);
  return [
    // 每次会创建新的对象，使用usememo优化
    // useMemo:只有searchParams改变时，才会运行计算()=>
    useMemo(
      () =>
        subset(Object.fromEntries(searchParams), stateKeys) as {
          [key in K]: string;
        },
      [searchParams, stateKeys]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(params);
    },
  ] as const;
};

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParams;
    return setSearchParam(o);
  };
};
