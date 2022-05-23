const _ = Symbol.for('_');
const flag = Symbol.for('@iter-tools/immutable-stack');

class ImmutableStackFrame {
  constructor(value, prev = null, size = 0) {
    this[_] = { prev, value, size };
  }

  static isImmutableStack(inst) {
    return inst != null && inst[flag];
  }

  get [flag]() {
    return true;
  }

  get size() {
    return this[_].size;
  }

  get prev() {
    return this[_].prev;
  }

  get value() {
    return this[_].value;
  }

  push(...values) {
    return this.concat(values);
  }

  pop() {
    return this.prev === null ? this : this.prev;
  }

  peek() {
    return this.value;
  }

  replace(...values) {
    let s = this;
    for (const _ of values) {
      s = s.pop();
    }
    return s.concat(values);
  }

  concat(iterable) {
    let stack = this;
    for (const value of iterable) {
      stack = new ImmutableStackFrame(value, stack, stack.size + 1);
    }
    return stack;
  }

  reverse() {
    let stack = emptyStack;
    for (const { value } of this.__iterateReverse()) {
      stack = stack.push(value);
    }
    return stack;
  }

  *values() {
    for (const stack of this.reverse().__iterateReverse()) {
      yield stack.value;
    }
  }

  *valuesReverse() {
    for (const stack of this.__iterateReverse()) {
      yield stack.value;
    }
  }

  *__iterateReverse() {
    let stack = this;
    while (stack.size > 0) {
      yield stack;
      stack = stack.prev;
    }
  }

  [Symbol.iterator]() {
    return this.values();
  }

  forEach(cb, thisArg) {
    if (thisArg != null) {
      cb = cb.bind(thisArg);
    }
    for (const value of this.values()) cb(value);
  }
}

const emptyStack = new ImmutableStackFrame();

module.exports = emptyStack;
