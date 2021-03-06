<template>
  <section class="users">
    <div class="users__header">
      <div class="users__search">
        <SearchBar v-model="filters.name" />
      </div>

      <div class="users__filters">
        <SearchFilter :options="genders" v-model="filters.gender" data-testid="filter-gender" @input="filterByGender">
          Gender
        </SearchFilter>

        <SearchFilter
          :options="nationalities"
          v-model="filters.nat"
          data-testid="filter-nationality"
          @input="filterByNationality"
        >
          Nationalities
        </SearchFilter>
      </div>
    </div>

    <div class="users__content">
      <Table :users="usersFiltered" />
    </div>

    <Pagination :loading="usersfetchPending" :delay="2300" @loadMore="fetchUsersPagination" />

    <div class="users__children">
      <transition name="zoom-fade">
        <RouterView />
      </transition>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import SearchBar from "@/components/SearchBar/index.vue";
import SearchFilter from "@/components/SearchFilter/index.vue";
import Pagination from "@/components/UI/Pagination/index.vue";
import Table from "@/components/Table/index.vue";
import { mapGetters } from "vuex";
import { UserData, UserApiInfo, Filters, FetchContext } from "@/types/User";
import { genders, nationalities } from "@/utils";

export default Vue.extend({
  metaInfo: {
    title: "Users",
  },

  components: {
    SearchBar,
    Table,
    Pagination,
    SearchFilter,
  },

  data: () => ({
    genders,
    nationalities,
    filters: {
      name: "",
      gender: "",
      nat: "",
    } as Filters,
  }),

  computed: {
    ...mapGetters({
      users: "users/get",
      usersFetchInfo: "users/fetchInfo",
      usersfetchPending: "users/fetchPending",
    }),

    usersFiltered(): UserData[] {
      return (
        this.users?.filter((user: UserData) => {
          const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
          return fullName.includes(this.filters.name.toLowerCase());
        }) || []
      );
    },
  },

  created() {
    // Get the query to make fetch when the component
    // is created
    const { query } = this.$route;
    this.fetchUser({
      page: query?.page,
      seed: query?.seed,
      gender: query?.gender,
      nat: query?.nat,
    } as FetchContext);

    if (typeof query?.gender === "string") {
      this.filters.gender = query.gender;
    }

    if (typeof query?.nat === "string") {
      this.filters.nat = query.nat;
    }
  },

  watch: {
    usersFetchInfo(fetchInfo: UserApiInfo) {
      if (!fetchInfo) return;

      const { query } = this.$route;
      if (
        fetchInfo?.page !== Number(query?.page) ||
        fetchInfo?.gender !== query?.gender ||
        fetchInfo?.nat !== query?.nat
      ) {
        this.$router.replace({
          query: {
            page: String(fetchInfo.page),
            seed: fetchInfo.seed,
            gender: fetchInfo.gender,
            nat: fetchInfo.nat,
          },
        });
      }
    },
  },

  methods: {
    fetchUsersPagination() {
      this.fetchUser({
        page: this.usersFetchInfo.page + 1,
        seed: this.usersFetchInfo.seed,
        gender: this.usersFetchInfo.gender,
        nat: this.usersFetchInfo.nat,
      });
    },

    filterByGender(gender: string) {
      this.filterFetch({ gender });
    },

    filterByNationality(nat: string) {
      this.filterFetch({ nat });
    },

    fetchUser(fetchContext: FetchContext) {
      this.$store.dispatch("users/fetch", fetchContext);
    },

    filterFetch(fetchFilter: FetchContext) {
      const nat = fetchFilter?.nat || this.usersFetchInfo.nat;
      const gender = fetchFilter?.gender || this.usersFetchInfo.gender;
      // Reset users and fetch info state for make
      // an new fetch with the gender select.
      this.$store.commit("users/SET_USERS", null);
      this.$store.commit("users/FETCH_INFO", null);
      this.fetchUser({ nat, gender });
    },
  },
});
</script>

<style lang="postcss" scoped>
.users {
  @apply flex flex-col xl:px-56 lg:px-32 md:px-20 px-3 pt-20;
}

.users__header {
  @apply flex md:flex-row flex-col;
}

.users__header > div {
  flex: 1 auto;
}

@screen md {
  .users__header > div {
    flex: 1 50%;
  }
}

.users__search {
  @apply flex-auto self-auto md:self-end md:mb-0 mb-3;
}

.users__filters {
  @apply flex items-center flex-auto sm:flex-row flex-col;
}

.users__content {
  @apply mt-5 sm:w-full overflow-x-auto whitespace-nowrap;
}

.users__children {
  @apply relative;
}
</style>
