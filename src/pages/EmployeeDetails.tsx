import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './EmployeeDetails.module.css';

interface Employee {
  id: string;
  name: string;
  departmentName: string;
  phone: string;
  address: string;
  hireDate: string;
}

interface Department {
  id: string;
  departmentName: string;
}

export default function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>('');

  // Get Employee Data
  const fetchEmployee = () => {
    fetch(`http://localhost:5056/employee/${id}`)
      .then(res => res.json())
      .then(data => {
        setEmployee(data);
        setSelectedDepartmentId(data.departmentId);
      });
  };

  useEffect(() => {
    fetchEmployee();
    fetch('http://localhost:5056/department/all')
      .then(res => res.json())
      .then(data => setDepartments(data));
  }, [id]);

  const handleUpdate = async () => {
    if (!employee || !selectedDepartmentId) return;

    const [firstName, ...rest] = employee.name.split(' ');
    const lastName = rest.join(' ') || '';

    const body = {
      firstName,
      lastName,
      departmentId: selectedDepartmentId,
      phone: employee.phone,
      address: employee.address,
    };

    try {
      const response = await fetch(`http://localhost:5056/employee/${employee.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error('Error to update employee');

      alert('Department updated!');
      fetchEmployee(); // Update data on screen
    } catch (err) {
      alert('Erro ao atualizar');
      console.error(err);
    }
  };

  if (!employee) return <p>Loading Employee...</p>;

  const hireDate = new Date(employee.hireDate);
  const today = new Date();
  const diffYears = today.getFullYear() - hireDate.getFullYear();
  const diffMonths = today.getMonth() - hireDate.getMonth();
  const diffDays = today.getDate() - hireDate.getDate();

  return (
    <div className={styles.container}>
      <button onClick={() => navigate('/')}>← Home</button>

      <div className={styles.avatar}></div>
      <div className={styles.info}>
        <h2>{employee.name}</h2>
        <p><strong>Employee ID:</strong> {employee.id}</p>
        <p><strong>Department:</strong> {employee.departmentName}</p>
        <p><strong>Telephone:</strong> {employee.phone}</p>
        <p><strong>Address:</strong> {employee.address}</p>

        <div className={styles.updateSection}>
          <label><strong>Update Department</strong></label>
          <select
            value={selectedDepartmentId}
            onChange={(e) => setSelectedDepartmentId(e.target.value)}
          >
            <option value="">Select...</option>
            {departments.map(dep => (
              <option key={dep.id} value={dep.id}>
                {dep.departmentName}
              </option>
            ))}
          </select>
          <button onClick={handleUpdate}>Update</button>
        </div>
      </div>
      <div className={styles.hireDate}>
        <p>{hireDate.toDateString()}</p>
        <p>{diffYears}y - {Math.abs(diffMonths)}m - {Math.abs(diffDays)}d</p>
      </div>
    </div>
  );
}
