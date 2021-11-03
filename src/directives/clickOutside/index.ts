import { VNodeDirective } from "vue";

type onClickAndTouchFunction = (event: Event) => void;

interface ClickOutsideVNodeDirective extends Omit<VNodeDirective, "modifiers"> {
  value?: onClickAndTouchFunction | { callback: onClickAndTouchFunction; capture: boolean };
}

interface HTMLBaseElement extends HTMLElement {
  _clickOutside?: {
    callback?: <T>(event: Event) => T | void;
    onClickAndTouch: onClickAndTouchFunction;
    capture: boolean;
  };
}

function clickOutsideHandle(event: Event, el: HTMLBaseElement) {
  if (!el.contains(event.target as HTMLElement) && el._clickOutside?.callback) {
    el._clickOutside.callback(event);
  }
}

function inserted(el: HTMLBaseElement, binding: ClickOutsideVNodeDirective) {
  const { callback, capture } =
    typeof binding.value === "object" ? binding.value : { callback: binding.value, capture: true };
  if (callback && capture !== undefined) {
    const onClickAndTouch: onClickAndTouchFunction = (event) => clickOutsideHandle(event, el);
    el._clickOutside = {
      callback,
      capture,
      onClickAndTouch,
    };
    document.addEventListener("click", onClickAndTouch, capture);
    document.addEventListener("touchstart", onClickAndTouch, capture);
  }
}

function unbind(el: HTMLBaseElement) {
  if (el._clickOutside) {
    document.removeEventListener("click", el._clickOutside.onClickAndTouch, el._clickOutside.capture);
    document.removeEventListener("touchstart", el._clickOutside.onClickAndTouch, el._clickOutside.capture);
    delete el._clickOutside;
  }
}

export default {
  inserted,
  unbind,
};
