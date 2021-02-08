"use strict";
const user = new UserForm;
user.loginFormCallback = (data) => {
console.log(data);
ApiConnector.login(data, (responce) => {
  if (responce.success) {
    location.reload();
  }
  else {
alert(responce.error);
  };
});
};


