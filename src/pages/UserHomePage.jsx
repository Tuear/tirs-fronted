import React from 'react';
import Layout from '../components/layout/Layout';
import DashboardCard from '../components/dashboard/DashboardCard';

const UserHomePage = () => {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">用户仪表盘</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard 
            title="导师推荐"
            description="根据您的需求推荐导师"
            placeholder="后续换成实际后端接口"
          />
          
          <DashboardCard 
            title="导师详情"
            description="查看导师详细信息"
            placeholder="后续换成实际后端接口"
          />
          
          <DashboardCard 
            title="我的评价"
            description="查看和管理我的评价"
            placeholder="后续换成实际后端接口"
          />
        </div>
      </div>
    </Layout>
  );
};

export default UserHomePage;