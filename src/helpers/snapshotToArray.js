// eslint-disable-next-line import/no-anonymous-default-export
export default (snapshot) => {
  return Object.entries(snapshot).map((e) => ({ key: e[0], ...e[1] }));
};
