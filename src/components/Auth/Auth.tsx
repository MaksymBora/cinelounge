import { register } from '@/service/serviceAuth';

// const token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNlYmVjZjZhMGRlNjAwMTRmODM4ZGQiLCJpYXQiOjE2OTg2MTA4OTV9.nyUCq3xDhBjp9ZkzXOfcQZTm_YmJZ2SkUGk-XQYnTo8';

export const Auth = () => {
  const isLoginForm = true;

  const dataUser = {
    name: 'maks',
    email: 'maxborassd7@ukr.net',
    password: '12345678',
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    const form = e.currentTarget;
    console.log(form.elements.name.value);
    console.log(form.elements.email.value);
    console.log(form.elements.password.value);
    form.reset();
    register(dataUser);
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
        <label htmlFor="email" className="text-sm">
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
      <a
        href="#0"
        className="text-[13px] mt-6 text-mainTextColo hover:underline"
      >
        {isLoginForm ? 'Create an account' : 'Login'}
      </a>
    </div>
  );
};
