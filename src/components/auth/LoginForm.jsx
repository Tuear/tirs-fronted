import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginUser, loginAdmin } from '../../api/authApi';
import Alert from '../ui/Alert';

const LoginForm = () => {
  const [formData, setFormData] = useState({ id: '', password: '' });
  const [isAdminLogin, setIsAdminLogin] = useState(false); // 管理员登录切换
  const [rememberMe, setRememberMe] = useState(false);     // 记住我功能
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // 输入框内容变化
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 记住我 checkbox 切换
  const handleRemember = (e) => {
    setRememberMe(e.target.checked);
  };

  // 登录提交逻辑（保留原功能）
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 区分「用户登录」和「管理员登录」
      const response = isAdminLogin 
        ? await loginAdmin({ user_id: formData.id, password: formData.password })
        : await loginUser({ user_id: formData.id, password: formData.password });

      // 更新全局认证状态
      login({
        user_id: isAdminLogin ? response.admin_id : response.user_id,
        role: response.role  // 确保获取正确的角色类型
      });

      // 「记住我」逻辑（示例：存储到 localStorage）
      if (rememberMe) {
        localStorage.setItem('rememberedUser', JSON.stringify(formData.id));
      } else {
        localStorage.removeItem('rememberedUser');
      }

      // 按角色跳转（保留原逻辑）
      navigate(response.role === 'admin' ? '/admin' : '/user');
    } catch (err) {
      setError(err.error || '登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 错误提示（保留原逻辑） */}
      {error && <Alert type="error" message={error} />}

      {/* 用户名输入框 - 带「用户」图标 */}
      <div className="relative">
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          required
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          placeholder="用户名"
        />
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 0 1 8 8v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6a8 8 0 0 1 8-8zm0 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0-6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
          </svg>
        </span>
      </div>

      {/* 密码输入框 - 带「锁」图标 */}
      <div className="relative">
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          placeholder="密码"
        />
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a5 5 0 0 1 5 5v2a2 2 0 0 1-2 2h-1v3a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H5a2 2 0 0 1-2-2V7a5 5 0 0 1 5-5zm0 4a3 3 0 0 0-3 3v2h6V9a3 3 0 0 0-3-3zm-1 8v3h2v-3H9z" />
          </svg>
        </span>
      </div>

      {/* 记住我 + 管理员切换 组合行（替换「忘记密码」） */}
      <div className="flex items-center justify-between text-sm">
        {/* 记住我 checkbox */}
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
            checked={rememberMe}
            onChange={handleRemember}
          />
          记住我
        </label>

        {/* 管理员登录切换按钮 */}
        <button
          type="button"
          onClick={() => setIsAdminLogin(!isAdminLogin)}
          className="text-blue-600 hover:text-blue-700 transition-colors"
        >
          {isAdminLogin ? '切换为用户登录' : '管理员登录'}
        </button>
      </div>

      {/* 登录按钮（参考图蓝色风格） */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
      >
        {loading ? '登录中...' : '登录'}
      </button>
    </form>
  );
};

export default LoginForm;