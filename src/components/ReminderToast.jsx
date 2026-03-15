export default function ReminderToast({ reminders, onDismiss }) {
  if (reminders.length === 0) return null;

  return (
    <div className="reminder-container">
      {reminders.map(r => (
        <div key={r._id} className="reminder-toast">
          <strong>Due soon:</strong> {r.title} — {new Date(r.dueDate).toLocaleString()}
          <button onClick={() => onDismiss(r._id)}>✕</button>
        </div>
      ))}
    </div>
  );
}
