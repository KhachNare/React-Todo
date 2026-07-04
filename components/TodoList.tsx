'use client';

import { useEffect, useRef, useState } from 'react';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type Props = {
  todos: Todo[];
  loading: boolean;
  updateTodo: (id: number, title: string) => void;
  toggleTodo: (id: number, completed: boolean) => void;
  deleteTodo: (id: number) => void;
};

export default function TodoList({
  todos,
  loading,
  updateTodo,
  toggleTodo,
  deleteTodo,
}: Props) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [editingId]);

  if (loading)
    return (
      <p className="text-center text-slate-300 py-8">
        Loading...
      </p>
    );

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingValue(todo.title);
  };

  const saveEditing = (id: number) => {
    if (editingValue.trim()) {
      updateTodo(id, editingValue.trim());
    }

    setEditingId(null);
  };

  return (
    <div className="space-y-3">

      {todos.map((todo) => (
        <div
          key={todo.id}
          className="
          flex
          justify-between
          items-center
          rounded-xl
          bg-white/5
          border
          border-white/10
          p-4
          hover:bg-white/10
          transition
          "
        >
          {editingId === todo.id ? (
            <input
              ref={inputRef}
              value={editingValue}
              onChange={(e) => setEditingValue(e.target.value)}
              onBlur={() => saveEditing(todo.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') saveEditing(todo.id);

                if (e.key === 'Escape')
                  setEditingId(null);
              }}
              className="
              flex-1
              bg-transparent
              border-b
              border-indigo-400
              outline-none
              text-white
              "
            />
          ) : (
            <div className="flex items-center gap-4 flex-1">

              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  toggleTodo(todo.id, !todo.completed)
                }
                className="w-5 h-5 accent-indigo-500"
              />

              <span
                onDoubleClick={() =>
                  startEditing(todo)
                }
                className={`
                cursor-pointer
                text-lg
                ${
                  todo.completed
                    ? 'line-through text-slate-400'
                    : 'text-white'
                }
                `}
              >
                {todo.title}
              </span>

            </div>
          )}

          <button
            onClick={() => deleteTodo(todo.id)}
            className="
            px-4
            py-2
            rounded-lg
            bg-red-500/20
            text-red-300
            hover:bg-red-500
            hover:text-white
            transition
            "
          >
            Delete
          </button>
        </div>
      ))}

    </div>
  );
}