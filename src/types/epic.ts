/*
 * @Description:
 * @Date: 2023-03-23 21:55:34
 * @LastEditTime: 2023-03-23 21:57:02
 */
export interface Epic {
  id: number;
  name: string;
  projectId: number;
  // 开始时间
  start: number;
  // 结束时间
  end: number;
}
