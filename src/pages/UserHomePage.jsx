import React from 'react';
import Layout from '../components/layout/Layout'; // 复用导航栏+页脚布局

const UserHomePage = () => {
  return (
    <Layout>
      {/* 背景图容器：全屏覆盖+居中卡片 */}
      <div 
        className="min-h-screen bg-cover bg-center" 
        style={{ backgroundImage: "url('/images/login-bg.jpg')" }} 
        // 👆 替换为你实际的背景图文件名（需放在 public/images 目录）
      >
        {/* 垂直+水平居中容器（解决“太靠上”问题） */}
        <div className="flex justify-center items-center min-h-screen px-4">
          {/* 核心卡片：加大尺寸+柔和阴影+参考图风格 */}
          <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-5 space-y-4">
            {/* 标题+引导文案（居中对齐） */}
            <div className="text-center">
              <h1 className="text-lg font-semibold text-gray-800">智能导师推荐</h1>
              <p className="mt-2 text-xs text-gray-500">
                请描述您期望的导师类型，并选择学校/学院范围<br />
                系统将为您智能匹配理想导师
              </p>
            </div>

            {/* 自然语言输入框（加宽+加高+参考图风格） */}
            <div>
              <label 
                htmlFor="prompt" 
                className="block text-xs font-medium text-gray-700 mb-1"
              >
                描述导师需求
              </label>
              <input
                type="text"
                id="prompt"
                placeholder="例如：研究人工智能的年轻导师，有海外经历"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-xs"
              />
            </div>

            {/* 学校+学院 下拉选择区（参考图布局） */}
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
              {/* 学校选择器 */}
              <div className="w-full sm:w-1/2">
                <label 
                  htmlFor="school" 
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  选择目标学校
                </label>
                <select
                  id="school"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                    focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-xs"
                >
                  <option value="">请选择学校</option>
                  <option value="university-1">XX大学</option>
                  <option value="university-2">YY大学</option>
                  <option value="university-3">ZZ大学</option>
                </select>
              </div>

              {/* 学院选择器 */}
              <div className="w-full sm:w-1/2">
                <label 
                  htmlFor="college" 
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  选择目标学院
                </label>
                <select
                  id="college"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                    focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-xs"
                >
                  <option value="">请选择学院</option>
                  <option value="college-cs">计算机学院</option>
                  <option value="college-ee">电子工程学院</option>
                  <option value="college-math">数学学院</option>
                </select>
              </div>
            </div>

            {/* 预留「开始推荐」按钮位置（后续功能开发时添加） */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserHomePage;