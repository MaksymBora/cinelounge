import { useContext, useState } from 'react';

import { login, register } from '@/service/serviceAuth';
import { AppContext } from '@/context/app-context';

export const Auth = ({ setSignedIn }) => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [authMessage, setAuthMessage] = useState('');
  const [registered, setRegistered] = useState(false);
  const { setUserName } = useContext(AppContext);
  const { setIsLoggedIn } = useContext(AppContext);
  const { setSubscription } = useContext(AppContext);
  const { setAvatar } = useContext(AppContext);

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
      const fetchLogin = async () => {
        try {
          const res = await login(formData);
          const codeStatusResponse = 400;

          if (res && res.status && res.status >= codeStatusResponse) {
            setAuthMessage(res.data.message);
            return;
          }

          setIsLoggedIn(true);
          setSignedIn(true); // for Toast notifications
          setUserName(res?.data.user.name);
          setSubscription(res?.data.user.subscription);
          setAvatar(res?.data.user.avatar);
        } catch (error) {
          console.log(error, 'Error');
        }
      };

      fetchLogin();
    } else {
      const fetchRegistration = async () => {
        try {
          const res = await register(formData);

          if (res === undefined) {
            console.log('User with current email already exists');
            return;
          }

          setAuthMessage(res.data.message);
          setRegistered(true);
        } catch (error) {
          console.log(error);
        }
      };

      fetchRegistration();
    }

    form.reset();
  };

  return (
    <div className="max-w-xxl my-0 mx-auto h-auth flex flex-col justify-center items-center">
      <h1 className="mb-8 text-4xl font-semibold text-black dark:text-mainTextColo">
        {isLoginForm ? 'Login' : 'Register'}
      </h1>
      <form
        onSubmit={handleSubmitForm}
        className="flex flex-col justify-center"
      >
        {!isLoginForm && (
          <>
            <label
              htmlFor="name"
              className="text-sm text-black dark:text-mainTextColo"
            >
              Name
            </label>
            <input
              id="name"
              className="h-full p-3 my-2 mx-0 w-[300px] mb-8 text-black dark:text-mainTextColo bg-white  dark:bg-gray-600 border outline-authBtn rounded"
              type="name"
              placeholder="Name"
              name="name"
              autoComplete="off"
            />
          </>
        )}
        <label
          htmlFor="email"
          className="text-sm text-black dark:text-mainTextColo"
        >
          Email Address
        </label>
        <input
          id="email"
          className="h-full p-3 my-2 mx-0 w-[300px] mb-8 text-black dark:text-mainTextColo bg-white  dark:bg-gray-600 border outline-authBtn rounded"
          type="text"
          placeholder="Email"
          name="email"
          autoComplete="off"
        />
        <label
          htmlFor="password"
          className="text-sm text-black dark:text-mainTextColo"
        >
          Password
        </label>
        <input
          id="password"
          className="h-full p-3 my-2 mx-0 w-[300px] mb-8 text-black dark:text-mainTextColo bg-white  dark:bg-gray-600 border outline-authBtn rounded"
          type="password"
          placeholder="Password"
          name="password"
          autoComplete="off"
        />
        <button
          className="mt-12 py-[15px] px-0 text-base cursor-pointer bg-authBtn shadow-btnAuth font-bold 
		  uppercase tracking-[0.5px] active:transform scale-97 rounded text-black dark:text-mainTextColo"
          type="submit"
        >
          {isLoginForm ? 'Login' : 'Register'}
        </button>
      </form>

      <a
        href="#0"
        className="text-[13px] mt-6 text-black dark:text-mainTextColo hover:underline"
        onClick={() => {
          setIsLoginForm(prevState => !prevState);
        }}
      >
        {isLoginForm ? 'Create an account' : 'Login'}
      </a>
      {registered && !isLoginForm && (
        <p className="mt-4 text-sm text-green-400">{authMessage}</p>
      )}
      {!registered && isLoginForm && (
        <p className="mt-4 text-sm text-red-500">{authMessage}</p>
      )}
    </div>
  );
};
