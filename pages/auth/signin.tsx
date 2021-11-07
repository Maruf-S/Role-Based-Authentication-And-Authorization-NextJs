import React, { useState,useRef } from "react";
import {signIn} from 'next-auth/client'
import router, {useRouter} from 'next/router'
export default function SignIn() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  async function loginUser(){
      let response =  await signIn("credentials",{redirect:false,email:email.current?.value,password:password.current?.value});
      console.log(response);
      if(!response?.error){
        router.replace("/protected-page")
      }
    }
  return (
    <div>
      <form>
        <h6>Email</h6>
        <input type="text" ref={email} />
        <h6>Password</h6>
        <input type="text" ref={password} />
      </form>
      <button onClick={loginUser}>
            Submit
      </button>
    </div>
  );
}
