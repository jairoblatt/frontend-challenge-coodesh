import { VNodeDirective } from "vue/types/vnode";

type IntersectFunction = <T>(entryIsVisible: boolean, entries: IntersectionObserverEntry[]) => T | void;
interface IntersectVNodeDirective extends Omit<VNodeDirective, "modifiers"> {
  value?: IntersectFunction | { callback: IntersectFunction; IntersectionOptions?: IntersectionObserverInit };
  modifiers?: {
    once?: boolean;
    quiet?: boolean;
  };
}

interface HTMLBaseElement extends HTMLElement {
  _observerState?: {
    init: boolean;
    observer: IntersectionObserver | null;
  };
}

function inserted(el: HTMLBaseElement, binding: IntersectVNodeDirective) {
  if ("IntersectionObserver" in window) {
    el._observerState = {
      init: false,
      observer: null,
    };

    const value = binding.value;
    const { callback, IntersectionOptions } =
      typeof value === "object" ? value : { callback: value, IntersectionOptions: {} };

    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      const entryIsVisible = entries.some((entry) => entry.isIntersecting);
      if ((callback && el._observerState?.init) || (!binding.modifiers?.quiet && callback)) {
        callback(entryIsVisible, entries);
        binding.modifiers?.once && entryIsVisible && unbind(el);
      }
      if (el._observerState) {
        el._observerState.init = true;
      }
    }, IntersectionOptions);
    observer.observe(el);
    el._observerState.observer = observer;
  }
}

function unbind(el: HTMLBaseElement) {
  if (el._observerState) {
    el._observerState.observer?.unobserve(el);
    delete el._observerState;
  }
}

export default {
  inserted,
  unbind,
};
