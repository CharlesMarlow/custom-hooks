import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Section from '../../components/Section';

describe('<Section /> Tests', () => {
  it('renders the title correctly', () => {
    render(<Section title='Test Title'>Test Content</Section>);

    const titleElement = screen.getByText('Test Title');

    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe('H2');
  });

  it('renders the description when provided', () => {
    render(
      <Section title='Test Title' description='Test Description'>
        Test Content
      </Section>
    );

    const descriptionElement = screen.getByText('Test Description');

    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement.tagName.toLowerCase()).toBe('p');
  });

  it('does not render description if not provided', () => {
    render(
      <Section title='Test Title'>
        <div>Test Content</div>
      </Section>
    );

    const descriptionElement = screen.queryByText('Test Description');
    expect(descriptionElement).not.toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(
      <Section title='Test Title'>
        <div>Test Content</div>
      </Section>
    );

    const childElement = screen.getByText('Test Content');
    expect(childElement).toBeInTheDocument();
    expect(childElement.tagName).toBe('DIV');
  });

  it('applies the custom className', () => {
    const customClass = 'custom-class';
    render(
      <Section title='Test Title' className={customClass}>
        <div>Test Content</div>
      </Section>
    );

    const sectionElement = screen.getByText('Test Title').parentElement;
    expect(sectionElement).toHaveClass(customClass);
  });
});
