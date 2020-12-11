export default (email: string): boolean => {
  const regex = /\S+@\S+\.\S/;
  return regex.test(email);
};
