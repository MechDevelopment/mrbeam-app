const URL = 'https://mrbeam-api.herokuapp.com/generate';

export default {
  generate() {
    return fetch(URL).then((res) => res.json());
  },
};
