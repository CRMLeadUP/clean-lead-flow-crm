
import { Link } from 'react-router-dom';
import ResetPasswordForm from '@/components/Auth/ResetPasswordForm';

const ResetPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl font-bold text-primary">Clean CRM</h1>
          </Link>
          <h2 className="mt-2 text-2xl font-semibold text-gray-800">Recupere sua senha</h2>
          <p className="mt-1 text-gray-500">
            Enviaremos um link para você redefinir sua senha
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
