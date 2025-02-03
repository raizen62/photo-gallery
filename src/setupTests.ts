import "@testing-library/jest-dom";

interface ExtendedIntersectionObserver extends IntersectionObserver {
  trigger: (isIntersecting: boolean) => void;
}

declare global {
  var __INTERSECTION_OBSERVERS__: ExtendedIntersectionObserver[];
}

const observers: ExtendedIntersectionObserver[] = [];

class MockIntersectionObserver implements IntersectionObserver {
  public root: Element | null = null;
  public rootMargin: string = "";
  public thresholds: ReadonlyArray<number> = [];

  constructor(
    public callback: IntersectionObserverCallback,
    public options: IntersectionObserverInit = {}
  ) {
    observers.push(this as ExtendedIntersectionObserver);
  }

  observe(_target: Element): void {}
  unobserve(_target: Element): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  trigger(isIntersecting: boolean) {
    const entry: IntersectionObserverEntry = {
      isIntersecting,
      target: {} as Element,
      intersectionRatio: isIntersecting ? 1 : 0,
      time: Date.now(),
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: null,
    };
    this.callback([entry], this);
  }
}

global.IntersectionObserver =
  MockIntersectionObserver as typeof IntersectionObserver;
global.__INTERSECTION_OBSERVERS__ = observers;
