import styles from "./Clear.module.css";

export default function Clear({ onClick }) {
  return (
    <button className={styles.wrapper} onClick={onClick}>
      Clear
    </button>
  );
}