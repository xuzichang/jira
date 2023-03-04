/*
 * @Description:
 * @Date: 2023-03-04 15:32:54
 * @LastEditTime: 2023-03-04 15:33:39
 */
export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}
