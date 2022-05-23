const emptyStack = require('../stack.cjs');

const Stack = emptyStack.constructor;

describe('ImmutableStack', () => {
  it('is iterable', () => {
    expect([...emptyStack]).toEqual([]);
  });

  it('can push values', () => {
    expect([...emptyStack.push(1, 2, 3)]).toEqual([1, 2, 3]);
  });

  it('can pop values', () => {
    expect([...emptyStack.push(1, 2, 3).pop()]).toEqual([1, 2]);
    expect([...emptyStack.pop()]).toEqual([]);
  });

  it('can concat iterables', () => {
    expect([...emptyStack.concat([1, 2, 3])]).toEqual([1, 2, 3]);
  });

  it('has a size property', () => {
    expect(emptyStack.size).toBe(0);
    expect(emptyStack.push(1, 2, 3).size).toBe(3);
  });

  it('has a value property', () => {
    expect(emptyStack.value).toBe(undefined);
    expect(emptyStack.push(1, 2, 3).value).toBe(3);
  });

  it('has a prev property', () => {
    expect(emptyStack.prev).toBe(null);
    expect(emptyStack.push(1).prev).toBe(emptyStack);
  });

  it('has a reverse method', () => {
    expect([...emptyStack.push(1, 2, 3).reverse()]).toEqual([3, 2, 1]);
  });

  it('has a __iterateReverse method', () => {
    const s1 = emptyStack.push(1);
    const s2 = s1.push(2);
    const s3 = s2.push(3);

    expect([...s3.__iterateReverse()]).toEqual([s3, s2, s1]);
  });

  it('has a forEach method', () => {
    const cb = jest.fn();

    const s1 = emptyStack.push(1);
    const s2 = s1.push(2);
    const s3 = s2.push(3);

    s3.forEach(cb);

    expect(cb.mock.calls).toEqual([[1], [2], [3]]);
  });

  it('forEach may receive a thisArg for cb', () => {
    const thisArg = {};
    const makeCb = (thisArg) =>
      function cb() {
        expect(this).toBe(thisArg);
      };

    emptyStack.push(null).forEach(makeCb(thisArg), thisArg);
    emptyStack.push(null).forEach(makeCb(window), null);
    emptyStack.push(null).forEach(makeCb(window), undefined);

    expect.assertions(3);
  });

  it("flags Stacks using Symbol.for('@iter-tools/immutable-stack')", () => {
    expect(emptyStack.push()[Symbol.for('@iter-tools/immutable-stack')]).toBe(true);
  });

  it('can detect Stacks with isImmutableStack', () => {
    expect(Stack.isImmutableStack(emptyStack)).toBe(true);
  });

  it('has a values iterator', () => {
    expect([...emptyStack.values()]).toEqual([]);
    expect([...emptyStack.push(1, 2, 3).values()]).toEqual([1, 2, 3]);
  });

  it('has a valuesReverse iterator', () => {
    expect([...emptyStack.valuesReverse()]).toEqual([]);
    expect([...emptyStack.push(1, 2, 3).valuesReverse()]).toEqual([3, 2, 1]);
  });
});
