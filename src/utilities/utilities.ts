export const formatDate = (
  date: string,
  monthType: 'short' | 'long' = 'long'
) => {
  return new Date(date).toLocaleString('en-US', {
    day: 'numeric',
    year: 'numeric',
    month: monthType,
  });
};
