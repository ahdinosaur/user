var resource = require('resource'),
    user = resource.define('user');

user.schema.description = "for managing users";

user.persist('memory');

function serialize(user, done) {
  done(null, user.id);
}
user.method('serialize', serialize, {
  description: "serialize user",
  properties: {
    user: {
      type: 'object'
    },
    done: {
      type: 'function'
    }
  }
});

function deserialize(id, done) {
  user.get(id, function(err, _user) {
    if (err) { return done(err); }
    return done(null, _user);
  });
}
user.method('deserialize', deserialize, {
  description: "deserialize user",
  properties: {
    id: {
      type: 'string'
    },
    done: {
      type: 'function'
    }
  }
});

exports.user = user;