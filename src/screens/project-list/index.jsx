import { List } from "./list"
import { SearchPanel } from "./search-pannel"
import React from 'react';
import {useEffect,useState} from 'react'
/*
 * @Description: 
 * @Date: 2022-04-16 11:54:36
 * @LastEditTime: 2022-04-16 12:43:11
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
        fetch(`${apiUrl}/projects`).then(async response=>{
            if(response.ok){
                setList(await response.json())
            }
        })
    },[param])
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