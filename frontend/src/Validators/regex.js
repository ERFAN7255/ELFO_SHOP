const testEmai = (value) => {
  const emailPattent = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/g;
  return emailPattent.test(value);
};

const testCodeMeli = (value) => {};

const testPhoneNumber = (value) => {};

export default {
  testEmai,
  testCodeMeli,
  testPhoneNumber,
};
