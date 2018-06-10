exports.test = function (req, res) {
  res.render('index', {
    title: 'Test',
  });
}


exports.home = function (req, res) {
  res.render('home', {
    title: 'Test',
  });
}
