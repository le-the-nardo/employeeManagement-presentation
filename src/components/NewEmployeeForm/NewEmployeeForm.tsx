import { useState } from 'react';
import styles from './NewEmployeeForm.module.css';

interface NewEmployeeFormProps {
  onSubmit: (employee: any) => void;
  onClose: () => void;
}

export default function NewEmployeeForm({ onSubmit, onClose }: NewEmployeeFormProps) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    departmentId: '',
    phone: '',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>New Employee</h2>
        <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
        <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
        <input name="departmentId" placeholder="Department ID" value={form.departmentId} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />

        <div className={styles.actions}>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
