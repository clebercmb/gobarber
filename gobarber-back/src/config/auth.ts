export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiriesIn: '1d',
  },
};
