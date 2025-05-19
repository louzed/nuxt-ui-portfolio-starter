<template>
  <div>
    <UContainer class="!px-6 py-16 lg:py-32 max-w-4xl mx-auto">
      <h1>{{ $t('privacy.title') }}</h1>

      <h2>{{ $t('privacy.section1.title') }}</h2>
      <h3>{{ $t('privacy.section1.generalInfoTitle') }}</h3>
      <p>{{ $t('privacy.section1.generalInfoText') }}</p>

      <h3>{{ $t('privacy.section1.responsiblePartyTitle') }}</h3>
      <p class="mb-6">{{ $t('privacy.section1.responsiblePartyText') }}</p>
      <p class="mb-4"><strong>{{ $t('privacy.section1.responsibleEntityTitle') }}</strong></p>
      <address class="not-italic mb-6">
        {{ $t('imprint.name') }}<br> {{ $t('imprint.street') }}<br>
        {{ $t('imprint.cityZip') }}<br>
        {{ $t('imprint.emailLabel') }}: <a :href="'mailto:' + $t('imprint.emailAddress')">{{ $t('imprint.emailAddress') }}</a>
      </address>

      <h2>{{ $t('privacy.section2.title') }}</h2>
      <p>{{ $t('privacy.section2.intro') }}</p><br>
      <p>
        <strong>{{ $t('privacy.section2.provider.name') }}</strong><br>
        {{ $t('privacy.section2.provider.address1') }}<br>
        {{ $t('privacy.section2.provider.address2') }}<br><br>
        {{ $t('privacy.section2.provider.managingDirectorLabel') }}: {{ $t('privacy.section2.provider.managingDirectorName') }}<br>
      </p><br>
      <p>{{ $t('privacy.section2.projectInfo') }}</p>
      <p>
        {{ $t('privacy.section2.logfilesAndReferral') }}
        <a :href="$t('privacy.section2.privacyPolicyLinkUrl')" target="_blank" rel="noopener noreferrer">{{ $t('privacy.section2.privacyPolicyLinkText') }}</a>.
      </p>
      <p>{{ $t('privacy.section2.hostingPurpose') }}</p>
      <p>{{ $t('privacy.section2.hostingLegalBasisGDPR') }}</p>
      <p>{{ $t('privacy.section2.dpaText') }}</p>

      <h2>{{ $t('privacy.section3.title') }}</h2>
      <h3>{{ $t('privacy.section3.dataProtectionTitle') }}</h3>
      <p>{{ $t('privacy.section3.dataProtectionText1') }}</p>
      <p>{{ $t('privacy.section3.dataProtectionText2') }}</p>
      <p>{{ $t('privacy.section3.dataProtectionText3') }}</p>

      <h3>{{ $t('privacy.section3.sslEncryptionTitle') }}</h3>
      <p>{{ $t('privacy.section3.sslEncryptionText') }}</p>

      <h3>{{ $t('privacy.section3.noCookiesTitle') }}</h3>
      <p>{{ $t('privacy.section3.noCookiesText') }}</p>

      <h3>{{ $t('privacy.section3.noFormsCommentsTitle') }}</h3>
      <p>{{ $t('privacy.section3.noFormsCommentsText') }}</p>

      <h3>{{ $t('privacy.section3.noAnalyticsPluginsTitle') }}</h3>
      <p>{{ $t('privacy.section3.noAnalyticsPluginsText') }}</p>

      <h3>{{ $t('privacy.section3.serverLogFilesTitle') }}</h3>
      <p>{{ $t('privacy.section3.serverLogFilesText1') }}</p>
      <ul>
        <li>{{ $t('privacy.section3.serverLogFilesItem1') }}</li>
        <li>{{ $t('privacy.section3.serverLogFilesItem2') }}</li>
        <li>{{ $t('privacy.section3.serverLogFilesItem3') }}</li>
        <li>{{ $t('privacy.section3.serverLogFilesItem4') }}</li>
        <li>{{ $t('privacy.section3.serverLogFilesItem5') }}</li>
        <li>{{ $t('privacy.section3.serverLogFilesItem6') }}</li>
      </ul>
      <p>{{ $t('privacy.section3.serverLogFilesText2') }}</p>
      <p>{{ $t('privacy.section3.serverLogFilesText3') }} {{ $t('privacy.section3.hostingLegalBasisGDPRShort') }}. {{ $t('privacy.section3.serverLogFilesText4') }}</p>

      <h2>{{ $t('privacy.section4.title') }}</h2>
      <p>{{ $t('privacy.section4.rightsText1') }}</p>
      <p>{{ $t('privacy.section4.rightsText2') }}</p>
      <p>{{ $t('privacy.section4.rightsText3') }}</p>
      <p>{{ $t('privacy.section4.rightsText4') }}</p>

      <h3>{{ $t('privacy.section4.withdrawalConsentTitle') }}</h3>
      <p>{{ $t('privacy.section4.withdrawalConsentText') }}</p>

      <h3>{{ $t('privacy.section4.objectionRightTitle') }}</h3>
      <p>{{ $t('privacy.section4.objectionRightText1') }}</p>
      <p>{{ $t('privacy.section4.objectionRightText2') }}</p>

    </UContainer>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Privacy', // This could also be internationalized
  meta: [
    { name: 'description', content: 'Datenschutzerklärung für diese Webseite.' } // And this
  ]
})
</script>

<style scoped>
h2 {
  margin-top: 1.6em;
  margin-bottom: 1em;
}
h3 {
   margin-top: 1.2em;
   margin-bottom: 0.6em;
}
p {
  color: var(--ui-text-muted);
}
address {
  margin-bottom: 1em;
  color: var(--ui-text-muted);
}
ul {
  list-style: disc;
  margin-left: 1.5em;
}
li {
  color: var(--ui-text-muted);
}
</style>