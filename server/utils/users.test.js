const expect = require('expect');

const {Users} = require('./Users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node course'
    }, {
      id: '2',
      name: 'Jen',
      room: 'React course'
    }, {
      id: '3',
      name: 'Julie',
      room: 'Node course'
    }];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Andres',
      room: 'My Room'
    }

    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
      var userId = '2'
      var user = users.removeUser(userId);
      expect(user.id).toEqual(userId);
  });

  it('should not remove user', () => {
    var user = users.removeUser('4');
    expect(user).toNotExist();
  });

  it('should find user', () => {
    var userId = '2'
    var user = users.getUser(userId);
    expect(user.id).toEqual(userId);
  });

  it('should not find an user', () => {
    var user = users.getUser('4');
    expect(user).toNotExist();
  });

  it('should return names for node course', () => {
    var userList = users.getUserList('Node course');

    expect(userList).toEqual(['Mike', 'Julie']);
  });

  it('should return names for react course', () => {
    var userList = users.getUserList('React course');

    expect(userList).toEqual(['Jen']);
  });
});
