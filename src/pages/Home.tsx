// src/pages/Home.tsx
import { useEffect, useState } from 'react';
import EmployeeCard from '../components/EmployeeCard/EmployeeCard';
import Header from '../components/Header';
import NewEmployeeForm from '../components/NewEmployeeForm/NewEmployeeForm';
import { useNavigate } from 'react-router-dom';

type EmployeeFromApi = {
  id: string;
  name: string;
  departmentName: string;
  hireDate: string;
  phone: string;
  address: string;
};

function Home() {
  const [employees, setEmployees] = useState<EmployeeFromApi[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const navigate = useNavigate();

  // Load employees while building component
  useEffect(() => {
    fetch('http://localhost:5056/employee/all', {
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': 'authorization-key-1209381029038'
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Error to load employees');
        return res.json();
      })
      .then(data => setEmployees(data))
      .catch(err => {
        console.error(err);
        alert('Erro ao carregar dados da API');
      });
  }, []);

  // Remove funcionário da lista
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5056/employee/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': 'authorization-key-1209381029038'
        },
      });

      if (!response.ok) {
        throw new Error(`Error to delete employee: ${response.status}`);
      }

      // Remove da lista local se deletado com sucesso
      setEmployees(prev => prev.filter(e => e.id !== id));
    } catch (error) {
      console.error('Error to delete employee:', error);
      alert('Error to delete employee');
    }
  };

  // Cria novo funcionário
  const createEmployee = async (employee: any) => {
    try {
      const response = await fetch('http://localhost:5056/employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': 'authorization-key-1209381029038'
        },
        body: JSON.stringify(employee),
      });

      if (!response.ok) {
        throw new Error(`Error to create employee: ${response.status}`);
      }

      const result = await response.json();
      console.log('Employee created:', result);

      // Atualiza a lista com o novo funcionário
      await fetch('http://localhost:5056/employee/all', {
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': 'authorization-key-1209381029038'
        }
      })
        .then(res => res.json())
        .then(data => setEmployees(data));
    } catch (error) {
      console.error('Error to send employee:', error);
    }
  };

  // Lista única de departamentos para o select
  const departmentOptions = Array.from(new Set(employees.map(e => e.departmentName)));

  return (
    <div style={{ padding: '8rem 2rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Header />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          style={{ padding: '0.5rem' }}
        >
          <option value="">All departments</option>
          {departmentOptions.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

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

      {employees
        .filter(e =>
          e.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedDepartment === '' || e.departmentName === selectedDepartment)
        )
        .map(e => (
          <EmployeeCard
            key={e.id}
            name={e.name}
            department={e.departmentName}
            hireDate={new Date(e.hireDate)}
            onDelete={() => handleDelete(e.id)}
            onViewDetails={() => navigate(`/employee/${e.id}`)}
          />
        ))}

      {showForm && (
        <NewEmployeeForm
          onSubmit={createEmployee}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default Home;
