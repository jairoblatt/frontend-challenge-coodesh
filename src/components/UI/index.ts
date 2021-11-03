import Vue from "vue";
import Btn from "./Btn/index.vue";
import Icon from "./Icon/index.vue";
import Spinner from "./Spinner/index.vue";
import Avatar from "./Avatar/index.vue";
import Alert from "./Alert/index.vue";

[Btn, Icon, Spinner, Avatar, Alert].forEach((component) => {
  Vue.component((component as any).options.name, component);
});
