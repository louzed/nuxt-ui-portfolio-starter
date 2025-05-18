// composables/useScrollHandler.ts
import { nextTick } from 'vue';

export function useScrollHandler() {
  /**
   * Scrolls to a specific section on the page.
   * @param sectionId The ID of the element to scroll to.
   * @param smooth Whether the scroll should be smooth or instant.
   * @param offset An offset from the top (e.g., for fixed headers).
   */
  const scrollToSection = async (sectionId: string, smooth: boolean, offset: number = 0) => {
    // Wait for the DOM to be updated, ensuring the element is available.
    await nextTick();

    const element = document.getElementById(sectionId);

    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const targetPosition = elementPosition - offset;

      // Perform the scroll.
      window.scrollTo({
        top: targetPosition,
        behavior: smooth ? 'smooth' : 'auto',
      });
    } else {
      console.warn(`[useScrollHandler] Element with id '${sectionId}' not found.`);
    }
  };

  return {
    scrollToSection,
  };
}
