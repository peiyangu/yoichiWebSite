import styles from "./SectionDivider.module.css";

export default function SectionDivider() {
  return (
    <div className={styles.divider} aria-hidden="true">
      <span className={`${styles.line} ${styles.lineLeft}`} />
      <span className={styles.motif}>
        <span className={`${styles.diamond} ${styles.diamondSmall}`} />
        <span className={styles.diamond} />
        <span className={`${styles.diamond} ${styles.diamondSmall}`} />
      </span>
      <span className={`${styles.line} ${styles.lineRight}`} />
    </div>
  );
}
