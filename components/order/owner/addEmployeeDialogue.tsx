'use client';

import { city } from '@/types/cities';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import * as z from 'zod';
import ConfirmModal from '../confirmModal';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import done from "@/public/images/done.svg"


import { AddUserFetch, userProfile, userToken } from "@/actions/auth";
import { addUserSchema } from "@/lib/auth-schema";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { AiOutlineCopy } from "react-icons/ai";
import { toast } from 'sonner';

const BaseUrl = process.env.NEXT_PUBLIC_API_URL

type props = {
  cities: city[];
  showNewEmployeeModal: boolean;
  setShowNewEmployeeModal: React.Dispatch<React.SetStateAction<boolean>>;
  showConfirmationModal: boolean;
  setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddEmployeeDialogue({
  cities,
  showNewEmployeeModal,
  setShowNewEmployeeModal,
  showConfirmationModal,
  setShowConfirmationModal,
}: props) {
  const form = useForm<z.infer<typeof addUserSchema>>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      fName: "",
      lName: "",
      email: "",
      phoneNumber: "",
    },
  })

  const { handleSubmit, reset } = form;

  async function onSubmit(values: z.infer<typeof addUserSchema>) {
    const { fName, lName, email, phoneNumber } = values;

    // temporary

    setShowNewEmployeeModal(false);
    reset();
    setShowConfirmationModal(true);

    const addDetails = {
      name: `${fName} ${lName}`,
      email,
      phoneNumber
    }

    const userData = await userProfile();
    const token = await userToken();

    if (userData && token) {
      const response = await AddUserFetch(userData.id, addDetails)
      if (response.message) {
        toast.error(response.message)
      }

      console.log("the message", response.message)

      if (response.message == "employee successfully created") {
        setShowNewEmployeeModal(false);
        reset();
        setShowConfirmationModal(true);
      }
    }
  }

  const handleClose = () => {
    setShowNewEmployeeModal(false);
    reset();
  };

  return (
    <>
      {showNewEmployeeModal && (
        <div className="fixed inset-0 bg-[#060A87] bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full h-fit max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#060A87]">Add An Employee</h2>
              <button onClick={() => handleClose()} title="Close">
                <X className="h-6 w-6" />
              </button>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex gap-2 md:gap-6">
                  <FormField
                    control={form.control}
                    name="fName"
                    render={({ field }) => (
                      <FormItem className="space-y-0 flex-1 md:space-y-2">
                        <FormLabel className="font-medium text-base text-[#060A87] md:text-lg">First Name <span className="text-[#E03137]">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Input your First Name" className="text-sm md:h-12 md:text-base placeholder-[#A0AEC0]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lName"
                    render={({ field }) => (
                      <FormItem className="space-y-0 flex-1 md:space-y-2">
                        <FormLabel className="font-medium text-base text-[#060A87] md:text-lg" >Last Name <span className="text-[#E03137]">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Input your Last Name" className="text-sm md:h-12 md:text-base placeholder-[#A0AEC0]"  {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-base text-[#060A87] md:text-lg">Email <span className="text-[#E03137]">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="john@mail.com" {...field} className="text-sm md:h-12 md:text-base placeholder-[#A0AEC0]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-base text-[#060A87] md:text-lg">Phone Number <span className="text-[#E03137]">*</span></FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Enter your phoneNumber" {...field} className="text-sm md:h-12 md:text-base placeholder-[#A0AEC0]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-4 mt-2">
                  <div></div>

                  <button
                    type="button"
                    onClick={() => handleClose()}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Continue
                  </button>
                </div>
              </form>
            </Form>
          </div>
        </div>

      )}

      { }

      {showConfirmationModal &&
        <div className="fixed inset-0 bg-[#060A87] bg-opacity-30 flex items-center justify-center z-50">
          <Card className='py-10 px-32 gap-12'>
            <CardHeader>
              <CardTitle className='text-[#060A87] font-bold text-2xl mx-auto'>Employee Added Successfully</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-12 pt-12 '>
              <div className='flex justify-center'>
                <Image src={done} alt="done" />
              </div>
              <div className='border-[#7B7B7B63] border-[1px] p-3 pl-6 rounded-[2px] flex gap-20'>
                <div>
                  <div className='text-[#060A87] font-bold text-lg'>
                    Email: <span className='text-[#4A4A4F]'>JhonnyDoe@gmail.con</span>
                  </div>
                  <div className='text-[#060A87] font-bold text-lg'>
                    Password: <span className='text-[#4A4A4F]'>hfsudhfjshjiodyr324</span>
                  </div>
                </div>
                <AiOutlineCopy className='cursor-pointer' stroke='#060A87' fill='#060A87' size={26} />
              </div>
              <div className='text-[#3E4249] mt-[-45px] font-normal text-xs'>copy this and share to your employee to log in</div>
            </CardContent>
            <CardFooter className='mt-6'>
              <Button onClick={() => setShowConfirmationModal(false)} className='flex justify-center items-center px-8 py-7 font-bold text-base bg-[#060A87] mx-auto hover:bg-[#060A87] hover:opacity-85'>Back to Employees Table</Button>
            </CardFooter>
          </Card>
        </div>

      }

      {/* {showRecipet && (
        <ConfirmModal
          currentOrder={{ ...recieptOrder, id: uuidv4() }}
          setShowRecipt={setShowRecipt}
        />
      )} */}

    </>
  );
}
