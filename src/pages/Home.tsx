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
  const navigate = useNavigate();

  // Carrega os funcionários na montagem do componente
  useEffect(() => {
    fetch('http://localhost:5056/employee/all', {
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': 'authorization-key-1209381029038'
        }})
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar funcionários');
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
        throw new Error(`Erro ao deletar funcionário: ${response.status}`);
      }
  
      // Remove da lista local se deletado com sucesso
      setEmployees(prev => prev.filter(e => e.id !== id));
    } catch (error) {
      console.error('Erro ao deletar funcionário:', error);
      alert('Erro ao deletar funcionário');
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
        throw new Error(`Erro ao criar funcionário: ${response.status}`);
      }

      const result = await response.json();
      console.log('Funcionário criado:', result);

      // Atualiza a lista com o novo funcionário
      await fetch('http://localhost:5056/employee/all', {
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': 'authorization-key-1209381029038'
        }})
        .then(res => res.json())
        .then(data => setEmployees(data));
    } catch (error) {
      console.error('Erro ao enviar funcionário:', error);
    }
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
