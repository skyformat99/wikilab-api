var tser = require('tser');

describe('Model.User', function() {
  beforeEach(function() {
    return fixtures.load('users');
  });

  describe('password', function() {
    it('should hash the password when create', function() {
      return User.create({
        name: 'Tom',
        email: 'tom@email.com',
        password: '123'
      }).then(function(user) {
        expect(user.password).to.not.eql('123');
        return expect(user.comparePassword('123')).to.become(true);
      }).catch(function(e) {
        console.log(e);
      });
    });

    describe('#updatePassword', function() {
      it('should update the password hashed', function() {
        var user = fixtures.users[0];
        return user.updatePassword('new password').then(function(user) {
          return expect(user.comparePassword('new password')).to.become(true);
        });
      });

      it('should leave the other attrs unchanged', function() {
        var user = fixtures.users[0];
        var oldName = user.name;
        user.name = 'new name';
        return user.updatePassword('new password').then(function(user) {
          return expect(user.reload()).to.eventually.have.property('name', oldName);
        });
      });
    });
  });
});