<template>
  <div>
    <div v-if="name === 'admin'" class="system">
      <p class="text-center">{{ text }}</p>
      <hr />
    </div>
    <div v-else class="wrapper">
      <div class="message" :class="{ owner }">
        <small>
          <strong>{{ name }}</strong>
        </small>
        <p>{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    text: String,
    owner: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.system {
  margin-bottom: 1rem;

  p {
    margin-bottom: 1rem;
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
}

.message {
  padding: 1rem;
  margin: 0 1rem 1rem;
  min-width: 15%;
  width: fit-content;
  max-width: 60%;
  box-shadow: 0 1px 0 0 rgba (50, 50, 50, 0.3);
  border-radius: 4px;
  background-color: #1976d2;

  p {
    margin-bottom: 0;
  }
}

.owner {
  background-color: #fff;
  color: #000;
  align-self: flex-end;
}
</style>
