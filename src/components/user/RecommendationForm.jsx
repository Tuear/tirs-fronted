// src/components/RecommendationForm.js
import React, { useState, useEffect } from 'react';
import { getRecommendations } from '../../api/getcommendApi'; // 导入API函数

const RecommendationForm = ({ onSubmit }) => {
  // 表单状态
  const [formData, setFormData] = useState({
    query: '',
    university: '',
    department: ''
  });
  
  // 学校/院系选项（实际项目中应从后端获取）
  const [universities, setUniversities] = useState([]);
  const [departments, setDepartments] = useState([]);
  
  // 加载状态
  const [isLoading, setIsLoading] = useState(false);
  
  // 加载学校选项（模拟API请求）
  useEffect(() => {
    // 模拟从后端获取学校列表
    const fetchUniversities = async () => {
      setTimeout(() => {
        setUniversities([
          { id: 'qb', name: '全部' },
          { id: 'tsinghua', name: '清华大学' },
          { id: 'pku', name: '北京大学' },
          { id: 'zju', name: '浙江大学' },
          { id: 'fudan', name: '复旦大学' },
          { id: 'sjtu', name: '上海交通大学' }
        ]);
      }, 300);
    };
    
    fetchUniversities();
  }, []);
  
  // 当学校变化时加载院系列表
  useEffect(() => {
    if (formData.university) {
      // 模拟根据学校获取院系列表
      const fetchDepartments = async () => {
        setIsLoading(true);
        setTimeout(() => {
          // 根据选择的学校返回不同的院系
          const deptsMap = {
            tsinghua: [
              { id: 'cs', name: '计算机科学与技术系' },
              { id: 'ee', name: '电子工程系' },
              { id: 'auto', name: '自动化系' },
            ],
            pku: [
              { id: 'cs_pku', name: '信息科学技术学院' },
              { id: 'math', name: '数学科学学院' },
              { id: 'physics', name: '物理学院' },
            ],
            zju: [
              { id: 'cs_zju', name: '计算机科学与技术学院' },
              { id: 'med', name: '医学院' },
              { id: 'materials', name: '材料科学与工程学院' },
            ],
            default: [
              { id: 'cs', name: '计算机学院' },
              { id: 'ee', name: '电子工程学院' },
              { id: 'math', name: '数学学院' },
            ],
            qb: [
              { id: 'qb', name: '全部' },
            ],
          };
          
          setDepartments(deptsMap[formData.university] || deptsMap.default);
          setIsLoading(false);
        }, 500);
      };
      
      fetchDepartments();
    } else {
      setDepartments([]);
    }
  }, [formData.university]);
  
  // 处理输入变化
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // 处理表单提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 验证输入
    if (!formData.query) {
      alert('请描述您的导师需求');
      return;
    }
    
    if (!formData.university) {
      alert('请选择学校');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // 获取选中的学校名称
      const selectedUniversity = universities.find(u => u.id === formData.university)?.name || formData.university;
      
      // 调用API获取推荐
      const recommendations = await getRecommendations({
        query: formData.query,
        university: selectedUniversity,
        department: formData.department
      });
      
      // 将结果传递给父组件
      onSubmit(recommendations);
    } catch (error) {
      console.error('推荐失败:', error);
      alert(error.error || '获取推荐失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-5 space-y-4">
      {/* 标题+引导文案 */}
      <div className="text-center">
        <h1 className="text-lg font-semibold text-gray-800">智能导师推荐</h1>
        <p className="mt-2 text-xs text-gray-500">
          请描述您期望的导师类型，并选择学校/学院范围<br />
          系统将为您智能匹配理想导师
        </p>
      </div>
      
      {/* 表单 */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 自然语言输入框 */}
        <div>
          <label 
            htmlFor="query" 
            className="block text-xs font-medium text-gray-700 mb-1"
          >
            描述导师需求
          </label>
          <input
            type="text"
            id="query"
            name="query"
            value={formData.query}
            onChange={handleInputChange}
            placeholder="例如：研究人工智能的年轻导师，有海外经历"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
              focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-xs"
            disabled={isLoading}
          />
        </div>
        
        {/* 学校+学院 下拉选择区 */}
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
          {/* 学校选择器 */}
          <div className="w-full sm:w-1/2">
            <label 
              htmlFor="university" 
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              选择目标学校
            </label>
            <select
              id="university"
              name="university"
              value={formData.university}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-xs"
              disabled={isLoading || universities.length === 0}
            >
              <option value="">请选择学校</option>
              {universities.map(university => (
                <option key={university.id} value={university.id}>
                  {university.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* 学院选择器 */}
          <div className="w-full sm:w-1/2">
            <label 
              htmlFor="department" 
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              选择目标学院
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-xs"
              disabled={isLoading || !formData.university || departments.length === 0}
            >
              <option value="">请选择学院</option>
              {departments.map(department => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* 开始推荐按钮 */}
        <div className="pt-2">
          <button
            type="submit"
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md 
              transition duration-300 ease-in-out text-xs font-medium
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                推荐中...
              </span>
            ) : '开始推荐'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecommendationForm;