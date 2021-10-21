import { VNodeDirective } from "vue";

type OnClick = (event: Event) => void;
type IElement = HTMLElement & { _clickOutside?: ClickOutside };
interface ClickOutside {
  callback?: (event: Event) => void;
  onClick: OnClick;
}

function handle(event: Event, el: IElement) {
  if (!el.contains(event.target as HTMLElement) && el._clickOutside?.callback) {
    el._clickOutside.callback(event);
  }
}

function inserted(el: IElement, binding: VNodeDirective) {
  if (typeof binding.value !== "function") return;
  const onClick: OnClick = (event) => handle(event, el);

  el._clickOutside = {
    callback: binding.value,
    onClick,
  };

  document.addEventListener("click", onClick, true);
}

function unbind(el: IElement) {
  if (!el._clickOutside) return;
  document.removeEventListener("click", el._clickOutside.onClick, true);
  delete el._clickOutside;
}

export default {
  inserted,
  unbind,
};
