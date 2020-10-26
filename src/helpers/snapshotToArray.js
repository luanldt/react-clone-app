export default (snapshot) => {
  return Object.entries(snapshot).map((e) => ({ key: e[0], ...e[1] }));
};
