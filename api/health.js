const { handleCors, setCors } = require('./_helpers');

module.exports = (req, res) => {
  if (handleCors(req, res)) return;
  setCors(res);
  res.json({ status: 'OK', message: 'Bunna Bank API running on Vercel', timestamp: new Date() });
};
