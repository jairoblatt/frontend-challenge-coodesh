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
import { UserData } from "@/types/IUser";

export default Vue.extend({
  components: {
    TableItem,
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
  },
});
</script>

<style lang="postcss" scoped>
.table__wrapper {
  @apply rounded-sm border border-gray-100 overflow-hidden text-center bg-white border-collapse w-full;
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
</style>
