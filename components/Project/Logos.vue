<template>
  <div ref="carousel" class="logo-carousel overflow-hidden whitespace-nowrap border-b border-muted py-24 lg:py-32">
    <div class="logo-track inline-flex">
      <img v-for="(logo, i) in logos" :key="i" :src="logo"
        class="h-6 lg:h-10 mx-4 lg:mx-8 opacity-60 hover:opacity-100 transition-opacity" >
      <img v-for="(logo, i) in logos" :key="'dup-' + i" :src="logo"
        class="h-6 lg:h-10 mx-4 lg:mx-8 opacity-60 hover:opacity-100 transition-opacity" >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const logos = [
  '/svg/client01.svg',
  '/svg/client02.svg',
  '/svg/client03.svg',
  '/svg/client04.svg',
  '/svg/client05.svg',
  '/svg/client06.svg',
  '/svg/client07.svg',
  '/svg/client08.svg',
]

const carousel = ref<HTMLElement | null>(null)
let rafId: number
let pos = 0 // float accumulator

// --- Speed Configuration ---
const BASE_SPEED = 0.5 // px/frame - Carousel's default speed
// MIN_CAROUSEL_SPEED is effectively BASE_SPEED when speeding up
const MAX_CAROUSEL_SPEED = 5.0 // Maximum speed for the carousel (adjust as needed)
const SCROLL_SPEED_SENSITIVITY = 2.0 // How much scroll speed affects carousel speed increase
const LERP_SMOOTHING_FACTOR = 0.1 // Lower is smoother but slower to react (0.0 to 1.0)
const SCROLL_END_RESET_DELAY = 50 // ms - Time after last scroll to reset to base speed
const MIN_SCROLL_VELOCITY_TO_REACT = 0.1 // Ignore tiny scroll jitters
// --- End Speed Configuration ---

const currentCarouselSpeed = ref(BASE_SPEED)
const targetCarouselSpeed = ref(BASE_SPEED)

let lastScrollY = 0
let lastScrollTime = 0
let scrollDetectionTimeoutId: number | null = null

// Linear interpolation function for smooth speed transitions
function lerp(start: number, end: number, amount: number): number {
  return start * (1 - amount) + end * amount
}

function step() {
  if (!carousel.value) return
  const el = carousel.value

  // Smoothly adjust current speed towards target speed
  currentCarouselSpeed.value = lerp(currentCarouselSpeed.value, targetCarouselSpeed.value, LERP_SMOOTHING_FACTOR)

  pos += currentCarouselSpeed.value
  const half = el.scrollWidth / 2

  // Wrap around
  if (pos >= half) pos -= half
  // Ensure pos doesn't go excessively negative if currentCarouselSpeed somehow becomes negative briefly during lerp
  // Though with current logic, targetCarouselSpeed should always be >= BASE_SPEED.
  if (pos < -half) pos += half; // A more robust wrap for negative pos, though less likely now.
                                // Standard wrap if speed is always positive:
  else if (pos < 0 && currentCarouselSpeed.value > 0) pos += half;


  el.scrollLeft = pos
  rafId = requestAnimationFrame(step)
}

function handleScroll() {
  const now = performance.now()
  const currentScrollY = window.scrollY
  const deltaTime = now - lastScrollTime
  const deltaScroll = currentScrollY - lastScrollY // We still need deltaScroll to know if there was any scroll

  if (scrollDetectionTimeoutId !== null) {
    clearTimeout(scrollDetectionTimeoutId)
  }

  // Only react if there's a noticeable scroll and time has passed
  if (deltaTime > 0 && deltaScroll !== 0) {
    const scrollVelocity = Math.abs(deltaScroll / deltaTime)

    if (scrollVelocity > MIN_SCROLL_VELOCITY_TO_REACT) {
      // Always speed up based on scroll velocity
      targetCarouselSpeed.value = BASE_SPEED + scrollVelocity * SCROLL_SPEED_SENSITIVITY
      // Clamp the target speed: ensure it's not less than base (it shouldn't be with this formula)
      // and not more than max.
      targetCarouselSpeed.value = Math.max(BASE_SPEED, Math.min(targetCarouselSpeed.value, MAX_CAROUSEL_SPEED))
    }
  }

  lastScrollY = currentScrollY < 0 ? 0 : currentScrollY
  lastScrollTime = now

  // Set a timeout to reset to base speed when scrolling stops
  scrollDetectionTimeoutId = window.setTimeout(() => {
    targetCarouselSpeed.value = BASE_SPEED
  }, SCROLL_END_RESET_DELAY)
}

onMounted(() => {
  lastScrollY = window.scrollY
  lastScrollTime = performance.now()
  rafId = requestAnimationFrame(step)
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('scroll', handleScroll)
  if (scrollDetectionTimeoutId !== null) {
    clearTimeout(scrollDetectionTimeoutId)
  }
})

</script>

<style scoped>
.logo-track>* {
  flex-shrink: 0;
}
</style>