<template>
    <div class="border-b border-muted">
        <UContainer class="py-16 lg:py-24 !px-5">
          <img src="/images/avatar.webp" alt="Markus Biereth" class="w-20 h-20 mx-auto mb-6 bg-muted rounded-full" />
          <p class="mx-auto text-center mb-2 text-lg text-muted">
            {{ t('testimonial.client') }}
          </p>
          <h3 class="max-w-5xl mx-auto text-center">
            {{ t('testimonial.message') }}
          </h3>
        </UContainer>
      </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>