import Section from './components/Section';
import { useCounter } from './lib/hooks/useCounter';
import { useMousePosition } from './lib/hooks/useMousePosition';
import { useCounterTracker } from './lib/hooks/useCounterTracker';
import { useFetchData } from './lib/hooks/useFetchData';
import { Post } from './lib/types';

const App = () => {
  const { count, increment, decrement } = useCounter();
  const { xPosition, yPosition } = useMousePosition();
  const { state, incrementCountAndSetLastClick } = useCounterTracker();
  const { data, loading, error } = useFetchData<Post[]>(
    'https://jsonplaceholder.typicode.com/posts'
  );

  return (
    <div className='h-screen grid grid-rows-2 grid-cols-3 gap-4 p-4'>
      {/* Top Sections */}
      <Section
        title='useCounter'
        description='A simple counter hook to demonstrate state and actions.'
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
      >
        <div className='flex items-center justify-between space-x-4 mt-20'>
          <div className='border border-zinc-400 p-2'>{`X Position: ${xPosition}`}</div>
          <div className='border border-zinc-400 p-2'>{`Y Position: ${yPosition}`}</div>
        </div>
      </Section>
      <Section
        title='useCounterTracker'
        description='Tracks a counter and records the timestamp of the last increment.'
      >
        <div className='flex flex-col items-center space-x-4 mt-20'>
          <button
            onClick={incrementCountAndSetLastClick}
          >{`Count is: ${state.count}`}</button>
          <p>
            Last clicked at:{' '}
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
      >
        <div className='flex flex-col items-center space-x-4 mt-6'>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {data && data.length > 0 && (
            <div>
              {data.slice(0, 5).map((post) => (
                <p key={post.id}>{`Title: ${post.title}`}</p>
              ))}
            </div>
          )}
        </div>
      </Section>
    </div>
  );
};

export default App;
