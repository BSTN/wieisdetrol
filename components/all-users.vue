<template>
  <div class="all-users" :class="'type-' + type">
    <div v-if="users">
      <label
        >{{ users.length }} deelnemer{{
          users.length > 1 || users.length === 0 ? "s" : ""
        }}</label
      >
      <div class="users">
        <!-- <userAvatar v-for="user in users" :user="user" /> -->
        <div class="user" v-for="user in users">
          <UserIcon :user="user"></UserIcon>
          <div class="name">{{ user.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
const group = useGroupStore();
const user = useUserStore();
const users = ref([]);
const { users: groupUsers } = storeToRefs(group);
const { users: userUsers } = storeToRefs(user);

function setUsers() {
  users.value =
    groupUsers.value.length > userUsers.value.length
      ? groupUsers.value
      : userUsers.value;
}
watch(
  groupUsers,
  () => {
    setUsers();
  },
  {
    deep: true,
  }
);
watch(
  userUsers,
  () => {
    setUsers();
  },
  {
    deep: true,
  }
);
const { type } = defineProps({
  type: {
    type: [String, Boolean],
    default: () => "default",
  },
});
onMounted(() => {
  setUsers();
});
</script>
<style lang="less" scoped>
.all-users {
  text-align: center;
  // border-top: 1px solid var(--bc);
  max-width: 120vh;
  margin: 2rem auto;
  padding: 1rem 0;
}

label {
  margin-bottom: 2rem;
  font-weight: 500;
  text-transform: uppercase;
}

.users {
  .user {
    :deep(.user-icon) {
      width: 3rem;
      height: 3rem;
      border-radius: 0.5em;
    }
    .name {
      font-weight: 500;
      font-size: 0.8rem;
    }
  }
}
</style>
