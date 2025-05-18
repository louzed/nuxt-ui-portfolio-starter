<template>
  <canvas ref="canvasRef" class="particle-canvas"/>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

// --- Type Definitions ---
interface IParticle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  canvasWidth: number;
  canvasHeight: number;
  reset: (newWidth?: number, newHeight?: number) => void;
  update: () => void;
  updateDimensions: (newWidth: number, newHeight: number) => void;
  draw: (context: CanvasRenderingContext2D) => void;
}

// --- Refs and Variables ---
const canvasRef: Ref<HTMLCanvasElement | null> = ref(null);
let ctx: CanvasRenderingContext2D | null = null;
const particles: Particle[] = []; // Use the Particle class type
let animationFrameId: number | null = null;
let resizeTimeout: number | null = null; // Or NodeJS.Timeout if using Node types, number for browser


// --- Configuration ---
const particleDensity: number = 0.5; // Particles per 10,000 pixels
const particleColor: string = '#05df72';
const minParticleSize: number = 0.1;
const maxParticleSize: number = 1;
const minSpeedY: number = 0.1;
const maxSpeedY: number = 0.5;
const resizeDebounceTime: number = 150; // ms

// --- Utility Functions ---
// Simple debounce function
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: number | undefined; // Or NodeJS.Timeout if using Node types

  return function executedFunction(...args: Parameters<T>): void {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = window.setTimeout(later, wait); // window.setTimeout returns a number
  };
}

// --- Particle Class ---
class Particle implements IParticle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  canvasWidth: number;
  canvasHeight: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = 0; // Initialize with default values
    this.y = 0;
    this.radius = 0;
    this.speedY = 0;
    this.reset();
  }

  reset(newWidth: number = this.canvasWidth, newHeight: number = this.canvasHeight): void {
    this.canvasWidth = newWidth;
    this.canvasHeight = newHeight;
    this.x = Math.random() * this.canvasWidth;
    this.y = this.canvasHeight + Math.random() * (this.canvasHeight * 0.5);
    this.radius = Math.random() * (maxParticleSize - minParticleSize) + minParticleSize;
    this.speedY = Math.random() * (maxSpeedY - minSpeedY) + minSpeedY;
  }

  update(): void {
    this.y -= this.speedY;
    if (this.y + this.radius < 0) {
      this.reset(this.canvasWidth, this.canvasHeight);
    }
  }

  updateDimensions(newWidth: number, newHeight: number): void {
    // Check if a reset is more appropriate or if positions need explicit adjustment
    const oldCanvasWidth = this.canvasWidth;
    // const oldCanvasHeight = this.canvasHeight; // Not used in this logic

    this.canvasWidth = newWidth;
    this.canvasHeight = newHeight;

    // Adjust x position proportionally if it's important to maintain relative position
    // this.x = (this.x / oldCanvasWidth) * newWidth;
    // Or simply clamp
    this.x = Math.min(this.x, newWidth);

    // If a particle is now off-screen due to height reduction,
    // it might be better to reset it or adjust its y position.
    // The current logic has particles reset when they go off the *top*
    // and start from the bottom. Resizing might make some appear suddenly.
    // For this conversion, I'm keeping it close to original logic.
    // A full reset might be cleaner on resize for y-position:
    // if (this.y > newHeight) this.reset(newWidth, newHeight);
  }

  draw(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = particleColor;
    context.fill();
    context.closePath();
  }
}

// --- Canvas Logic ---
const calculateParticleCount = (width: number, height: number): number => {
  const area = width * height;
  return Math.max(10, Math.floor((area / 10000) * particleDensity));
};

const handleResize = (): void => {
  const canvas = canvasRef.value;
  if (!canvas || !ctx) return; // ctx check added for robustness

  const currentWidth = window.innerWidth;
  const currentHeight = window.innerHeight;

  canvas.width = currentWidth;
  canvas.height = currentHeight;

  const targetParticleCount = calculateParticleCount(currentWidth, currentHeight);
  const currentParticleCount = particles.length;

  if (targetParticleCount > currentParticleCount) {
    for (let i = 0; i < targetParticleCount - currentParticleCount; i++) {
      particles.push(new Particle(currentWidth, currentHeight));
    }
  } else if (targetParticleCount < currentParticleCount) {
    particles.splice(targetParticleCount);
  }

  particles.forEach(p => p.updateDimensions(currentWidth, currentHeight));

  // Restart animation if it was stopped (e.g., canvas was previously not available)
  // The original check `!animationFrameId` might restart animation too eagerly on every resize
  // if the animation had been stopped for other reasons.
  // However, keeping original logic for this conversion.
  if (!animationFrameId && particles.length > 0) { // Ensure there are particles to animate
    animateParticles();
  }
};

const debouncedResizeHandler = debounce(handleResize, resizeDebounceTime);

const initCanvas = (): void => {
  const canvas = canvasRef.value;
  if (!canvas) {
    console.error("Canvas element not found.");
    return;
  }

  const context = canvas.getContext('2d');
  if (!context) {
    console.error("Could not get 2D context");
    return;
  }
  ctx = context; // Assign to the broader scope ctx

  handleResize(); // Initial setup

  if (particles.length > 0) { // Only start animation if particles were created
    animateParticles();
  }

  window.addEventListener('resize', debouncedResizeHandler);
};

const animateParticles = (): void => {
  if (!ctx || !canvasRef.value) {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    return;
  }

  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);

  particles.forEach(particle => {
    particle.update();
    particle.draw(ctx as CanvasRenderingContext2D); // ctx is confirmed non-null here
  });

  animationFrameId = requestAnimationFrame(animateParticles);
};

// --- Lifecycle Hooks ---
onMounted(() => {
  nextTick(initCanvas);
});

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  window.removeEventListener('resize', debouncedResizeHandler);

  // Clear any pending timeout from the debounce function if you had a direct handle to it.
  // The current debounce implementation encapsulates its own timeout.
  // If `resizeTimeout` was meant to hold the ID from `debouncedResizeHandler`,
  // the debounce function would need to return it or be structured differently.
  // For now, `clearTimeout(resizeTimeout)` as in original might not do anything
  // if `resizeTimeout` is never assigned the debounce's internal timeout ID.
  if (resizeTimeout) { // Check if resizeTimeout has a value
      clearTimeout(resizeTimeout);
  }
});

</script>

<style scoped>
.particle-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Ensure it's in the background */
  pointer-events: none; /* Allow clicks to pass through */
  display: block; /* Avoid extra space below canvas */
}
</style>