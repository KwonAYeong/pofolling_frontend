import React from 'react';
import RegisterForm from '../../components/Register/RegisterForms';

export default function SignupMentor() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-semibold mb-8">멘토 회원가입</h1>
      <RegisterForm role="MENTOR"/>
    </div>
  );
}
