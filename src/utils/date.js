export const getYYYYMMDD = dateStr => {
  const dateObj = new Date(dateStr);
  const yyyy = dateObj.getFullYear();
  const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
  const dd = String(dateObj.getDay()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};
