import { NextResponse } from "next/server";
import {prisma} from '@/lib/prisma';
import {z} from 'zod';

const creatTodoSchema = z.object({
    title: z.string().min(1, 'Title must not be empty')
})

const updateTodoSchema = z.object({
    id: z.union([z.string(), z.number()]).transform(val=>Number(val)),
    title: z.string().optional(),
    completed: z.boolean().optional()
})

const deleteTodoSchema = z.object({
    id: z.union([z.string(), z.number()]).transform(val=>Number(val))
})

export async function GET(){
    try{
        const todos = await prisma.todo.findMany({
            orderBy: {createdAt: 'desc'}
        });
        return NextResponse.json(todos,{status:200})
    }catch(e){
        console.error('Error fetching todos', e);
        return NextResponse.json({error: 'Error  fetching todos. Please try again later'}, {status:500})
    }
}

export async function POST(req:Request){
     try{
        const body = await req.json();
        const parsed = creatTodoSchema.safeParse(body);     // {success: true, data: {}}
        if(!parsed.success){
            const msg = parsed.error.errors.map(e=>e.message).join(', ');
            return NextResponse.json({error: msg}, {status:400})
        }
        const {title} = parsed.data;
        const todo = await prisma.todo.create({data: {title}})
        return NextResponse.json(todo,{status:201})
     }catch(e){
       console.error('Error creating todo', e);
       return NextResponse.json({error: 'Error creating todo. Please try again later'}, {status: 500})
     }
}

export async function PUT(req: Request){
   try{
    const body = await req.json();
    const parsed = updateTodoSchema.safeParse(body); //{success, data}
    if(!parsed.success){
        const msg = parsed.error.errors.map(e=>e.message).join(', ');
        return NextResponse.json({error: msg}, {status:400})
    }
    const {id, title, completed} = parsed.data;
    const existing = await prisma.todo.findUnique({where: {id}})
    if(!existing){
        return NextResponse.json({error: 'Todo not found'}, {status:404})
    }
    const dataToUpdate: {title?:string, completed?:boolean} = {};
    if(typeof title === 'string'){
        dataToUpdate.title = title;
    }
    if(typeof completed === 'boolean'){
        dataToUpdate.completed = completed;
    }
    const updated = await prisma.todo.update({where: {id}, data: dataToUpdate});
    return NextResponse.json(updated, {status:200})
   }catch(e){
      console.error('Error updating todo', e);
      return NextResponse.json({error: 'Error updating todo. Please try again later'}, {status: 500})
   }
}

export async function DELETE(req: Request){
    try{
        const body = await req.json();
        const parsed = deleteTodoSchema.safeParse(body); //{success, data={id}}
        if(!parsed.success){
            const msg = parsed.error.errors.map(e=>e.message).join(', ');
            return NextResponse.json({error: msg}, {status:400})
        }
        const {id} = parsed.data;
        const existing = await prisma.todo.findUnique({where: {id}})
        if(!existing){
            return NextResponse.json({error: 'Todo not found'}, {status:404})
        }
        return new NextResponse(null, {status:204})
    }catch(e){
        console.error('Error deleteing todo', e);
        return NextResponse.json({error: 'Error deleting todo. Please try again later'}, {status: 500})
        
    }
}