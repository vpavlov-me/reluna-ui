import type { Meta, StoryObj } from '@storybook/react';
import { Table, DataTable } from '../src/components/ui/table';
import { useState } from 'react';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
];

const columns = [
  { key: 'name', title: 'Name' },
  { key: 'email', title: 'Email' },
  { key: 'role', title: 'Role' },
];

export const BasicTable: Story = {
  render: () => (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {basicData.map((row) => (
          <tr key={row.id}>
            <td>{row.name}</td>
            <td>{row.email}</td>
            <td>{row.role}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  ),
};

export const DataTableBasic: Story = {
  render: () => (
    <DataTable
      data={basicData}
      columns={columns}
    />
  ),
};

export const DataTableWithSorting: Story = {
  render: () => (
    <DataTable
      data={basicData}
      columns={columns}
    />
  ),
};

export const DataTableWithPagination: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const largeData = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ['Admin', 'User', 'Editor'][i % 3],
    }));

    return (
      <DataTable
        data={largeData}
        columns={columns}
        pagination={{ 
          current: currentPage,
          pageSize: pageSize,
          total: largeData.length,
          onChange: (page) => setCurrentPage(page)
        }}
      />
    );
  },
};

export const DataTableWithSearch: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const searchableData = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ['Admin', 'User', 'Editor'][i % 3],
      department: ['Engineering', 'Marketing', 'Sales'][i % 3],
    }));

    const searchableColumns = [
      { key: 'name', title: 'Name' },
      { key: 'email', title: 'Email' },
      { key: 'role', title: 'Role' },
      { key: 'department', title: 'Department' },
    ];

    return (
      <DataTable
        data={searchableData}
        columns={searchableColumns}
        pagination={{ 
          current: currentPage,
          pageSize: pageSize,
          total: searchableData.length,
          onChange: (page) => setCurrentPage(page)
        }}
      />
    );
  },
};

export const ComplexTable: Story = {
  render: () => (
    <Table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
              <span>Product A</span>
            </div>
          </td>
          <td>$99.99</td>
          <td>25</td>
          <td>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
              In Stock
            </span>
          </td>
          <td>
            <div className="flex gap-1">
              <button className="px-2 py-1 text-blue-600 hover:bg-blue-50 rounded text-sm">
                Edit
              </button>
              <button className="px-2 py-1 text-red-600 hover:bg-red-50 rounded text-sm">
                Delete
              </button>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
              <span>Product B</span>
            </div>
          </td>
          <td>$149.99</td>
          <td>0</td>
          <td>
            <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">
              Out of Stock
            </span>
          </td>
          <td>
            <div className="flex gap-1">
              <button className="px-2 py-1 text-blue-600 hover:bg-blue-50 rounded text-sm">
                Edit
              </button>
              <button className="px-2 py-1 text-red-600 hover:bg-red-50 rounded text-sm">
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </Table>
  ),
}; 