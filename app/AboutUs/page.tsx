'use client'

import Header from '@/components/Header';
import React from 'react'

const AboutUs = () => {
  return (
    <>
      <Header
        state={false}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setState={function (_: React.SetStateAction<boolean>): void {
          throw new Error('Function not implemented.');
        }}
      />
      <div className='sm:flex items-center max-w-screen-xl'>
        <div className='sm:w-1/2 p-10'>
          <div className='image object-center text-center'>
            <img src='https://i.imgur.com/WbQnbas.png'/>
          </div>
        </div>

        <div className='sm:w-1/2 p-5'>
          <div className='text'>
            <span className='text-gray-500 border-b-2 border-indigo-600 uppercase'>
              About us
            </span>
            
            <h2 className='my-4 font-bold text-3xl sm:text-4xl'> Despre <span className='text-indigo-600'>Zodiac Fast</span></h2>
          
            <p className='text-gray-700'>
              Bine ați venit la <span className='font-bold text-indigo-600'>Zodiac Fast</span>, 
              sursa dumneavoastră de încredere pentru informații astrologice și horoscoape personalizate. 🌌✨
            </p>

            <p className='text-gray-700 mt-4'>
              Scopul nostru este să aducem mai aproape misterele astrologiei, oferindu-vă
              înțelepciunea de a naviga prin provocările vieții și de a vă bucura de bucuriile acesteia.
              Indiferent dacă sunteți în căutarea inspirației zilnice sau doriți să explorați trăsăturile unice ale
              fiecărui semn zodiacal, suntem aici pentru voi.
            </p>

            <p className='text-gray-700 mt-4'>
              Cu articole de specialitate și actualizări regulate, <span className='font-bold'>Zodiac Fast</span> vă ajută să vă conectați cu energia cosmică și să vă aliniați cu stelele. 
              Toate articolele postate pe acest site folosesc AI pentru a va furniza horoscopul.
            </p>

            <p className='text-gray-700 mt-4'>
              Vă mulțumim că ne-ați ales pentru a explora misterele universului. Haideți să descoperim împreună secretele zodiacului. 🌠
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutUs