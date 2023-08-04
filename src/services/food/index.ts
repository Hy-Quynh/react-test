import fetch from 'services/request';

const foodService = {
  getListFood: () => {
    return fetch({ url: '/food' });
  },
};

export default foodService;
