'use client';
import Features from '@/components/Features';
import Header from '@/components/Header';
import { useState } from 'react';

import { database } from '@/app/libs/firebase'; // import your Firebase setup
import { ref, set, push } from 'firebase/database';

export default function Home() {
  // State to control navigation dropdown for mobile view
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [email, setEmail] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const saveEmailToDatabase = async (email: string) => {
    try {
      const emailsRef = ref(database, 'newsletter_emails');
      const newEmailRef = push(emailsRef);
      await set(newEmailRef, { email });
      console.log('Email saved successfully');
    } catch (error) {
      console.error('Error saving email:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Send the email to the database
    await saveEmailToDatabase(email);

    // Optional: provide feedback to the user
    alert("You've successfully signed up for horoscope newsletters!");
  };

  return (
    <>
      <div className='bg-white min-h-screen flex flex-col justify-between'>
        {/* Header with state for navigation toggle */}
        <Header state={isNavOpen} setState={setIsNavOpen} />

        {/* Hero Section */}
        <section className='relative flex-grow flex items-center'>
          <div className='relative z-10 max-w-screen-xl mx-auto px-4 py-20 md:px-8 text-center space-y-10'>
            <div className='max-w-4xl mx-auto'>
              <h2 className='text-4xl text-black font-extrabold md:text-5xl'>
                Bun venit la AstroSphere! 🌌✨
              </h2>
              <p className='max-w-2xl mx-auto text-gray-600'>
                Pe AstroSphere, descoperiți trăsăturile unice ale fiecărui semn zodiacal, obțineți îndrumări despre dragoste, carieră și finanțe și obțineți informații despre punctele voastre celesti.
              </p>
            </div>

            {/* Features Component */}
            <Features />

            {/* Newsletter Subscription Form */}
            <form
              onSubmit={handleSubmit}
              className='justify-center items-center gap-x-3 flex flex-col sm:flex-row'
            >
              <input
                type='email'
                id='email'
                value={email}
                onChange={handleEmailChange}
                required
                placeholder='Introduceți adresa de email'
                className='w-full px-4 py-2.5 text-black bg-gray-200 focus:bg-gray-300 duration-150 outline-none rounded-lg shadow sm:max-w-sm sm:w-auto'
              />
              <button className='flex items-center gap-x-2 py-2.5 px-4 mt-3 sm:mt-0 w-full sm:w-auto text-sm text-white font-medium bg-sky-500 hover:bg-sky-400 active:bg-sky-600 duration-150 rounded-lg'>
                Abonare newsletter
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  className='w-5 h-5'
                >
                  <path
                    fillRule='evenodd'
                    d='M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </form>
          </div>

          {/* Background Gradient */}
          <div
            className='absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg'
            style={{
              background:
                'linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)',
            }}
          ></div>
        </section>
      </div>
    </>
  );
}
