module.exports = (router) => {
  router.get('/', (req, res) => {
    const data = {
      success: true
    };

    res.json(data);
  });
};
