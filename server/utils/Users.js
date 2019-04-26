class Users{

  constructor(){
    this.usersArr = [];
  }

  addUser(id,name,room){
    var user = {id,name,room};
    this.usersArr.push(user);
    return user;
  }

  removeUser(id){
    var user = this.getUser(id);
    if(user)
    for(var i = 0; i < this.usersArr.length; i++){
       if (this.usersArr[i].id === id) {
         this.usersArr.splice(i, 1);
       }
    }
    return user;
  }

  getUser (id){
    var user = this.usersArr.filter((user)=> user.id === id)
    return user[0];
  }

  getUserList(room){
    var roomList = this.usersArr.filter((user) => user.room === room);
    var namesList =   roomList.map((user)=> user.name)
    return namesList;
  }
}
module.exports = {Users};
