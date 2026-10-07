import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { type Employee } from "./types/employee";
import { EmployeeForm } from "./components/EmployeeForm";
import { EmployeeTable } from "./components/EmployeeTable";
import "./App.css";

const STORAGE_KEY = "employee_records";

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  }, [employees]);

  const handleSaveEmployee = (employeeData: Employee) => {
    const isEditing = employees.some((emp) => emp.id === employeeData.id);

    const isDuplicateEmail = employees.some(
      (emp) =>
        emp.email.toLowerCase() === employeeData.email.toLowerCase() &&
        emp.id !== employeeData.id,
    );

    if (isDuplicateEmail) {
      toast.error(
        `An employee with email "${employeeData.email}" already exists!`,
      );
      return;
    }

    const isDuplicateMobile = employees.some(
      (emp) => emp.mobile === employeeData.mobile && emp.id !== employeeData.id,
    );

    if (isDuplicateMobile) {
      toast.error(
        `An employee with mobile number "${employeeData.mobile}" already exists!`,
      );
      return;
    }

    setEmployees((prev) => {
      if (isEditing) {
        return prev.map((emp) =>
          emp.id === employeeData.id ? employeeData : emp,
        );
      }
      return [...prev, employeeData];
    });

    if (isEditing) {
      toast.success(
        `Employee "${employeeData.fullName}" updated successfully!`,
      );
    } else {
      toast.success(
        `Employee "${employeeData.fullName}" registered successfully!`,
      );
    }

    setEditingEmployee(null);
  };

  const handleDelete = (id: string) => {
    const empToDelete = employees.find((emp) => emp.id === id);
    if (
      window.confirm(
        `Are you sure you want to delete ${empToDelete?.fullName || "this record"}?`,
      )
    ) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      toast.error("Employee deleted successfully!");
      if (editingEmployee?.id === id) {
        setEditingEmployee(null);
      }
    }
  };

  // Dashboard Stats Calculations
  const totalEmployees = employees.length;
  const totalDepartments = new Set(employees.map((e) => e.department)).size;
  const totalPayroll = employees.reduce(
    (sum, e) => sum + (Number(e.salary) || 0),
    0,
  );

  return (
    <div className="app-container">
      {/* Navbar Header */}
      <header className="app-header">
        <div className="header-title-group">
          <h1>Employee Management System</h1>
          <p>Manage employee records, departments, and payroll allocation.</p>
        </div>
        <span className="header-badge">Live Enterprise Workspace</span>
      </header>

      {/* KPI Stats Bar */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="label">Total Workforce</div>
          <div className="value">{totalEmployees}</div>
        </div>
        <div className="stat-card">
          <div className="label">Active Departments</div>
          <div className="value">{totalDepartments}</div>
        </div>
        <div className="stat-card">
          <div className="label">Monthly Payroll</div>
          <div className="value">${totalPayroll.toLocaleString()}</div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />

      <EmployeeForm
        onSubmit={handleSaveEmployee}
        editingEmployee={editingEmployee}
        onCancelEdit={() => setEditingEmployee(null)}
      />

      <EmployeeTable
        employees={employees}
        onEdit={(emp) => setEditingEmployee(emp)}
        onDelete={handleDelete}
      />
    </div>
  );
}
