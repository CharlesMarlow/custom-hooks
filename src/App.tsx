import { useCounter } from './lib/hooks/useCounter';
import Section from './components/Section';

const App = () => {
  const { count, increment, decrement } = useCounter();

  return (
    <div className='h-screen grid grid-rows-2 grid-cols-3 gap-4 p-4'>
      {/* Top Sections */}
      <Section
        title='useCounter'
        description='A simple counter hook to demonstrate state and actions.'
      >
        <div className='flex items-center justify-between space-x-4 mt-24'>
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
    </div>
  );
};

export default App;
