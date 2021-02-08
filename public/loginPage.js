"use strict";
const user = new UserForm;
user.loginFormCallback = (data) => {
ApiConnector.login(data, (response) => {
  if (response.success) {
    location.reload();
  }
  else {
alert(response.error);
  };
});
};

user.registerFormCallback = (data) => {
  ApiConnector.register(data, (response) => {
    if (response.success) {
      location.reload();
    }
    else {
  alert(response.error);
    };
});
}


