import { FC, ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
  description?: string;
  className?: string;
}

const Section: FC<SectionProps> = ({
  title,
  children,
  description,
  className,
}) => {
  return (
    <div
      className={`p-6 border rounded-lg shadow-md ${className || ''}`}
    >
      <h2 className='text-2xl font-semibold mb-2 underline'>{title}</h2>
      {description && <p className='text-gray-700 mb-4'>{description}</p>}
      <div>{children}</div>
    </div>
  );
};

export default Section;
