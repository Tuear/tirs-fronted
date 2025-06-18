import axios from 'axios';
import config from '../Config'; // 导入配置文件

// 使用配置中的后端地址
const BASE_URL = config.API_BASE_URL;
/**
 * 获取导师推荐结果
 * @param {Object} params 查询参数 {
 *   query: string,       // 自然语言查询
 *   university: string,  // 大学名称
 *   department: string   // 院系名称
 * }
 * @returns Promise 返回推荐结果数组
 */
export const getRecommendations = async (params) => {
  try {
    // 发送POST请求到推荐接口
    const response = await axios.post(`${BASE_URL}/user/get_recommendations`, {
      query: params.query,
      university: params.university,
      department: params.department
    });
    
    // 返回推荐结果列表
    return response.data.recommend_result || [];
  } catch (error) {
    // 异常处理：优先使用后端返回的错误信息
    const errorMessage = error.response?.data?.error || 
                        '获取推荐失败，请稍后重试';
    
    throw { error: errorMessage };
  }
};