import AddTodo from '@/components/todos/AddTodo'
import React from 'react'

function Home() {
  return (
    <div className='w-screen py-20 justify-center items-center flex-col flex'>
      <span className='text-4xl font-extrabold uppercase'>Todo App</span>
      <h1 className='text-5xl font-extrabold uppercase mb-5 text-center'>
        <span className='lowercase'>w/</span>Server Actions
      </h1>
      <div className='flex justify-center items-center flex-col'>
        {/* Add todo items */}
        <AddTodo />
        {/* map todo */}
        <div className>
          {}
        </div>
      </div>
    </div>
  )
}

export default Home
