
import { Link } from 'react-router-dom';
import SignupForm from '@/components/Auth/SignupForm';

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl font-bold text-primary">Clean CRM</h1>
          </Link>
          <h2 className="mt-2 text-2xl font-semibold text-gray-800">Criar uma conta</h2>
          <p className="mt-1 text-gray-500">Comece a gerenciar seus leads hoje mesmo</p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default Signup;
