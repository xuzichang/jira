/*
 * @Description:
 * @Date: 2022-09-23 14:24:41
 * @LastEditTime: 2022-09-23 14:34:12
 */
// 判断值是不是0，不是则取反变成布尔值
export const isFalsy = (value) => (value === 0 ? false : !value);
// 不修改传入对象本身
export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    // 排除value为0的情况
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};
