import styles from './EmployeeCard.module.css'


type Props = {
  name: string
  department: string
  hireDate: Date
  onDelete: () => void
  onViewDetails: () => void
}

function EmployeeCard({ name, department, hireDate, onDelete, onViewDetails }: Props) {
  const formattedDate = hireDate.toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  })



  const timeSinceHire = () => {
    const now = new Date()
    const diff = now.getTime() - hireDate.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const years = Math.floor(days / 365)
    const months = Math.floor((days % 365) / 30)
    const remainingDays = days % 30
    return `(${years}y - ${months}m - ${remainingDays}d)`
  }

  return (
    <div className={styles.card}>
      <div className={styles.avatar} />
      <div className={styles.details}>
        <div>
          <strong>{name}</strong> <span className={styles.department}>({department})</span>
        </div>
        <div className={styles.date}>Hire Date<br />{formattedDate} {timeSinceHire()}</div>
      </div>
      <div className={styles.actions}>
        <button className={styles.viewBtn} onClick={onViewDetails}>View Details</button>
        <button className={styles.deleteBtn} onClick={onDelete}>X</button>
      </div>
    </div>
  )
}

export default EmployeeCard
