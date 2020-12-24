
var async = require('async');

var intersection = function (a, b, c) {
  var x = [];
  var check = function (e, cb) {
    if (~b.indexOf(e)) x.push(e);
    if (cb && typeof cb == 'function') cb(null);
  };

  if (c) {
    async.forEach(a, check, function () {
      c(null, x);
    });
  } else {
    a.forEach(check);
    return x;
  }
}

var union = function (a, b, c) {
  var x = [];
  var check = function (e, cb) {
    if (!~x.indexOf(e)) x.push(e);
    if (cb && typeof cb == 'function') cb(null);
  }

  if (c) {
    var waiting = 2;
    var asyncCheck = function () {
      if (--waiting == 0) {
        c(null, x);
      }
    }
    async.forEach(a, check, asyncCheck);
    async.forEach(b, check, asyncCheck);
  } else {
    a.forEach(check);
    b.forEach(check);
    return x;
  }
}

var index = function (a, b, c) {
  if (c) {
    async.parallel({
      intersection: function (cb) {
        intersection(a, b, cb);
      },
      union: function (cb) {
        union(a, b, cb);
      }
    }, function (err, results) {
      c(results.intersection.length / results.union.length);
    });
  } else {
    return intersection(a, b).length / union(a, b).length;
  }
}

var distance = function (a, b, c) {
  if (c) {
    c(1 - index(a, b));
  } else {
    return 1 - index(a, b);
  }
}

module.exports = {
  index: index,
  distance: distance
}