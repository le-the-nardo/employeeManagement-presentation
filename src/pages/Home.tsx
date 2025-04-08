// src/pages/Home.tsx
import { useState } from 'react';
import EmployeeCard from '../components/EmployeeCard/EmployeeCard';
import { mockEmployees } from '../data/mockEmployees';
import Header from '../components/Header';
import NewEmployeeForm from '../components/NewEmployeeForm/NewEmployeeForm';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [employees, setEmployees] = useState(mockEmployees);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleDelete = (id: number) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
  };

  const handleAddEmployee = (newEmployee: any) => {
    setEmployees(prev => [...prev, newEmployee]);
  };

  return (
    <div style={{ padding: '8rem 2rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Header />

      <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
        <button
          onClick={() => setShowForm(true)}
          style={{
            backgroundColor: '#7be090',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
          New Employee
        </button>
      </div>

      {employees.map(e => (
        <EmployeeCard
          key={e.id}
          name={e.name}
          department={e.department}
          hireDate={e.hireDate}
          onDelete={() => handleDelete(e.id)}
          onViewDetails={() => navigate(`/employee/${e.id}`)}
        />
      ))}

      {showForm && (
        <NewEmployeeForm
          onSubmit={handleAddEmployee}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default Home;
