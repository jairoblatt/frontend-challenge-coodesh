<template>
  <div v-if="user" v-clickOutside="goToUsers" class="modal">
    <div class="modal__user">
      <Avatar tag="picture" size="12" border="4" class="user__avatar">
        <source :srcset="user.picture.thumbnail" media="(max-width: 639px)" />
        <source :srcset="user.picture.medium" media="(min-width: 640px) and (max-width: 1023px)" />
        <img :src="user.picture.large" :alt="`${user.name.first} avatar`" />
      </Avatar>

      <div class="modal__header">
        <Btn data-testid="modal-close" @click="goToUsers">
          <Icon size="21"> mdi-close</Icon>
        </Btn>
      </div>

      <div class="user__content">
        <div class="content__name">
          <h1>{{ user.name.first }} {{ user.name.last }}</h1>
        </div>

        <div class="content__andress">
          <h2>
            <Icon> mdi-map-marker-outline </Icon>
            {{ user.location.city }}, {{ user.location.state }}
            <span>({{ user.location.country }})</span>
          </h2>
          <h3>
            <Icon>mdi-home-variant-outline</Icon>
            {{ user.location.street.name }}, {{ user.location.street.number }}
          </h3>
        </div>
        <hr />
        <div class="content__infos">
          <ContentInfo icon="mdi-email-outline">
            {{ user.email }}
          </ContentInfo>

          <ContentInfo icon="mdi-gender-male-female">
            {{ user.gender }}
          </ContentInfo>

          <ContentInfo icon="mdi-candle">
            {{ user.dob.age }}
          </ContentInfo>

          <ContentInfo icon="mdi-cellphone">
            {{ user.cell }}
          </ContentInfo>

          <ContentInfo icon="mdi-phone">
            {{ user.phone }}
          </ContentInfo>

          <ContentInfo v-if="user.id.value" icon="mdi-card-account-details" data-testid="idContentInfo">
            {{ user.id.name }}: {{ user.id.value }}
          </ContentInfo>
        </div>
        <hr />
        <div class="content__url">
          <span>Copy user url to clipboard:</span>
          <UrlClipBoard />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import UrlClipBoard from "@/components/User/UrlClipBoard/index.vue";
import ContentInfo from "@/components/User/ContentInfo/index.vue";
import { clickOutside } from "@/directives";
import { Nullable, UserData } from "@/types/User";
import { mapGetters } from "vuex";
import { MetaInfo } from "vue-meta";

export default Vue.extend({
  metaInfo(): MetaInfo {
    const name = this.user?.name;
    return {
      title: name ? `${name.first} ${name.last}` : "User",
    };
  },

  components: {
    ContentInfo,
    UrlClipBoard,
  },

  directives: {
    clickOutside,
  },

  data: () => ({
    user: null as Nullable<UserData>,
  }),

  computed: mapGetters({
    users: "users/get",
  }),

  watch: {
    users: {
      immediate: true,
      handler(users: UserData[] | undefined) {
        Array.isArray(users) && this.getSpecificUser(users);
      },
    },
  },

  mounted() {
    // It's added a tailwind class "overflow-hidden" in the body element
    // to  avoid scroll when this component is shown.
    document.body.classList.add("overflow-hidden");
    this.$once("hook:beforeDestroy", () => {
      document.body.classList.remove("overflow-hidden");
    });
  },

  methods: {
    getSpecificUser(users: UserData[]) {
      const userFilteredByUsername = users.filter((user: UserData) => {
        return user.login.username === this.$route.params.username;
      });

      if (!userFilteredByUsername.length) {
        this.$store
          .dispatch("alert/set", {
            theme: "fail",
            title: "The user does not exist",
            description: `The user which you tried to find don't exist
                          or the username is wrong, checkout and try again!`,
          })
          .then(this.goToUsers);
        return;
      }

      this.user = userFilteredByUsername[0];
    },

    goToUsers() {
      this.$router.push({ name: "users", query: this.$route.query });
    },
  },
});
</script>
<style lang="postcss" scoped>
.modal {
  @apply bg-white shadow-xl fixed left-2/4 top-2/4 transform -translate-x-2/4 -translate-y-2/4 px-5 md:px-10 py-2 md:py-8;

  outline: rgba(48, 48, 48, 0.418) solid 999999px;
}

@screen md {
  .modal {
    max-width: 900px;
  }
}

.modal__header {
  @apply flex justify-end;
}

.modal__header >>> button {
  @apply text-light-onSurfacePrimary p-2 flex justify-center items-center hover:bg-gray-100 rounded-full;
}

.modal__user {
  @apply relative;
}

.user__content {
  @apply mt-12 md:mt-24 text-light-onSurfacePrimary flex flex-col justify-center items-center;
}

.user__content h1 {
  @apply text-3xl font-semibold;
}

.content__andress {
  @apply flex flex-col justify-center items-center;
}

.content__andress h2 {
  @apply mt-2 text-center;
}

.content__andress h2,
h3 {
  @apply text-lg;
}

.content__infos {
  @apply flex md:flex-wrap md:flex-row flex-col justify-center items-center;
}

.content__url {
  @apply flex flex-col justify-center items-center w-full mt-1 md:mt-5 font-semibold;
}

.modal__user hr {
  @apply bg-gray-200 my-2 md:my-5 w-3/5;
}

.user__avatar {
  @apply absolute -top-28 left-2/4 transform -translate-x-2/4;
}
</style>
