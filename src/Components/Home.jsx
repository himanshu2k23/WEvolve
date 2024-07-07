import React from 'react'
import Banner from './HomeComponents/Banner'
import ContactUs from './HomeComponents/ContactUs'
import OurPlatform from './HomeComponents/OurPlatform'

export default function Home() {
  return (
    <div className='bg-gray-50'>
      <Banner />      
      <OurPlatform />
      <hr className="h-px my-6 bg-gray-200 border-none" />
      <ContactUs />
    </div>
  )
}
