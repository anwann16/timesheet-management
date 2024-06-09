export const convertTotalDuration = (menit) => {
  const jam = Math.floor(menit / 60);
  const sisaMenit = menit % 60;

  return sisaMenit === 0 ? `${jam} jam` : `${jam} jam ${sisaMenit} menit`;
};
