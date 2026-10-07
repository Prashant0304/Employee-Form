import { type Employee } from "../types/employee";

interface EmployeeRowProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

export const EmployeeRow = ({
  employee,
  onEdit,
  onDelete,
}: EmployeeRowProps) => {
  return (
    <tr>
      <td>
        <div className="user-info">
          {employee.profilePhoto ? (
            <img
              src={employee.profilePhoto}
              alt={employee.fullName}
              className="avatar"
            />
          ) : (
            <div className="avatar-placeholder">
              {employee.fullName.charAt(0)}
            </div>
          )}
          <span>{employee.fullName}</span>
        </div>
      </td>
      <td>{employee.email}</td>
      <td>{employee.mobile}</td>
      <td>{employee.department}</td>
      <td>{employee.experience} yrs</td>
      <td>${Number(employee.salary).toLocaleString()}</td>
      <td>{employee.joiningDate}</td>
      <td>
        <button
          type="button"
          className="edit-btn"
          onClick={() => onEdit(employee)}
        >
          Edit
        </button>
        <button
          type="button"
          className="delete-btn"
          onClick={() => onDelete(employee.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
