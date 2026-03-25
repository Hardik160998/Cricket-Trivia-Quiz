import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  // Note: This requires a 'todos' table to exist in your Supabase project
  const { data: todos, error } = await supabase.from('todos').select()

  if (error) {
    console.error('Error fetching todos:', error);
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Supabase Connection Test</h1>
      {error ? (
        <div className="bg-red-50 p-4 rounded-lg text-red-600 border border-red-100">
          Failed to connect. Check console or credentials.
        </div>
      ) : (
        <ul className="space-y-2">
          {todos?.length === 0 && <li className="text-slate-500 italic">No todos found. Try adding some in Supabase!</li>}
          {todos?.map((todo: any) => (
            <li key={todo.id} className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
              {todo.name}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-12 text-xs text-slate-400">
        This page uses <code>createServerClient</code> for secure, server-side data fetching.
      </div>
    </div>
  )
}
