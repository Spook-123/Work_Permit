import styles from "./Input.module.css";
function Input({ children }) {
  return (
    <div>
      {children}:{" "}
      <input
        type="text"
        className={`${styles.width} ${styles.inputMargin}`}
        
      />
    </div>
  );
}

export default Input;
