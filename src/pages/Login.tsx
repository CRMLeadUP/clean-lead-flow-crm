
import { Link } from 'react-router-dom';
import LoginForm from '@/components/Auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl font-bold text-primary">LeadUP</h1>
          </Link>
          <h2 className="mt-2 text-2xl font-semibold text-gray-800">Bem-vindo(a) de volta</h2>
          <p className="mt-1 text-gray-500">Entre em sua conta para continuar</p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
