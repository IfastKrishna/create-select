// hookSelect.js - Simple core logic
function createSelect({
  options = [],
  asyncLoadOptions,
  initialSelectedOptions = [],
  isMulti = false,
}) {
  let selectedOptions = [];
  let filteredOptions = options;
  let searchTerm = "";

  function setSearch(term) {
    searchTerm = term;
    if (asyncLoadOptions) {
      asyncLoadOptions(term).then((newOptions) => {
        filteredOptions = newOptions;
      });
    } else {
      filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(term.toLowerCase())
      );
    }
  }

  function toggleOption(option) {
    if (isMulti) {
      selectedOptions = selectedOptions.some(
        (sel) => sel.value === option.value
      )
        ? selectedOptions.filter((sel) => sel.value !== option.value)
        : [...selectedOptions, option];
    } else {
      selectedOptions = [option];
    }
  }

  return {
    get selected() {
      return selectedOptions;
    },
    get options() {
      return filteredOptions;
    },
    search: setSearch,
    select: toggleOption,
  };
}

export { createSelect };
