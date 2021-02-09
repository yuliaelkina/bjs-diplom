"use strict";
const logoutButton = new LogoutButton;
logoutButton.action = () => {
  ApiConnector.logout((response) => {if (response.success) {
    location.reload();
    };
  }
 )
};
ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
};});

const board = new RatesBoard;

function getRates() {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      board.clearTable();
      board.fillTable(response.data);
    }
  })
};
let timerRates = setInterval(getRates, 1000);

