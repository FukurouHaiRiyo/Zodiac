import React from 'react';
import Navbar from './Navbar';

interface HeaderProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ state, setState }) => {
  return (
    <header className='relative z-20 bg-gray-100 text-black'>
      <Navbar state={state} setState={setState} />
    </header>
  );
};

export default Header;
