<template>
  <tr class="table-item">
    <td class="item__avatar">
      <Avatar v-if="avatar" size="2.1" border="1.5" class="mr-2">
        <img :src="avatar" :alt="`${nameResolve} avatar`" />
      </Avatar>
      {{ nameResolve }}
    </td>
    <td>{{ gender }}</td>
    <td>{{ age }}</td>
    <td><slot /></td>
  </tr>
</template>

<script lang="ts">
import Vue, { PropOptions, PropType } from "vue";
import { Nullable, UserName } from "@/types/types";

export default Vue.extend({
  props: {
    gender: String as PropType<string>,
    age: Number as PropType<number>,
    name: {
      type: Object,
      default: null,
    } as PropOptions<Nullable<UserName>>,
    avatar: String as PropType<string>,
  },

  computed: {
    nameResolve(): string {
      const { name } = this;
      return name ? `${name.first} ${name.last}` : "Unknow name";
    },
  },
});
</script>

<style lang="postcss" scoped>
.table-item td {
  @apply py-3 px-2 text-light-onSurfacePrimary;
}

.item__avatar {
  @apply flex items-center;
}
</style>
