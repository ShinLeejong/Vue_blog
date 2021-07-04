export default (prop: string): string | null | boolean => {
  if (localStorage.getItem(prop) === null) return false;
  return localStorage.getItem(prop);
};
