import React from 'react';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import ManageProjectsTable from '../Components/Admin/ManageProjectsTable';
import PurchaseCostTable from '../Components/Admin/PurchaseCostTable';
import SalesProfitTable from '../Components/Admin/SalesProfitTable';
import './AdminPage.css';

const AdminPage = () => {
  return (
    <div className="admin-page">
      <Header />
      <main className="admin-content">
        <h1 className="admin-title">Admin Panel</h1>
        <ManageProjectsTable />
        <PurchaseCostTable />
        <SalesProfitTable />
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;