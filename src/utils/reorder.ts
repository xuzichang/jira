/*
 * @Description:
 * @Date: 2023-03-23 14:26:19
 * @LastEditTime: 2023-03-23 14:39:55
 */
export const reorder = ({
  fromId,
  type,
  referenceId,
  list,
}: {
  fromId: number;
  type: "after" | "before";
  referenceId: number;
  list: { id: number }[];
}) => {
  const copiedList = [...list];
  // 找到fromId对应项目的下标
  const movingItemIndex = copiedList.findIndex((item) => item.id === fromId);
  if (!referenceId) {
    return insertAfter([...copiedList], movingItemIndex, copiedList.length - 1);
  }

  const targetIndex = copiedList.findIndex((item) => item.id === referenceId);
  const insert = type === "after" ? insertAfter : insertBefore;
  return insert([...copiedList], movingItemIndex, targetIndex);
};

const insertBefore = (list: unknown[], from: number, to: number) => {
  const toItem = list[to];
  const removedItem = list.splice(from, 1)[0];
  const toIndex = list.indexOf(toItem);
  list.splice(toIndex, 0, removedItem);
  return list;
};

const insertAfter = (list: unknown[], from: number, to: number) => {
  const toItem = list[to];
  const removedItem = list.splice(from, 1)[0];
  const toIndex = list.indexOf(toItem);
  list.splice(toIndex + 1, 0, removedItem);
  return list;
};
