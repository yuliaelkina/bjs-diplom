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
    };
  });
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

money.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if(response.success) {
      ProfileWidget.showProfile(response.data);
      money.setMessage(response.success, "Перевод произведен успешно");
    }
    else {
      money.setMessage(response.success, response.error);
    };
  });
};

const favorites = new FavoritesWidget;
ApiConnector.getFavorites((response) => {
  if (response.success) {
    favorites.clearTable();
    favorites.fillTable(response.data);
    money.updateUsersList(response.data);
};});

favorites.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      favorites.clearTable();
      favorites.fillTable(response.data);
      money.updateUsersList(response.data);
      favorites.setMessage(response.success, "Пользователь успешно добавлен");
    }
    else {
      favorites.setMessage(response.success, response.error);
    };
  }
  );
};

favorites.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
      favorites.clearTable();
      favorites.fillTable(response.data);
      money.updateUsersList(response.data);
      favorites.setMessage(response.success, "Пользователь успешно удален");
    }
    else {
      favorites.setMessage(response.success, response.error);
    };
  }
  );
}

