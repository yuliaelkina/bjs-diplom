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
const timerRates = setInterval(getRates, 1000);

const money = new MoneyManager;
money.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if(response.success) {
      ProfileWidget.showProfile(response.data);
      money.setMessage(response.success, "Счет успешно пополнен");
    }
    else {
      money.setMessage(response.success, response.error);
    };
  })
};

money.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if(response.success) {
      ProfileWidget.showProfile(response.data);
      money.setMessage(response.success, "Конвертация проведена успешно");
    }
    else {
      money.setMessage(response.success, response.error);
    };
  });
};

