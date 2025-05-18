<template>
    <div class="mb-3">
      <div class="flex gap-2 mb-3 items-center">
        <UBadge size="md" color="neutral" variant="soft">{{ dateRange }}</UBadge>
        <p class="text-muted text-sm">
          {{ institution }}
        </p>
      </div>
      <h5>
        {{ title }}
      </h5>
      <p class="text-muted max-w-lg mt-2">
        {{ description }}
      </p>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps({
    dateRange: {
      type: String,
      required: true
    },
    institution: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false, // Make description optional if some entries might not have one
      default: ''
    }
  })
  </script>