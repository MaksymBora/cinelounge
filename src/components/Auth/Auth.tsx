import { useState } from 'react';
import { login, register } from '@/service/serviceAuth';

// const token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTEyYjFmOWZkN2M0NzAwMTRmY2ViNDEiLCJpYXQiOjE3MDAzMzc2NTR9.K9umLwkn3vLaDsVyizdqAWPKhSo1p-qMEtR--_MmE0o';

export const Auth = () => {
  const [isLoginForm, setIsLoginForm] = useState(false);

  const handleSubmitForm = e => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = {
      ...(form.elements.name &&
        form.elements.name.value && { name: form.elements.name.value }),
      email: form.elements.email.value,
      password: form.elements.password.value,
    };

    if (isLoginForm) {
      login(formData);
    } else {
      register(formData);
    }

    form.reset();
  };

  return (
    <div className="max-w-xxl my-0 mx-auto h-auth flex flex-col justify-center items-center">
      <h1 className="mb-8 text-4xl font-semibold">
        {isLoginForm ? 'Login' : 'Register'}
      </h1>
      <form
        onSubmit={handleSubmitForm}
        className="flex flex-col justify-center"
      >
        {!isLoginForm && (
          <>
            <label htmlFor="name" className="text-sm">
              Name
            </label>
            <input
              id="name"
              className="h-full p-3 my-2 mx-0 w-[300px] mb-8 bg-gray-600 outline-authBtn rounded"
              type="name"
              placeholder="Name"
              name="name"
              autoComplete="off"
              //   onChange={e => setEmail(e.target.value)}
            />
          </>
        )}
        <label htmlFor="email" className="text-sm">
          Email Address
        </label>
        <input
          id="email"
          className="h-full p-3 my-2 mx-0 w-[300px] mb-8 bg-gray-600 outline-authBtn rounded"
          type="text"
          placeholder="Email"
          name="email"
          autoComplete="off"
          //   onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="password" className="text-sm">
          Password
        </label>
        <input
          id="password"
          className="h-full p-3 my-2 mx-0 w-[300px] mb-8 bg-gray-600 outline-authBtn rounded"
          type="password"
          placeholder="Password"
          name="password"
          autoComplete="off"
        />
        <button
          className="mt-12 py-[15px] px-0 text-base cursor-pointer bg-authBtn shadow-btnAuth font-bold 
		  uppercase tracking-[0.5px] active:transform scale-97 rounded"
          type="submit"
        >
          {isLoginForm ? 'Login' : 'Register'}
        </button>
      </form>

      {/* Test request for getCurrent User */}
      {/* <form
        onSubmit={e => {
          e.preventDefault();
          getCurrentUser(token);
        }}
      >
        <button
          className="mt-12 py-[15px] px-0 text-base cursor-pointer bg-authBtn shadow-btnAuth font-bold 
  		  uppercase tracking-[0.5px] active:transform scale-97 rounded"
          type="submit"
        >
          Current
        </button>
      </form> */}
      <a
        href="#0"
        className="text-[13px] mt-6 text-mainTextColo hover:underline"
        onClick={() => {
          console.log(isLoginForm);
          setIsLoginForm(prevState => !prevState);
        }}
      >
        {isLoginForm ? 'Create an account' : 'Login'}
      </a>
    </div>
  );
};