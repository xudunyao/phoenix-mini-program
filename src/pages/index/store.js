import { makeAutoObservable, runInAction } from 'mobx';

class Counter {
  counter = 0

  constructor() {
    makeAutoObservable(this);
  }

  increment() {
    this.counter = this.counter + 1
  }

  decrement() {
    this.counter = this.counter - 1
  }

  incrementAsync() {
    setTimeout(() => {
      runInAction(() => {
        this.counter = this.counter + 1;
      })
    }, 1000)
  }
}

export default new Counter();
