import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login } from '../api/authApi';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleLogin = async (credentials) => {
    try {
      const response = await login(credentials, isAdminLogin);
      
      // 根据文档接口响应结构调整
      authLogin({
        user_id: response.user_id || response.admin_id,
        role: isAdminLogin ? 'admin' : 'user'
      });
      
      // 跳转到对应主页
      navigate(isAdminLogin ? '/admin' : '/user');
    } catch (err) {
      setError(err.error || '登录失败，请重试');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isAdminLogin ? '管理员登录' : '用户登录'}
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <LoginForm 
          onSubmit={handleLogin} 
          isAdminLogin={isAdminLogin} 
        />
        
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsAdminLogin(!isAdminLogin)}
            className="text-blue-600 hover:underline"
          >
            {isAdminLogin ? '切换到用户登录' : '切换到管理员登录'}
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <span className="text-gray-600">没有账号？</span>
          <a 
            href="/register" 
            className="text-blue-600 hover:underline ml-1"
          >
            立即注册
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;