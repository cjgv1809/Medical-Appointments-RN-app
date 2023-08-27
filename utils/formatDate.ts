const formatDate = (date: Date): string => {
  const newDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  return newDate.toLocaleDateString("es-ES", options);
};

export default formatDate;
