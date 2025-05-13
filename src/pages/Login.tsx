
import { Link } from 'react-router-dom';
import LoginForm from '@/components/Auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <img 
              src="/lovable-uploads/2b08e099-de56-4441-81b8-8aef38388b0e.png" 
              alt="LeadUP Logo" 
              className="h-16 w-auto mx-auto mb-4"
            />
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
