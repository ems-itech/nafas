import styles from "../FigmaHomePage.module.css";

export default function SectionHeading({ title, description }: { title: string; description: string }) {
  return <div className={styles.sectionHeading}><h2>{title}</h2><p>{description}</p></div>;
}
