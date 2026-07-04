'use client';
import {useState, useEffect} from 'react';

type creatTodo = {title: string};

type Todo = {
    id: number;
    title: string;
    completed: boolean;
}

export default function useTodos(){
    const [todos, setTodos] = useState<Todo[]>([])
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
       fetchTodos()
    },[])

    async function fetchTodos(){
        try{
            const res = await fetch('/api/todos');
            if(!res.ok) throw new Error(`Fetch failed ${res.status}`)
            const data = (await res.json()) as Todo[];
        setTodos(data);
        }catch(e){
           console.error('Fetching todo',e);
        }finally{
            setLoading(false);
        }
    }

    const addTodo =async(title:string) => {
       try{
        const res = await fetch('/api/todos',{
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({title})
        })
        if(!res.ok) throw new Error(`Fetch failed ${res.status}`)
        const created = (await res.json()) as Todo;
        setTodos(prev=> [created, ...prev])
       }catch(e){
           console.error("Failed add todo", e);
           
       }
    }

    const updateTodo = async (id: number, title: string) => {
        try{
            const res = await fetch('/api/todos/', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, title })
            })
            if (!res.ok) throw new Error(`Fetch failed ${res.status}`)
            const updated = (await res.json()) as Todo;
            setTodos(prev=> prev.map(t=> t.id === id ? updated : t));
        }catch(e){
             console.error('Failed updating todo', e);
             
        }
    }

    const toggleTodo = async(id:number, completed: boolean) => {
        try{
            const res = await fetch('/api/todos/', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, completed })
            })
            if (!res.ok) throw new Error(`Fetch failed ${res.status}`);
            const updated = (await res.json()) as Todo;
            setTodos(prev=>prev.map(t=>t.id === id ? updated : t))
        }catch(e){
            console.error('Failed toggle todo', e);
        }
    }

    const deleteTodo = async(id:number)=>{
        try{
            const res = await fetch('/api/todos/', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            })
            if (!res.ok) throw new Error(`Fetch failed ${res.status}`);
            setTodos(prev=>prev.filter(t=>t.id !==id))
        }catch(e){
           console.error('Error deleting todo', e);
        }
    }

    return{
        todos,
        loading,
        addTodo,
        updateTodo,
        toggleTodo,
        deleteTodo
    }
}