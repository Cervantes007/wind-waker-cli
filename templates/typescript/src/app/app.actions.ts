import { Action } from 'wind-waker';

export class AppActions {
  @Action()
  helloWorld() {
    return { message: 'Hello World' };
  }
}
