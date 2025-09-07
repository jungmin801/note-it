import { Button } from '@/components/ui/button';
import type { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const getNote = async () => {
    try {
      const response = await fetch('http://localhost:8080/note');
      const result = await response.json();
      console.log(result);
    } catch (error) {}
  };

  return (
    <div className='flex flex-col min-h-screen'>
      {/* Header */}
      <header className='h-14 bg-gray-100 border-b px-4 flex items-center justify-between'>
        <h1 className='text-lg font-semibold'>NOTE IT</h1>
        <Button variant='outline'>Logout</Button>
      </header>

      <div className='flex flex-1'>
        {/* Left Sidebar */}
        <aside className='w-60 bg-gray-50 border-r p-4'>
          <nav>
            <ul className='space-y-2'>
              <li>
                <a href='#' className='text-sm'>
                  Dashboard
                </a>
              </li>
              <li>
                <a href='#' className='text-sm'>
                  Settings
                </a>
              </li>
              <li>
                <a href='#' className='text-sm'>
                  Help
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className='flex-1 p-6 bg-white overflow-y-auto' id='main'>
          {children}
        </main>

        {/* Right Sidebar */}
        <aside className='w-64 bg-gray-50 border-l p-4 hidden lg:block'>
          <button onClick={getNote} className='w-10 h-10'>
            요청
          </button>
        </aside>
      </div>
    </div>
  );
}
