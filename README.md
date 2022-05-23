# @iter-tools/imm-stack

[![Build Status](https://travis-ci.org/iter-tools/immutable-stack.svg?branch=trunk)](https://travis-ci.org/iter-tools/immutable-stack)
[![codecov](https://codecov.io/gh/iter-tools/immutable-stack/branch/trunk/graph/badge.svg)](https://codecov.io/gh/iter-tools/immutable-stack)

A simple singly-linked immutable stack data structure. A stack is composed of immutable stack frames, each of which supports the full stack API.

Package includes Typescript libdefs. Suitable for node or browser environments. Supports native es imports in `node > 13.2`.

## Usage

```js
import emptyStack from '@iter-tools/immutable-stack'; // OR
const emptyStack = require('@iter-tools/immutable-stack');

const stack = emptyStack.push('Hello', 'world');
stack.value; // 'world'
stack.size; // 2
stack.prev.prev // emptyStack
[...stack] // ['Hello', 'world']
```

Access to the underlying `ImmutableStackFrame` class is not required for ordiary usage, but can be achieved easily:

<!-- prettier-ignore -->
```js
import { ImmutableStackFrame } from '@iter-tools/immutable-stack'; // OR
const ImmutableStackFrame = require('@iter-tools/immutable-stack').constructor;
```

Until Typescript supports [package exports](https://github.com/microsoft/TypeScript/issues/33079) you must enable `esModuleInterop` to use this module.

## API

```ts
/**
 * Each frame stores a `value` and a reference to the previous (`prev`) frame.
 * Each frame also caches `size` for performance reasons.
 */
declare class ImmutableStackFrame<T> {
  /**
   * Returns true if `inst` is an `ImmutableStackFrame`.
   * This does not necessarily imply instanceof, but the check
   * is safe across frame boundaries, as it is done by looking for
   * `inst[Symbol.for('@iter-tools/immutable-stack')]`
   */
  static isImmutableStack(inst: any): boolean;

  /**
   * Instead of `new Stack(iterable)` use `emptyStack.concat(iterable)`
   */
  protected constructor();

  /**
   * The number of values stored in the stack. O(1) cost.
   */
  readonly size: number;

  /**
   * The previous frame in the stack
   */
  readonly prev: ImmutableStackFrame<T>;

  /**
   * The value stored in the current stack frame.
   */
  readonly value: T;

  /**
   * Returns a new stack with the specified `values` on top.
   */
  push<V>(...values: Array<V>): ImmutableStackFrame<T | V>;

  /**
   * Returns a new stack without its top value.
   * emptyStack.pop === emptyStack
   */
  pop(): ImmutableStackFrame<T>;

  /**
   * Returns a new stack with the specified `values` in place
   * of the previous top values.
   */
  replace<V>(...values: Array<V>): ImmutableStackFrame<T | V>;

  /**
   * Returns a new stack with the values in `iterable` on top.
   */
  concat<V>(iterable: Iterable<V>): ImmutableStackFrame<T | V>;

  /**
   * Returns a new stack with the values in reverse order.
   */
  reverse(): ImmutableStackFrame<T>;

  /**
   * Calls `cb(value)` for each value stored in the stack
   */
  forEach(cb: (value: T) => any): void;

  /**
   * Returns an iterator over the values in insertion order
   */
  values(): IterableIterator<T>;

  /**
   * Returns an iterator over the values in reverse insertion order
   */
  valuesReverse(): IterableIterator<T>;

  /**
   * Equivalent to `values()`
   */
  [Symbol.iterator](): IterableIterator<T>;

  /**
   * Returns an iterator over the stack frames from top to bottom
   */
  protected __iterateReverse(): IterableIterator<
    ImmutableStackFrame<T>
  >;
}

declare var emptyStack: ImmutableStackFrame<never>;

export { ImmutableStackFrame };
export default emptyStack;
```
