/**
 * Abgeleitete Fakten.
 *
 * Regel: eine Zahl auf dieser Seite ist entweder ein Anker (ein Jahr, das
 * passiert ist — 2008, 2019, die Note 5.37) oder sie wird berechnet. Was von
 * Hand getippt wird und trotzdem wächst, ist irgendwann falsch, und eine Seite,
 * die zum Nachrechnen einlädt, muss das Nachrechnen überstehen.
 */

/** Erster Arbeitstag bei BIT — der Anker, aus dem alles andere folgt. */
export const CAREER_START = 2008;

/** Jahre in der Informatik. Wächst von selbst, ohne dass jemand etwas anfasst. */
export const careerYears = (now: Date = new Date()): number =>
  now.getFullYear() - CAREER_START;

/** Für „2021 — aktuell" und das Copyright. */
export const currentYear = (now: Date = new Date()): number => now.getFullYear();
