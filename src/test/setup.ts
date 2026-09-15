import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds = [];

  constructor(private readonly callback: IntersectionObserverCallback) {}

  disconnect() {}

  observe(target: Element) {
    this.callback([{ isIntersecting: true, target } as IntersectionObserverEntry], this);
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  unobserve() {}
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: MockIntersectionObserver,
});

Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  value: MockIntersectionObserver,
});

/**
 * jsdom has no ResizeObserver. Embla (used by the carousels) constructs one on
 * mount, so without this any component containing a carousel throws in tests
 * while working fine in every real browser.
 */
class MockResizeObserver implements ResizeObserver {
  disconnect() {}
  observe() {}
  unobserve() {}
}

Object.defineProperty(globalThis, "ResizeObserver", {
  writable: true,
  value: MockResizeObserver,
});

Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  value: MockResizeObserver,
});

/**
 * Unmount whatever a test rendered before the next one starts.
 *
 * Testing Library registers this itself in most setups; it was not happening
 * here, so renders piled up in the same document and a second test asking for
 * "the select" found several. Registering it explicitly costs nothing and makes
 * each test independent of the ones before it.
 */
afterEach(cleanup);
