document.addEventListener("DOMContentLoaded", () => {
  const hasTooltipElements = document.querySelectorAll(".has-tooltip");

  let activeTooltip = null;

  hasTooltipElements.forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault(); // Отменяем стандартное действие ссылки

      // Если уже есть активная подсказка, скрываем её
      if (activeTooltip) {
        activeTooltip.remove();
        activeTooltip = null;
      }

      // Если кликнули на ту же ссылку — выходим
      if (activeTooltip && activeTooltip.dataset.target === element) {
        return;
      }

      // Создаём элемент подсказки
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip tooltip_active";
      tooltip.textContent = element.title;

      // Определяем позицию элемента
      const { top, left, height } = element.getBoundingClientRect();
      tooltip.style.position = "absolute";
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top + height + 5}px`; // Чуть ниже ссылки

      // Добавляем подсказку в DOM
      document.body.appendChild(tooltip);

      // Сохраняем активную подсказку
      activeTooltip = tooltip;
    });
  });

  // Удаление активной подсказки при клике вне
  document.addEventListener("click", (event) => {
    if (activeTooltip && !event.target.closest(".has-tooltip")) {
      activeTooltip.remove();
      activeTooltip = null;
    }
  });
});