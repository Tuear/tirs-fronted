import React, { useEffect, useState } from 'react';
import { Table, Pagination, Button, message } from 'antd';
import { getAllReviews, deleteReview } from '../../api/reviewmanageApi'; // 替换为实际接口文件路径

const EvaluationManagement = () => {
  const [reviews, setReviews] = useState([]); // 存储所有评价数据
  const [loading, setLoading] = useState(false); // 加载状态
  const [currentPage, setCurrentPage] = useState(1); // 当前页码
  const pageSize = 10; // 每页显示条数（与页面“10/page”对应）

  // ========== 数据获取逻辑 ==========
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await getAllReviews();
      // 后端返回格式：{ success: boolean, data: Array, error?: string }
      if (res.success) {
        setReviews(res.data);
        message.success('评价列表获取成功');
      } else {
        message.error(res.error || '获取评价列表失败');
      }
    } catch (error) {
      // 捕获接口抛出的错误（如网络问题、权限问题）
      message.error(error.error || '网络请求失败');
    } finally {
      setLoading(false);
    }
  };

  // 组件挂载时自动加载评价数据
  useEffect(() => {
    fetchReviews();
  }, []);

  // ========== 删除操作逻辑 ==========
  const handleDelete = async (sentenceId) => {
    try {
      await deleteReview(sentenceId);
      message.success('评价删除成功');
      fetchReviews(); // 删除后重新拉取数据，刷新页面
    } catch (error) {
      message.error(error.error || '删除评价失败');
    }
  };

  // ========== 分页逻辑 ==========
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // 计算当前页需展示的数据（前端模拟分页）
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const currentPageData = reviews.slice(startIdx, endIdx);

  // ========== 表格列配置 ==========
  const columns = [
    {
      title: '评价ID',
      dataIndex: 'sentence_id',
      key: 'sentence_id',
      align: 'center',
    },
    {
      title: '导师姓名',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '学校',
      dataIndex: 'university',
      key: 'university',
      align: 'center',
    },
    {
      title: '学院/系',
      dataIndex: 'department',
      key: 'department',
      align: 'center',
    },
    {
      title: '评价内容',
      dataIndex: 'review_sentence',
      key: 'review_sentence',
      align: 'center',
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Button type="danger" onClick={() => handleDelete(record.sentence_id)}>
          删除
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      {/* 评价表格 */}
      <Table
        columns={columns}
        dataSource={currentPageData}
        loading={loading}
        rowKey="sentence_id" // 行唯一标识（必须）
        bordered // 显示表格边框
        pagination={false} // 关闭内置分页，使用外部Pagination
        size="middle" // 表格尺寸
      />

      {/* 分页组件 */}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={reviews.length} // 总数据条数
        onChange={handlePageChange}
        style={{ marginTop: 16, textAlign: 'right' }}
        showQuickJumper // 显示快速跳转输入框
      />
    </div>
  );
};

export default EvaluationManagement;