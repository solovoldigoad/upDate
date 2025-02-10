'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { User, Building } from 'lucide-react'
import axios from 'axios'
// import { useSession } from 'next-auth/react'



export default function MobileNumberEntry() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [userType, setUserType] = useState('jobseeker')
  const [error, setError] = useState('')
  const route = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const name = searchParams.get('name')
  const image = searchParams.get('image')
//   const {data: session , update} = useSession()

  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    if (value.length <= 10) {
      setPhoneNumber(value)
    }
  }
async function handleSubmit() {
    if (phoneNumber.length === 10) {
      try {
        const response = await axios.post("/api/SignUp/phoneNumber", {
          phoneNumber,
          userType, // Include userType in the request
          email,
          name,
          image
        })
        // update({
        //   ...session,
        //   user: {
        //     ...session?.user,
        //     phoneNumber,
        //   }
        // });
        if(response.status === 200 || response.status === 400){
          route.push("/SignUp/email")
        }
        console.log(`phone number sended successfully:${phoneNumber}` )

      } catch (error) {
        console.log("unable to send mobile number data")
      }
      // Here you would typically send the data to your backend
    } else {
      setError('Please enter a valid country code and 10-digit mobile number.')
    }
  }

  const isValid = phoneNumber.length === 10

  return (
    <div className='flex justify-center w-100% py-28 min-h-screen bg-gradient-to-br from-red-300 via-[#eeeeee] to-gray-300 '>
      <div className="flex flex-col items-center justify-center">
        <Card className="w-full max-w-md shadow-2xl relative overflow-hidden backdrop-blur-md border border-white/50">
          <div className="absolute inset-0 bg-gradient-45 from-[#ffebee] via-[#ef5350] to-[#ffebee] animate-gradient bg-[length:400%_400%]"/>
          <CardHeader className="text-center space-y-6 pb-0 relative">
            <h1 className="text-6xl font-bold text-[#ee0000] hover:text-[#cc0000] transition-colors">UpDate</h1>
            <CardTitle className="text-2xl font-bold text-[#111111]">Choose Account Type</CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className='flex flex-col gap-6 w-full items-center p-6'>
              <div className="grid grid-cols-2 gap-3 w-full">
                <button
                  type="button"
                  onClick={() => setUserType('jobseeker')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    userType === 'jobseeker'
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-red-200'
                  }`}
                >
                  <User className={`w-6 h-6 mx-auto mb-1 ${
                    userType === 'jobseeker' ? 'text-black' : 'text-black'
                  }`} />
                  <p className={`text-xs font-bold ${
                    userType === 'jobseeker' ? 'text-red-500' : 'text-gray-600'
                  }`}>Job Seeker</p>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('employer')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    userType === 'employer'
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-red-200'
                  }`}
                >
                  <Building className={`w-6 h-6 mx-auto mb-1 ${
                    userType === 'employer' ? 'text-black' : 'text-black'
                  }`} />
                  <p className={`text-xs font-bold ${
                    userType === 'employer' ? 'text-red-500' : 'text-gray-600'
                  }`}>Employer</p>
                </button>
              </div>

              <div className="flex flex-row items-center gap-4 w-full">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="country-code">Country</Label>
                  <div className='bg-gray-200 p-2 rounded-md border-transparent'>
                    <span className="">+91</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <Label htmlFor="phone-number">Mobile Number</Label>
                  <Input
                    id="phone-number"
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={phoneNumber}
                    onChange={handleMobileNumberChange}
                    className="w-full"
                  />
                </div>
              </div>

              {error && <p className="text-sm text-red-500 text-center">{error}</p>}
              <Button 
                onClick={handleSubmit} 
                className="w-full bg-red-600 text-white hover:bg-red-700" 
                disabled={!isValid}
              >
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}