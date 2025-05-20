<template>
  <div class="border-b border-muted">
    <UContainer class="xl:border-r xl:border-l border-muted !px-5 lg:!px-8 py-12">
      <UAccordion v-model="activeItemValue" :items="localizedItems" />
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui';
import { ref, computed } from 'vue';
import { useI18n } from '#imports';

const { t } = useI18n();

const activeItemValue = ref('0'); 

const localizedItems = computed<AccordionItem[]>(() => [
  {
    label: t('accordion.whatIsUx.label'),
    content: t('accordion.whatIsUx.content'),
  },
  {
    label: t('accordion.isWordpressOld.label'),
    content: t('accordion.isWordpressOld.content')
  },
  {
    label: t('accordion.whatCanAiDo.label'),
    content: t('accordion.whatCanAiDo.content')
  },
  {
    label: t('accordion.myProjectApproach.label'),
    content: t('accordion.myProjectApproach.content')
  },
  {
    label: t('accordion.websiteCosts.label'),
    content: t('accordion.websiteCosts.content')
  },
]);
</script>