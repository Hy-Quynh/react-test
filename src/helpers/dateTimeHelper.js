import moment from 'moment';

const dateTimeHelper = {
  convert: (dateTime) => {
    if (dateTime) {
      return moment(dateTime).format('DD-MM-YYYY');
    }
    return '';
  }
};

export default dateTimeHelper;