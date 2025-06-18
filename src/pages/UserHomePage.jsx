// src/pages/UserHomePage.js
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import RecommendationForm from '../components/user/RecommendationForm'; // 导入新组件

const UserHomePage = () => {
  // 存储推荐结果
  const [recommendations, setRecommendations] = useState([]);
  
  // 处理推荐结果
  const handleRecommendations = (results) => {
    setRecommendations(results);
  };
  
  return (
    <Layout>
      {/* 背景图容器 */}
      <div 
        className="min-h-screen bg-cover bg-center" 
        style={{ backgroundImage: "url('/images/userhome.jpg')" }}
      >
        {/* 垂直+水平居中容器 */}
        <div className="flex justify-center items-center min-h-screen px-4 py-8">
          <div className="w-full max-w-4xl">
            {/* 使用RecommendationForm组件 */}
            <RecommendationForm onSubmit={handleRecommendations} />
            
            {/* 推荐结果展示区域 */}
            {recommendations.length > 0 && (
              <div className="mt-6 bg-white shadow-md rounded-lg p-5 animate-fadeIn">
                <h2 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">
                  推荐导师 ({recommendations.length}位)
                </h2>
                
                <div className="space-y-4">
                  {recommendations.map((professor, index) => (
                    <div 
                      key={index} 
                      className="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {/* 导师头像 */}
                      <div className="flex-shrink-0 mr-4">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                      </div>
                      
                      {/* 导师信息 */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {professor.name || '教授姓名'}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {professor.university || '未知大学'} · {professor.department || '未知院系'}
                        </p>
                        
                        <div className="mt-2 flex flex-wrap gap-1">
                          {professor.researchFields?.slice(0, 3).map((field, i) => (
                            <span 
                              key={i} 
                              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {field}
                            </span>
                          ))}
                        </div>
                        
                        <p className="mt-2 text-xs text-gray-600 line-clamp-2">
                          {professor.bio || '暂无导师介绍'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserHomePage;