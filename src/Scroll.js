export function scrollToElement(targetId) {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    const offset = 80;
    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const adjustedPosition = elementPosition - offset;

    window.scrollTo({
      top: adjustedPosition,
      behavior: 'smooth',
    });
  }
}
