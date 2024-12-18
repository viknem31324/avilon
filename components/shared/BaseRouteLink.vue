<template>
  <div v-if="!href" @click="onClick">
    <slot />
  </div>
  <NuxtLink
    v-else-if="isRoute"
    :to="href"
    :rel="rel"
    @click="onClick"
  >
    <slot />
  </NuxtLink>
  <a
    v-else
    :href="href"
    :rel="rel || (isExternalLink ? 'nofollow' : undefined)"
    :target="isExternalLink ? '_blank' : undefined"
    @click="onClick"
  >
    <slot />
  </a>
</template>

<script lang="ts" setup>
interface IRouteLink {
  href?: string;
  rel?: string;
}

const props = withDefaults(defineProps<IRouteLink>(), {
  href: '',
  rel: undefined,
});

const emits = defineEmits(['click']);

const isRoute = computed(() => {
  if (!props.href) {
    return;
  }

  return !/:/gi.test(props.href);
});

const isExternalLink = computed(() => checkIfExternalLink(props.href));

const checkIfExternalLink = (link: string) => {
  if (!link) {
    return false;
  }

  const regularExternalLink = new RegExp('^(?:[a-z+]+:)?//', 'i');
  return regularExternalLink.test(link);
};

const onClick = () => {
  emits('click');
};
</script>
