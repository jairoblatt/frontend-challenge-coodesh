import { VNode } from "vue";

export function transitionStub() {
  return {
    render(): VNode {
      return (this as any).$options._renderChildren;
    },
  };
}
