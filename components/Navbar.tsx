import React from 'react';
import Brand from './Brand';

interface NavbarProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const navigation = [
  { title: 'Acasă', path: '/' },
  { title: 'Horoscopul de azi', path: '/DailyHoroscope' },
  { title: 'Horoscop săptămânal', path: '/WeeklyHoroscope' },
  { title: 'Horoscopul lunar', path: '/MonthlyHoroscope' },
];

const Navbar: React.FC<NavbarProps> = ({state, setState}) => {
  return (
    <div>
      {/* Navbar toggle menu for mobile */}
      <div className='flex justify-between items-center px-4 py-4 md:hidden'>
        <Brand 
          state={state} setState={setState}
        />

        <button className='menu-btn text-gray-400 hover:text-gray-300' onClick={() => setState(!state)}>
          {state ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          ): (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
              />
            </svg>
          )}
        </button>
      </div>

      {/* Dropdown menu on mobile screen */}
      <div className={`md:hidden ${state ? 'block' : 'hidden'}`}>
        <nav className='bg-gray-100 py-2'>
          <ul className='space-y-4 text-center'>
            {navigation.map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.path}
                  className='block px-4 py-2 text-black hover:bg-gray-700 rounded'
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Desktop menu */}
      <nav className='hidden md:flex justify-between items-center max-w-screen-xl mx-auto px-4 py-4'>
        <Brand state={state} setState={setState} />
        <ul className='flex space-x-6'>
          {navigation.map((item, idx) => (
            <li key={idx}>
              <a
                href={item.path}
                className='text-black hover:text-gray-400 transition'
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar;