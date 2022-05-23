/// <reference lib="es6" />

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
  protected __iterateReverse(): IterableIterator<ImmutableStackFrame<T>>;
}

declare var emptyStack: ImmutableStackFrame<never>;

export { ImmutableStackFrame };
export default emptyStack;
