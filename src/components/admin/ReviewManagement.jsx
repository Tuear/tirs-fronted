import React, { useState, useEffect } from 'react';
import { Table, Spin, Alert } from 'antd'; // 若使用 Ant Design，需提前安装
import { getAllReviews } from '../../api/getallreviewApi'; // 替换为实际接口文件路径

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]); // 存储评价列表
  const [loading, setLoading] = useState(true); // 加载状态
  const [error, setError] = useState(''); // 错误信息

  // 组件挂载时自动获取评价数据
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getAllReviews(); 
        // 接口返回格式：{ data: 评价数组, message: "提示" }
        setReviews(res.data || []); 
        setLoading(false);
      } catch (err) {
        // 捕获接口抛出的错误（格式：{ error: "错误信息" }）
        setError(err.error || '获取评价失败，请重试');
        setLoading(false);
      }
    };
    fetchReviews();
  }, []); // 仅在组件挂载时执行一次

  // 定义表格列（与接口返回字段一一对应）
  const columns = [
    {
      title: '评价ID',
      dataIndex: '评价ID', // 对应接口返回的字段名
      key: '评价ID',
    },
    {
      title: '导师姓名',
      dataIndex: '导师姓名',
      key: '导师姓名',
    },
    {
      title: '学校',
      dataIndex: '学校',
      key: '学校',
    },
    {
      title: '学院/系',
      dataIndex: '学院/系',
      key: '学院/系',
    },
    {
      title: '评价内容',
      dataIndex: '评价内容',
      key: '评价内容',
    },
  ];

  // 根据状态渲染不同 UI
  return (
    <div style={{ padding: 20 }}>
      {loading ? (
        // 加载中状态
        <Spin tip="加载评价数据中...">
          <div style={{ height: 200 }} /> {/* 占位防止页面跳动 */}
        </Spin>
      ) : error ? (
        // 错误状态
        <Alert message="获取失败" description={error} type="error" showIcon />
      ) : reviews.length === 0 ? (
        // 无数据状态
        <Alert message="提示" description="当前暂无评价数据" type="info" showIcon />
      ) : (
        // 数据展示：Ant Design Table 组件
        <Table
          columns={columns}
          dataSource={reviews}
          rowKey="评价ID" // 用「评价ID」作为行唯一标识
          bordered // 带边框表格
          pagination={{ pageSize: 10 }} // 分页配置（每页10条）
        />
      )}
    </div>
  );
};

export default ReviewManagement;