import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <h1>Employee Directory</h1>
      <p>Manage and view employee information</p>
    </header>
  );
}

export default Header