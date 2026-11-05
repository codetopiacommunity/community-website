import { format, parseISO } from "date-fns";

/**
 * Returns a formatted date range string.
 * If endDate is the same month+year, only shows the day for the end.
 * e.g. "Feb 21 to 22, 2025" or "Feb 21, 2025 to Mar 3, 2025"
 */
export function formatDateRange(
  startDate: string,
  endDate?: string | null,
): string {
  try {
    const start = parseISO(startDate);
    if (!endDate) return format(start, "MMM d, yyyy");

    const end = parseISO(endDate);
    const sameMonthYear =
      start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear();

    if (sameMonthYear) {
      return `${format(start, "MMM d")} to ${format(end, "d, yyyy")}`;
    }
    return `${format(start, "MMM d, yyyy")} to ${format(end, "MMM d, yyyy")}`;
  } catch {
    return endDate ? `${startDate} to ${endDate}` : startDate;
  }
}
