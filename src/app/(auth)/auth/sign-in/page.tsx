import React from 'react'
import Image from 'next/image'
import SignInFormClient from '@/modules/auth/components/sign-in-form-client'

function page() {
  return (
    <>
      <Image src={"/login.svg"} alt="Login-Image" height={300} width={300} className='m-6 object-cover'/>
      <SignInFormClient/>
    </>
  )
}

export default page
