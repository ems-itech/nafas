import ServicesMenuSlider from "@/components/ServicesMenuSlider";
import { menuCards, type MenuRow } from "@/lib/data/services-menu";

function PriceRow({ row, hasRefill }: { row: MenuRow; hasRefill: boolean }) {
  return (
    <div className={`grid items-baseline gap-3 font-sans text-[10px] font-medium uppercase tracking-[0.1em] text-foreground/75 sm:text-xs ${hasRefill ? "grid-cols-[1fr_auto_auto]" : "grid-cols-[1fr_auto]"}`}>
      <span>{row.name}</span>
      <span className="whitespace-nowrap font-semibold text-primary">{row.price} JOD</span>
      {hasRefill ? <span className="w-12 whitespace-nowrap text-end font-semibold text-primary">{row.refill ? `${row.refill} JOD` : "—"}</span> : null}
    </div>
  );
}

export default function ServicesMenu() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-secondary/70 via-background to-background pb-24 pt-8 sm:pb-32 sm:pt-12">
        <div aria-hidden="true" className="absolute -left-32 top-20 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div aria-hidden="true" className="absolute -right-40 top-1/3 -z-10 h-96 w-96 rounded-full bg-secondary blur-3xl" />
        <div className="container-narrow relative">
          <ServicesMenuSlider>
              {menuCards.map((menu, index) => (
                <article key={menu.title} data-menu-card className="w-full shrink-0 snap-center">
                  <div className="flex h-[680px] flex-col rounded-[2rem] border border-primary/15 bg-[linear-gradient(145deg,hsl(var(--card)),hsl(var(--secondary)/.72))] px-5 py-7 sm:h-[760px] sm:rounded-[2.75rem] sm:px-12 sm:py-10 lg:px-20">
                    <div className="mx-auto mb-7 w-full max-w-3xl shrink-0 text-center sm:mb-9">
                      <p className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-primary">{menu.eyebrow}</p>
                      <h2 className="mt-2 text-3xl sm:text-5xl">{menu.title}</h2>
                    </div>

                    <div className="menu-scrollbar mx-auto w-full max-w-3xl flex-1 space-y-8 overflow-y-auto pe-2 sm:space-y-10 sm:pe-4">
                      {menu.sections.map((section) => (
                        <section key={section.title}>
                          <div className="mb-3 flex items-end justify-between gap-3 border-b border-primary/25 pb-2">
                            <h3 className="font-serif text-xl font-medium text-primary sm:text-2xl">{section.title}</h3>
                            {section.priceLabels ? (
                              <div className="grid shrink-0 grid-cols-2 gap-3 font-sans text-[9px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[10px]">
                                <span>{section.priceLabels[0]}</span><span>{section.priceLabels[1]}</span>
                              </div>
                            ) : null}
                          </div>
                          <div className="space-y-2.5">
                            {section.rows.map((row) => <PriceRow key={row.name} row={row} hasRefill={Boolean(section.priceLabels)} />)}
                          </div>
                        </section>
                      ))}
                    </div>
                    <div className="mx-auto mt-5 w-full max-w-3xl shrink-0 border-t border-primary/15 pt-4 text-center">
                      <span className="font-ui text-muted-foreground">{String(index + 1).padStart(2, "0")} / {String(menuCards.length).padStart(2, "0")}</span>
                    </div>
                  </div>
                </article>
              ))}
          </ServicesMenuSlider>
        </div>
      </section>
    </main>
  );
}
