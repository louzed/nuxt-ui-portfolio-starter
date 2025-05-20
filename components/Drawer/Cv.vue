<template>
  <UDrawer v-model:open="open" should-scale-background>
    <UButton :label="t('cv.drawer.buttonLabel')" icon="i-mdi-resume" variant="outline" size="lg" @click="open = true" />

    <template #header>
      <div class="flex flex-grow max-w-4xl mx-auto justify-between items-center">
        <p class="text-muted text-lg pt-1">{{ t('cv.drawer.headerTitle') }}</p>
        <UButton color="neutral" variant="ghost" icon="i-lucide-x" size="lg" @click="open = false" />
      </div>
    </template>

    <template #body>
      <div class="flex w-full">
        <div class="lg:flex max-w-4xl w-full mx-auto">
          <div class="flex flex-col gap-8 lg:w-1/2 pt-8 lg:pb-4">
            <CvItem
              v-for="(item, index) in leftColumnItems"
              :key="'left-' + index"
              :date-range="item.dateRange"
              :institution="item.institution"
              :title="item.title"
              :description="item.description"
            />
          </div>
          <div class="flex flex-col gap-8 lg:w-1/2 pt-8 lg:pb-4">
              <CvItem
              v-for="(item, index) in rightColumnItems"
              :key="'right-' + index"
              :date-range="item.dateRange"
              :institution="item.institution"
              :title="item.title"
              :description="item.description"
            />
          </div>
        </div>
      </div>
    </template>
  </UDrawer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n'; // Or from '#imports'
// Make sure to import your CvItem component
import CvItem from '@/components/Drawer/CvItem.vue'; // Adjust path if necessary

const { t } = useI18n();
const open = ref(false);

// Base structure for CV items, pointing to translation keys
const baseCvItems = [
  { dateRange: '2007-2012', column: 'left',  keySuffix: '0' }, // Handelsassistent, KiK GmbH
  { dateRange: '2011-2014', column: 'left',  keySuffix: '1' }, // Teamleitung, KiK GmbH
  { dateRange: '2014-2017', column: 'left',  keySuffix: '2' }, // Abitur, Bayernkolleg Schweinfurt
  { dateRange: '2017-2019', column: 'right', keySuffix: '3' }, // Mensch-Computer-Systeme, Universität Würzburg
  { dateRange: '2021-2022', column: 'right', keySuffix: '4' }, // Weiterbildung UX Design, XDI
  { dateRange: 'seit 2022', column: 'right', keySuffix: '5' }  // UX & UI Designer, Freiberuflich
];

// Computed property to generate translated CV items
const translatedCvItems = computed(() => {
  return baseCvItems.map(item => ({
    dateRange: item.dateRange,
    institution: t(`cv.items.${item.keySuffix}.institution`),
    title: t(`cv.items.${item.keySuffix}.title`),
    description: t(`cv.items.${item.keySuffix}.description`),
    column: item.column
  }));
});

// Separate items into columns based on the translated items
const leftColumnItems = computed(() => translatedCvItems.value.filter(item => item.column === 'left'));
const rightColumnItems = computed(() => translatedCvItems.value.filter(item => item.column === 'right'));

</script>