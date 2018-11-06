import moment from "moment/src/moment";

export default {
  methods: {
    dateIsToday(date) {
      date = new moment(date, "D MMM YYYY");
      return moment().diff(date, "days") === 0;
    }
  }
};
