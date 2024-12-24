import { FC, ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
  description?: string;
}

const Section: FC<SectionProps> = ({ title, children, description }) => {
  return (
    <div className='p-6 border rounded-lg shadow-md bg-white'>
      <h2 className='text-2xl font-semibold mb-2'>{title}</h2>
      {description && <p className='text-gray-600 mb-4'>{description}</p>}
      <div>{children}</div>
    </div>
  );
};

export default Section;
