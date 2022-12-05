/*
 * @Description: 封装自己的收藏
 * @Date: 2022-12-05 16:46:35
 * @LastEditTime: 2022-12-05 17:18:57
 */
import React from "react";
import { Rate } from "antd";

interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Pin = ({ checked, onCheckedChange, ...restProps }: PinProps) => {
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      // !!num  相当于 Boolean(num)
      onChange={(num) => onCheckedChange?.(!!num)}
      {...restProps}
    />
  );
};
