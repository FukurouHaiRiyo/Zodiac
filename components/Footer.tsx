import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className='bg-gray-800 text-white py-10'>
      <div className='max-w-screen-xl mx-auto px-4 text-center md:text-left md:flex md:justify-between'>
        {/* Nav links */}
        <div className='mb-6 md:mb-0'>
          <h3 className='text-lg font-semibold mb-2'>
            Navigare
          </h3>

          <ul className='space-y-2'>
            <li><a href='/' className='hover:text-gray-400'>Acasă</a></li>
            <li><a href='/features' className='hover:text-gray-400'>Funcționalități</a></li>
            <li><a href='/pricing' className='hover:text-gray-400'>Prețuri</a></li>
            <li><a href='/contact' className='hover:text-gray-400'>Contact</a></li>
          </ul>
        </div>

        {/* Social media */}
        
      </div>
    </footer>
  )
}

export default Footer;