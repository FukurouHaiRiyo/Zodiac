import React, { useState } from 'react';
import Brand from './Brand';
import Navbar from './Navbar';
import HoroscopeAPI from '@/app/scripts/Horoscope';

interface HeaderProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ state, setState }) => {
  return (
    <header className='relative z-20 bg-gray-200 text-black'>
      <Navbar state={state} setState={setState} />
    </header>
  );
};

export default Header;
