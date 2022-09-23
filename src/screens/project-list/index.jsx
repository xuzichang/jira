import { List } from "./list"
import { SearchPanel } from "./search-pannel"
import React from 'react';
import {useEffect,useState} from 'react'
import { cleanObject } from "utils";
import qs from 'qs'
/*
 * @Description: 
 * @Date: 2022-04-16 11:54:36
 * @LastEditTime: 2022-09-23 14:35:04
 */
const apiUrl=process.env.REACT_APP_API_URL
export const ProjectListScreen=()=>{
    const [users,setUsers] = useState([])
    const [param,setParam] = useState({
        name:"",
        personId:""
    })
    const [list,setList] = useState([])

    useEffect(()=>{
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response=>{
            if(response.ok){
                setList(await response.json())
            }
        })
    },[param])
    // 初始化users
    useEffect(()=>{
        fetch(`${apiUrl}/users`).then(async response=>{
            if(response.ok){
                setUsers(await response.json())
            }
        })
    },[])
    
    return <div>
        <SearchPanel users={users} param={param} setParam={setParam}/>
        <List users={users} list={list}/>
    </div>
}