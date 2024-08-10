import styles from "./Input.module.css";

export default function Input({ value, onChange, onClick, onKeyDown }) {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.text}
        placeholder="Your prompt here..."
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <button className={styles.btn} onClick={onClick}>
        Go
      </button>
    </div>
  );
}