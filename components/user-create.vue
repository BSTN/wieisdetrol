<template>
  <div class="user-start" v-if="!user.loading">
    <div class="centered" v-if="user.userid && user.userid !== ''">
      <div>
        <UserIcon :user="user.user"></UserIcon>
        <div class="name">{{ user.name }}</div>
        <br /><br />
        <div class="wachten">
          Als het goed is zie je je icoontje verschijnen op het grote scherm. We
          wachten ondertussen even tot iedereen zover is...
        </div>
      </div>
    </div>
    <div class="" v-if="!user.userid">
      <div class="avatar" @click="generate()">
        <div class="icon" v-html="icon"></div>
        <div class="naam">{{ naam }}</div>
      </div>
      <div>
        <button class="big" @click="createUser()">
          Start
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { v4 as uuid } from "uuid";
import { nameByRace } from "fantasy-name-generator";
const user = useUserStore();
const naam = ref("");
const nameinput = ref(null);
const userid = ref("");
function generate() {
  naam.value = nameByRace("elf", {
    gender: Math.round(Math.random()) ? "male" : "female",
  });
  userid.value = uuid();
}
const icon = computed(() => {
  return user.tempIcon(userid.value);
});
watch(
  () => user.userid,
  () => {
    naam.value = "";
    generate();
  }
);

async function createUser() {
  console.log('create user');
  user.createUser({ name: naam.value, userid: userid.value }).catch(console.warn)
}

onMounted(() => {
  if (nameinput.value) {
    nameinput.value.focus();
  }
  generate();
});
</script>
<style lang="less" scoped>
.user-start {
  padding: 1em;
  text-align: center;
  // width: 16rem;
  max-width: 100%;
  margin: 0 auto;
  user-select: none;
  cursor: pointer;

  :deep(.mainuser.user-avatar .icon) {
    animation: heartbeat 0.8s linear 0.5s infinite forwards;

    // animation: rotate 2s linear 0.5s infinite forwards;
    @keyframes heartbeat {
      0% {
        transform: scale(1);
      }

      40% {
        transform: scale(1.05);
      }

      70% {
        transform: scale(1);
      }
    }

    @keyframes rotate {
      0% {
        transform: rotateZ(0deg);
      }

      100% {
        transform: rotateZ(360deg);
      }
    }
  }
}

:deep(.user-icon) {
  width: 12rem !important;
  height: 12rem !important;
  overflow: hidden;
  border-radius: 1em !important;
  border: 1rem solid var(--bg) !important;
}

.avatar {
  margin-bottom: 2em;
  padding: 0em 0 1em;
  text-align: center;

  .icon {
    width: 8rem;
    height: 8rem;
    margin: 0 auto 1rem;
    background: var(--bg);
    font-size: 0;
    border-radius: 1rem;

    :deep(svg) {
      margin: 0;
    }
  }

  .naam {
    font-size: 1em;
    font-weight: 500;
  }
}

.name {
  font-weight: 500;
  // background: var(--bg);
  width: 12rem;
  border-radius: 0.5rem;
  margin: 0.25rem auto;
  padding: 0.5em;
}

.wachten {
  width: 16em;
  max-width: 100%;
  margin: 0 auto;
}
</style>
