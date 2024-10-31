import React from 'react';

const Features = () => {
  return (
    <div className='mx-auto max-w-7xl px-6 lg:px-8'>
      <div className='mx-auto grid max-2-xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2'>
        <div className='lg:pr-8 lg:pt-4'>
          <div className='lg:max-w-lg'>
            <h2 className='text-base/7 font-semibold text-indigo-600'>Descoperiți destinul mai rapid!</h2>
            <p className='mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl'>O aliniere mai armonioasă</p>
            <p className='mt-6 text-lg/8 text-gray-600'>Sub semnul astrelor, trăim în armonie cu cosmosul. Descoperă misterele destinului, dincolo de obstacolele vieții și de dorințele sufletului, călăuziți de stele.</p>

            <dl className='mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none'>
              <div className='relative pl-9'>
                <dt className='inline font-semibold text-gray-900'>
                  <svg className='absolute left-1 top-1 h-6 w-6 text-indigo-500' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' data-slot='icon'>
                    <path
                      fillRule='evenodd'
                      d='M12 2.5c-.83 0-1.5.67-1.5 1.5S11.17 5.5 12 5.5s1.5-.67 1.5-1.5S12.83 2.5 12 2.5Zm0 15c-.83 0-1.5.67-1.5 1.5S11.17 20.5 12 20.5s1.5-.67 1.5-1.5S12.83 17.5 12 17.5Zm-6.5-6.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5Zm13 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5ZM12 9.25a.75.75 0 0 1 .75.75v4.5a.75.75 0 1 1-1.5 0v-4.5a.75.75 0 0 1 .75-.75Zm5.5-1.94c.31-.3.31-.77 0-1.06a.75.75 0 0 0-1.06 0L12 10.44 7.56 5.81a.75.75 0 1 0-1.06 1.06L10.44 12l-3.94 5.13a.75.75 0 1 0 1.06 1.06L12 13.56l4.44 4.63a.75.75 0 1 0 1.06-1.06L13.56 12l3.94-5.13Z'
                      clipRule='evenodd'
                    />
                  </svg>
                  Aliniază stelele. Lansează viziunea.
                </dt>
                <dd className='inline'> Când stelele se aliniază, toate obstacolele dispar. Inspirat de astre, urmează-ți drumul și lasă-te ghidat de cosmos.</dd>
              </div>

              <div className='relative pl-9'>
                <dt className='inline font-semibold text-gray-900'>
                  <svg className='absolute left-1 top-1 h-5 w-5 text-purple-600' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true' data-slot='icon'>
                    <path fillRule='evenodd' d='M10 2a1 1 0 0 1 .707 1.707L9.414 5.414l1.586 1.586A1 1 0 0 1 10 9l-2-2-2 2a1 1 0 0 1-1.707-.707l1.586-1.586L6.293 3.707A1 1 0 0 1 8 2h4Zm4.707 6.293a1 1 0 0 1-1.414 0L10 4.586 6.707 8.293a1 1 0 1 1-1.414-1.414L10 2l4.707 4.879a1 1 0 0 1 0 1.414Z' clipRule='evenodd' />
                  </svg>
                  Certificatul cosmic al destinului tău.
                </dt>
                <dd className='inline'> Energiile cosmice îți influențează fiecare pas, oferindu-ți îndrumare în căutarea destinului tău. Fiecare zodie te ajută să descoperi calea spre adevărata ta vocație.</dd>
              </div>
            </dl>
          </div>
        </div>
        <img src='aa.avif' alt='Product screenshot' className='w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0' width='2432' height='2000' />
      </div>
    </div>
  )
}

export default Features;