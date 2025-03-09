export const formatFloatFixed2 = (data: number) => {
  const format = parseFloat(data.toString()).toFixed(2);
  const formattedDistance: number = parseFloat(format);

  return formattedDistance;
};
