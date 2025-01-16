import Button from '@/components/ui/Button'
import Image from 'next/image'
import React from 'react'

function CTASection() {
  return (
    <div>
      <div className="h-screen flex justify-center items-center">
        <div className="max-w-4xl text-center">
          <h1 className="mb-md text-7xl capitalize leading-[1.2]">
            Automate your business with XMA Boost
          </h1>
          <p className="mb-xl capitalize text-balance ">
            A powerful automation tool that helps you automate your business
            processes and workflows.
          </p>
          <Button>Get Started Now</Button>
        </div>
      </div>

      <Image src="/images/boost-1.png" width={400} height={400} />
    </div>
  )
}

export default CTASection
