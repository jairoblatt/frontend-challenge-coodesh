<template>
  <table class="table__wrapper">
    <thead>
      <tr>
        <th>Name</th>
        <th>Gender</th>
        <th>Birth</th>
        <th>Actions</th>
      </tr>
    </thead>

    <transition-group tag="tbody" name="slide-down">
      <TableItem
        v-for="(user, index) in users"
        v-intersect="tableItemIntersect"
        :key="`table-item-${index}`"
        :name="user.name"
        :gender="user.gender"
        :age="user.dob.age"
        :avatar="user.picture.thumbnail"
      >
        <Btn outlined small @click="redirectToUserPage(user)">
          View
        </Btn>
      </TableItem>
    </transition-group>
  </table>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import TableItem from "./TableItem.vue";
import { UserData } from "@/types/User";
import { intersect } from "@/directives";

export default Vue.extend({
  components: {
    TableItem,
  },

  directives: {
    intersect,
  },

  props: {
    users: {
      type: Array,
      default: () => [],
    } as PropOptions<UserData[]>,
  },

  methods: {
    redirectToUserPage(user: UserData) {
      this.$router.push({
        name: "user",
        params: { username: user.login.username },
        query: this.$route.query,
      });
    },

    tableItemIntersect(entryIsVisible: boolean, entries: IntersectionObserverEntry[]) {
      const intersectTarget = entries?.[0].target;

      if (intersectTarget instanceof Element) {
        const className = "table__intersect---active";
        const targetContainClassName = intersectTarget.classList.contains(className);

        if (entryIsVisible && targetContainClassName) {
          intersectTarget.classList.remove(className);
        } else if (!entryIsVisible && !targetContainClassName) {
          intersectTarget.classList.add(className);
        }
      }
    },
  },
});
</script>

<style lang="postcss" scoped>
.table__wrapper {
  @apply rounded-sm border border-gray-100 text-center bg-white border-collapse w-full;
}

.table__wrapper thead tr {
  @apply text-light-onSurfacePrimary;
}

.table__wrapper th {
  @apply uppercase font-bold;

  padding: 1rem 2rem;
  letter-spacing: 0.1rem;
  font-size: 0.7rem;
}

.table__wrapper tr:nth-child(even) {
  @apply bg-gray-50 bg-opacity-60;
}

.table__wrapper tbody tr {
  @apply border border-gray-100 border-solid;
}

.table__intersect---active >>> td:not(:nth-child(3)) {
  @apply hidden;
}
</style>
