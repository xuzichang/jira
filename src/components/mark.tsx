/*
 * @Description: 高亮关键字
 * @Date: 2023-03-19 16:48:51
 * @LastEditTime: 2023-03-19 16:53:02
 */
import React from "react";

// '项目管理的项目'=>   [项目,管理的,项目]  => 最后一个不高亮
// '项目'
export const Mark = ({ name, keyword }: { name: string; keyword: string }) => {
  if (!keyword) {
    return <>{name}</>;
  }
  const arr = name.split(keyword);

  return (
    <>
      {arr.map((str: string, index: number) => (
        <span key={index}>
          {str}
          {index === arr.length - 1 ? null : (
            <span style={{ color: "#257AFd" }}>{keyword}</span>
          )}
        </span>
      ))}
    </>
  );
};
