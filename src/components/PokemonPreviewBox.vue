<script setup lang="ts">
import type { TUrl } from '@/models/global';
import type { ComputedRef, computed } from 'vue';

interface IProp {
  image: TUrl,
  unsetBorder?: boolean,
}
const props = defineProps<IProp>();

const ImageBase: string = 'raw.githubusercontent.com';
const ImageEmpty: string = '@/assets/images/Empty.png';

const preformImage = (image: TUrl): string | TUrl => {
  if (image) {
    if (image.includes(ImageBase)) {
      return image;
    } else {
      return ImageEmpty;
    }
  } else {
    return ImageEmpty;
  }
};

const preformedImage = preformImage(props.image);
</script>

<template>
  <div class="pokemon-preview-wrap">
    <div
      class="pokemon-preview"
      :class="{ 'unset-border': unsetBorder }"
    >
      <img
        v-if="preformedImage === ImageEmpty"
        src="@/assets/images/Empty.png"
        alt="pokemon-preview"
      />
      <img
        v-else
        :src="preformedImage"
        alt="pokemon-preview"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.pokemon-preview {
  width: 100px;
  height: 100px;

  border: 1px solid var(--primary-color);
  border-radius: 7px;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
}

.unset-border {
  border: unset;
}
</style>