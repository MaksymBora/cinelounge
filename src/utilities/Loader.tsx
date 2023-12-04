import { PulseLoader } from 'react-spinners';

const override = {
  display: 'flex',
  margin: '5rem auto 100vh',
  justifyContent: 'center',
};

const Loader = () => {
  return <PulseLoader cssOverride={override} color="#17b28e" size={9} />;
};

export default Loader;
