import React from 'react';
/*
 * @Description: 
 * @Date: 2022-04-16 11:56:41
 * @LastEditTime: 2022-09-23 14:18:50
 */
export const SearchPanel=({users,param,setParam})=>{
    return <form>
        <input type="text" value={param.name} onChange={evt=>setParam({
            ...param,
            name:evt.target.value
        })}></input>
        <select value={param.personId} onChange={evt=>setParam({
             ...param,
             personId:evt.target.value
        })}>
            <option value={""}>负责人</option>
            {
                users.map(user=><option key={user.id} value={user.id}>{user.name}</option>)
            }
        </select>
    </form>
}