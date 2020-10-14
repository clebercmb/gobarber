export default {
  jwt: {
    secret: process.env.APP_SECRET,
    expiriesIn: '1d',
  },
};
