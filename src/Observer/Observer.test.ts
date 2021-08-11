import Observer from './Observer';

describe('Observer class', () => {
  class Test extends Observer {
    notifyObservers() {
      this.notify('testEvent');
    }
  }
  const myTest = new Test();
  const eventType = 'testEvent';
  const callback = jest.fn();

  describe('add method', () => {
    test('callbacks should not be repeated', () => {
      myTest.add(eventType, callback);
      expect(() => myTest.add(eventType, callback)).toThrow('observer already in the list');
    });
  });

  describe('notify method', () => {
    test('should call callback method', () => {
      myTest.notifyObservers();
      expect(callback).toBeCalled();
    });
  });
});
