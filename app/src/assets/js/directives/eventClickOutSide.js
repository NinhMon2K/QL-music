export default function directive(app) {
  // you can name the directive whatever you want. -> click-outside
  app.directive("click-outside", {
    beforeMount(el, binding) {
      el.clickOutsideEvent = (evt) => {
        let con = el.closest(".filter-dropdown");

        evt.stopPropagation();
        if (!(el === evt.target || el.contains(evt.target))) {
          binding.value(evt, el);
        }
      };
      window.requestAnimationFrame(() => {
        document.addEventListener("click", el.clickOutsideEvent);
      });
    },
    unmounted(el) {
      document.removeEventListener("click", el.clickOutsideEvent);
    },
  });
}
