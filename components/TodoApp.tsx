'use client';

import useTodos from '@/hooks/useTodos';
import TodoList from './TodoList';
import NewTodo from './NewTodo';

export default function TodoApp() {
  const {
    todos,
    loading,
    addTodo,
    deleteTodo,
    toggleTodo,
    updateTodo,
  } = useTodos();

  const completed = todos.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-6">

      <div className="w-full max-w-2xl rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8">

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-white">
            My Todo List
          </h1>

          <p className="text-slate-300 mt-2">
            Stay productive every day.
          </p>

          <div className="flex gap-4 mt-5">

            <div className="bg-white/10 rounded-xl px-4 py-3">
              <p className="text-slate-300 text-sm">
                Total
              </p>

              <h2 className="text-white text-2xl font-bold">
                {todos.length}
              </h2>

            </div>

            <div className="bg-emerald-500/20 rounded-xl px-4 py-3">

              <p className="text-slate-300 text-sm">
                Completed
              </p>

              <h2 className="text-emerald-400 text-2xl font-bold">
                {completed}
              </h2>

            </div>

          </div>

        </div>

        <NewTodo addTodo={addTodo} />

        <TodoList
          todos={todos}
          loading={loading}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
          updateTodo={updateTodo}
        />

      </div>

    </div>
  );
}