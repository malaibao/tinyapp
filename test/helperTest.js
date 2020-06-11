const { assert } = require('chai');

const { getUserByEmail } = require('../controllers/controllers');

describe('getUserByEmail', function () {
  it('should return a user with valid email', function () {
    // jdoe exists in users DB
    const user = getUserByEmail('jdoe@gmail.com');
    const expectedOutput = 'jdoe';
    assert.equal(user.id, expectedOutput);
  });

  it('should return undefined with non-existent email', function () {
    // abcd does not exist in users DB
    const user = getUserByEmail('abcd@gmail.com');
    assert.equal(user, undefined);
  });
});
