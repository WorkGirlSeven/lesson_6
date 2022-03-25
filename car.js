export class Car {
  _brand;
  _model;
  _yearOfManufacturing;
  _maxSpeed;
  _maxFuelVolume;
  _fuelConsumption;
  _currentFuelVolume = 0;
  _isStarted = false;
  _mileage = 0;
  
  set brand(name) {
    if (this._isValidString(name, 1, 50)) {
      this._brand = name;
    }
  }
  
  get brand() {
    return this._brand;
  }
  
  set model(name) {
    if (this._isValidString(name, 1, 50)) {
      this._model = name;
    }
  }
  
  get model() {
    return this._model;
  }
  
  set yearOfManufacturing(number) {
    const currentYear = new Date().getFullYear();
    const isValidYear = Number.isFinite(number) && number >= 1900 && number <= currentYear;
    
    if (isValidYear) {
      this._yearOfManufacturing = number;
    }
  }
  
  get yearOfManufacturing() {
    return this._yearOfManufacturing;
  }
  
  set maxSpeed(number) {
    if (this._isValidNumber(number, 100, 300)) {
      this._maxSpeed = number;
    }
  }
  
  get maxSpeed() {
    return this._maxSpeed;
  }
  
  set maxFuelVolume(number) { // макс объем топлива
    if (this._isValidNumber(number, 5, 20)) {
      this._maxFuelVolume = number;
    }
  }
  
  get maxFuelVolume() {
    return this._maxFuelVolume;
  }
  
  set fuelConsumption(number) {
    if (this._isPositiveNum(number)) {
      this._fuelConsumption = number;
    }
  }
  
  get fuelConsumption() {
    return this._fuelConsumption;
  }
  
  get currentFuelVolume() {
    return this._currentFuelVolume;
  }
  
  get isStarted() {
    return this._isStarted;
  }
  
  get mileage() {
    return this._mileage;
  }
  
  start() {
    if (this._isStarted) {
      throw new Error('Машина уже заведена')
    }
    
    return this._isStarted = true;
  }
  
  shutDownEngine() {
    if (!this._isStarted) {
      throw new Error('Машина ещё не заведена')
    }
    
    return this._isStarted = false;
  }
  
  fillUpGasTank(amount) {
    if (!this._isPositiveNum(amount)) {
      throw new Error('Неверное количество топлива для заправки');
    }
    
    if (this._currentFuelVolume + amount > this._maxFuelVolume) {
      throw new Error('Топливный бак переполнен');
    }
    
    return this._currentFuelVolume += amount;
  }
  
  drive(speed, time) {
    if (!this._isPositiveNum(speed)) {
      throw new Error('Неверная скорость');
    }
    
    if (!this._isPositiveNum(time)) {
      throw new Error('Неверное количество часов');
    }
    
    if (speed > this._maxSpeed) {
      throw new Error('Машина не может ехать так быстро');
    }
    
    if (!this._isStarted) {
      throw new Error('Машина должна быть заведена, чтобы ехать');
    }
    
    const distance = speed * time;
    const needfulGas = distance * this._fuelConsumption * 0.01;
    
    if (needfulGas > this._currentFuelVolume) {
      throw new Error('Недостаточно топлива');
    }
    
    this._currentFuelVolume -= needfulGas;
    this._mileage += distance;
  }
  
  _isValidNumber(number, from, to) {
    const validNumber = Number.isFinite(number) && number >= from && number <= to;
    return validNumber;
  }
  
  _isValidString(string, from, to) {
    const validString = string.length >= from && string.length <= to;
    return validString;
  }
  
  _isPositiveNum(number) {
    const isValidNumber = Number.isFinite(number) && number > 0;
    return isValidNumber;
  }
}









