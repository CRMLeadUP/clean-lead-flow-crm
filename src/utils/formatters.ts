
/**
 * Format a number as currency in BRL format
 */
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

/**
 * Format a number as percentage
 */
export const formatPercentage = (value: number) => {
  return `${value}%`;
};

/**
 * Format a date in Brazilian format (DD/MM/YYYY)
 */
export const formatDate = (date: Date | string) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('pt-BR');
};
