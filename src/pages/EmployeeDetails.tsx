import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './EmployeeDetails.module.css';

interface Employee {
  id: number;
  name: string;
  department: string;
  phone: string;
  address: string;
  hireDate: string;
}

export default function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [newDepartment, setNewDepartment] = useState('');

  useEffect(() => {
    // 🚧 Aqui faremos um fetch real para a API
    fetch(`http://localhost:5000/employees/${id}`)
      .then(res => res.json())
      .then(data => setEmployee(data));
  }, [id]);

  const handleUpdate = () => {
    if (!employee) return;
    fetch(`http://localhost:5000/employees/${employee.id}/department`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ department: newDepartment }),
    })
      .then(() => alert('Departamento atualizado!'))
      .catch(err => alert('Erro ao atualizar'));
  };

  if (!employee) return <p>Loading...</p>;

  const hireDate = new Date(employee.hireDate);
  const today = new Date();
  const diffYears = today.getFullYear() - hireDate.getFullYear();
  const diffMonths = today.getMonth() - hireDate.getMonth();
  const diffDays = today.getDate() - hireDate.getDate();

  return (
    <div className={styles.container}>
      <div className={styles.avatar}></div>
      <div className={styles.info}>
        <h2>{employee.name}</h2>
        <p><strong>Employee ID:</strong> {employee.id}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Telephone:</strong> {employee.phone}</p>
        <p><strong>Address:</strong> {employee.address}</p>

        <div className={styles.updateSection}>
          <label><strong>Update Department</strong></label>
          <input
            placeholder="Department Name"
            value={newDepartment}
            onChange={e => setNewDepartment(e.target.value)}
          />
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