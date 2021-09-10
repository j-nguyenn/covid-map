const fetchCountries = (): Promise<any> => {
  const url = "https://corona.lmao.ninja/v2/countries";

  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json)
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};

export { fetchCountries };
