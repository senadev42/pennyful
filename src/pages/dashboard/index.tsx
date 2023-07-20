import React from "react";
import {
  Card,
  Grid,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
} from "@tremor/react";

export const DashboardPage: React.FC = () => {
  return (
    <main className="flex-1 bg-white px-4 py-2">
      <h1 className="text-lg font-bold mb-4">Dashboard</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="bg-gray-100 rounded-lg p-4">
          <h2 className="text-lg font-bold mb-2">Total Expenses</h2>
          <p className="text-3xl font-bold">$2,500</p>
        </div>
        <div className="bg-gray-100 rounded-lg p-4">
          <h2 className="text-lg font-bold mb-2">Expenses This Month</h2>
          <p className="text-3xl font-bold">$1,500</p>
        </div>
        <div className="bg-gray-100 rounded-lg p-4">
          <h2 className="text-lg font-bold mb-2">Expenses This Week</h2>
          <p className="text-3xl font-bold">$500</p>
        </div>
        <div className="bg-gray-100 rounded-lg p-4">
          <h2 className="text-lg font-bold mb-2">Expenses Today</h2>
          <p className="text-3xl font-bold">$100</p>
        </div>
      </div>
    </main>
  );
};
