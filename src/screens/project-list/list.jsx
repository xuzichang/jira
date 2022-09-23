/*
 * @Description: 
 * @Date: 2022-04-16 11:56:00
 * @LastEditTime: 2022-09-23 14:19:07
 */
import React from 'react';
export const List=({list,users})=>{
    return <table>
        <thead>
            <tr>
                <th>名称</th>
                <th>负责人</th>
            </tr>
        </thead>
        <tbody>
            {
                list.map(project=><tr key={project.id} >
                    <td>{project.name}</td>
                    <td>{users.find(user=>user.id===project.personId)?.name || '未知'}</td>
                </tr>)
            }
        </tbody>
    </table>
}