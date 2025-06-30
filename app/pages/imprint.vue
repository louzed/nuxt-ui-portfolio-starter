<template>
  <div>
    <UContainer class="!px-5 py-12 lg:py-24 max-w-4xl mx-auto">
      <h1>{{ $t('imprint.title') }}</h1>

      <address class="not-italic mb-6">
        {{ $t('imprint.name') }}<br>
        {{ $t('imprint.street') }}<br>
        {{ $t('imprint.cityZip') }}<br>
        {{ $t('imprint.country') }}
      </address>

      <h3>{{ $t('imprint.contactTitle') }}</h3>
      <p>
        {{ $t('imprint.phoneLabel') }}: {{ $t('imprint.phoneNumber') }}<br>
        {{ $t('imprint.emailLabel') }}: <a :href="'mailto:' + $t('imprint.emailAddress')">{{ $t('imprint.emailAddress') }}</a>
      </p>

      <h3>{{ $t('imprint.vatIdTitle') }}</h3>
      <p>
        {{ $t('imprint.vatIdText') }}:<br>
        {{ $t('imprint.vatIdNumber') }}
      </p>

      <h3>{{ $t('imprint.euDisputeResolutionTitle') }}</h3>
      <p>
        {{ $t('imprint.euDisputeResolutionText') }}
        <a :href="$t('imprint.euDisputeResolutionLinkUrl')" target="_blank" rel="noopener noreferrer">
          {{ $t('imprint.euDisputeResolutionLinkText') }}</a>
      </p>

      <h3>{{ $t('imprint.consumerDisputeResolutionTitle') }}</h3>
      <p>
        {{ $t('imprint.consumerDisputeResolutionText') }}
      </p>

    </UContainer>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Imprint', // This could also be internationalized if needed
  meta: [
    { name: 'description', content: 'Impressum dieser Webseite gemäß § 5 TMG.' } // And this
  ]
})
</script>

<style scoped>
h1 {
  margin-bottom: 1.2em;
}
h3 {
  margin-top: 1.2em;
  margin-bottom: 0.6em;
}
p {
  color: var(--ui-text-muted);
}
a {
  text-decoration: none;
  color: var(--ui-color-primary-400);
}
a:hover {
  text-decoration: underline;
  color: var(--ui-color-primary-500);
}
address {
  margin-top: 1em;
  margin-bottom: 1em;
  color: var(--ui-text-muted);
}
</style>