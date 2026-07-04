'use client';

import { useState } from 'react';

type Props = {
  addTodo: (title: string) => void;
};

export default function NewTodo({ addTodo }: Props) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = inputValue.trim();

    if (!trimmed) return;

    addTodo(trimmed);

    setInputValue('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 mb-8"
    >
      <input
        type="text"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="
        flex-1
        rounded-xl
        bg-white/10
        border
        border-white/20
        px-5
        py-3
        text-white
        placeholder:text-slate-400
        outline-none
        focus:ring-2
        focus:ring-indigo-400
        "
      />

      <button
        className="
        px-6
        rounded-xl
        bg-indigo-500
        hover:bg-indigo-600
        text-white
        font-semibold
        transition
        "
      >
        Add
      </button>
    </form>
  );
}