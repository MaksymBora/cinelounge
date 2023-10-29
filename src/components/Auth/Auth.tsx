export const Auth = () => {
  const isLoginForm = true;

  const handleSubmitForm = e => {
    e.preventDefault();
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
          Email Address
        </label>
        <input
          id="email"
          className="h-full p-3 my-2 mx-0 w-[300px] mb-8 bg-gray-600 outline-authBtn rounded"
          type="text"
          placeholder="Email"
          value="ddd@gmail.com"
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
          value={232}
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
