import { useState } from 'react';
import Section from './components/Section';
import { useCounter } from './lib/hooks/useCounter';
import { useMousePosition } from './lib/hooks/useMousePosition';
import { useCounterTracker } from './lib/hooks/useCounterTracker';
import { useFetchData } from './lib/hooks/useFetchData';
import { useDebounce } from './lib/hooks/useDebounce';
import { Post } from './lib/types';

const App = () => {
  const { count, increment, decrement } = useCounter();
  const { xPosition, yPosition } = useMousePosition();
  const { state, incrementCountAndSetLastClick } = useCounterTracker();
  const { data, loading, error } = useFetchData<Post[]>(
    'https://jsonplaceholder.typicode.com/posts'
  );
  const [searchTerm, setSearchTerm] = useState<string>('');
  const handleSearch = (value: string) => console.log(`Searching ${value}`);
  const [debouncedValue] = useDebounce(searchTerm, handleSearch, 200);

  const bgColors = [
    'bg-blue-100',
    'bg-green-100',
    'bg-yellow-100',
    'bg-zinc-200',
    'bg-purple-100',
  ];

  return (
    <div className='h-screen grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
      {/* Top Sections */}
      <Section
        title='useCounter'
        description='A counter hook to demonstrate state and actions.'
        className={bgColors[0]}
      >
        <div className='flex items-center justify-between space-x-4 mt-20'>
          <button
            onClick={decrement}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
          >
            Decrement
          </button>
          <span className='text-xl font-bold'>{count}</span>
          <button
            onClick={increment}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
          >
            Increment
          </button>
        </div>
      </Section>

      <Section
        title='useMousePosition'
        description="Tracks the mouse's x and y positions in real-time."
        className={bgColors[1]}
      >
        <div className='flex items-center justify-between space-x-4 mt-20'>
          <div className='border border-zinc-400 rounded p-2'>{`X Position: ${xPosition}`}</div>
          <div className='border border-zinc-400 rounded p-2'>{`Y Position: ${yPosition}`}</div>
        </div>
      </Section>

      <Section
        title='useCounterTracker'
        description='Tracks a counter and records the timestamp of the last increment.'
        className={bgColors[2]}
      >
        <div className='flex flex-col items-center space-x-4 space-y-6 mt-20'>
          <p onClick={incrementCountAndSetLastClick}>
            <span className='font-semibold'>Count is: </span>
            <button className='px-4 py-2 bg-zinc-500 text-white rounded hover:bg-zinc-600 transition'>
              {state.count}
            </button>
          </p>
          <p>
            <span className='font-semibold mt-10'>Last clicked at: </span>
            {state.lastClick
              ? new Date(state.lastClick).toLocaleString()
              : 'Never'}
          </p>
        </div>
      </Section>

      {/* Bottom Sections */}
      <Section
        title='useFetchData'
        description='Fetches data from an API, managing loading state and errors.'
        className={`${bgColors[3]} col-span-1 sm:col-span-2`}
      >
        <div className='flex flex-col items-center space-x-4 mt-12'>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {data && data.length > 0 && (
            <div>
              {data.slice(0, 5).map((post) => (
                <p key={post.id}>
                  <span className='font-semibold'>Title: </span>
                  {post.title}
                </p>
              ))}
            </div>
          )}
        </div>
      </Section>

      <Section
        title='useDebounce'
        description='Delays updating a value until after a specified wait time and invokes a callback with the debounced value.'
        className={bgColors[4]}
      >
        <div className='flex flex-col items-center space-x-4 mt-16'>
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <p>
            <span className='font-semibold'>Search term:</span> {debouncedValue}
          </p>
        </div>
      </Section>
    </div>
  );
};

export default App;
