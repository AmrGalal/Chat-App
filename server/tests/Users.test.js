const expect = require('expect');
const {Users} = require('./../utils/Users.js');

describe('test class Users', () => {
  var usersTest;
  var user, user2;
  beforeEach(()=>{
      usersTest = new Users();
      user = {id:'sajsnnas',name:'Amr',room:'Developers'};
      user2 = {id:'sajsnnaasas',name:'Amr2',room:'Random'};
  })

  it('should add a new user', () => {
    var res = usersTest.addUser(user.id,user.name,user.room);
    expect(usersTest.usersArr).toEqual([user]);
    expect(res).toEqual(user);
  });

  it('should remove a user',()=>{
    var temp = usersTest.addUser(user.id,user.name,user.room);
    var res = usersTest.removeUser(user.id);

    expect(res).toEqual(user)
    expect(usersTest.usersArr.length).toBe(0);
  })

  it('should not remove a user',()=>{
    var res = usersTest.removeUser(user.id);
    expect(res).toNotExist();
    expect(usersTest.usersArr.length).toBe(0);
  })

  it('should get a user',()=>{
    var temp = usersTest.addUser(user.id,user.name,user.room);
    temp = usersTest.addUser(user2.id,user2.name,user2.room);
    var res = usersTest.getUser(user.id);
    expect(res).toEqual(user);
  })

  it('should not get a user',()=>{
    var res = usersTest.getUser(user.id);
    expect(res).toNotExist();
  })

  it('should get list of users in Random room',()=>{
    var res = usersTest.addUser(user2.id,user2.name,user2.room);
    res = usersTest.addUser(user.id,user.name,user.room);
    res = usersTest.getUserList(user2.room);
    expect(res).toEqual(user2.name)
  })
});
