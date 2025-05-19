export function formatDateTime(
  date: number | string | Date,
  options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' },
  locale?: string,
): string {
  const formatter = new Intl.DateTimeFormat(locale, options)
  try {
    if (typeof date === 'number') {
      return formatter.format(new Date(date * 1000))
    } else if (typeof date === 'string') {
      return formatter.format(new Date(date))
    } else if (date instanceof Date) {
      return formatter.format(date)
    } else {
      return 'Invalid date'
    }
  } catch (error) {
    console.error('Error formatting date:', error)
    return 'Invalid date'
  }
}
