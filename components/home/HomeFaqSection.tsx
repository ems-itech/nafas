import type { Locale } from "@/lib/i18n/locales";
import type { HomepageFaqSection } from "@/sanity/types";
import { text } from "./content";
import styles from "../FigmaHomePage.module.css";

export default function HomeFaqSection({ locale, section }: { locale: Locale; section?: HomepageFaqSection }) {
  const questions = section?.questions?.filter((item) => text(item.question, locale) && text(item.answer, locale)) ?? [];
  if (questions.length === 0) return null;
  const eyebrow = text(section?.eyebrow, locale, locale === "ar" ? "أسئلة قبل زيارتك الأولى" : "Questions people ask before their first visit");
  const title = text(section?.title, locale, locale === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions");
  const description = text(section?.description, locale, locale === "ar" ? "كل ما تحتاج إلى معرفته قبل زيارتك الأولى أو الخمسين." : "Everything you need to know before your first visit - or your fiftieth.");
  const prompt = text(section?.contactPrompt, locale, locale === "ar" ? "هل لديك أسئلة أخرى؟ يسعدنا أن نسمع منك." : "Still have questions? We'd love to hear from you.");
  const contactLabel = text(section?.cta?.text, locale, locale === "ar" ? "تواصل معنا" : "Get in Touch");

  return (
    <section id="faq" className={styles.faqSection}>
      <div className={styles.faqInner}>
        <header className={styles.faqHeading}>
          <span>{eyebrow}</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </header>
        <div className={styles.faqList}>
          {questions.map((item, index) => (
            <details key={item._key || index} className={styles.faqItem} open>
              <summary><span>{text(item.question, locale)}</span><span className={styles.faqToggle} aria-hidden="true" /></summary>
              <p>{text(item.answer, locale)}</p>
            </details>
          ))}
        </div>
        <div className={styles.faqContact}>
          <p>{prompt}</p>
          <a href={section?.cta?.href || "#contact"}>{contactLabel}</a>
        </div>
      </div>
    </section>
  );
}
