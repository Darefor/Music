import { useState, useEffect } from "react";

const SearchableInput = ({ value, options, onSelect }) => {
  const [query, setQuery] = useState(""); // Текст, який вводить користувач
  const [filteredOptions, setFilteredOptions] = useState(options); // Відфільтровані варіанти
  const [selectedItems, setSelectedItems] = useState([]); // Обрані елементи
  const [isOpen, setIsOpen] = useState(false); // Стан для контролю відкриття списку
  // console.log( selectedItems)



  // Фільтрація варіантів на основі введеного тексту
  useEffect(() => {
    if (query === " ") {
      setFilteredOptions(options); // Показуємо всі варіанти, якщо поле порожнє
    } else {
      setFilteredOptions(
        (options || []).filter((option) =>
          option?.title?.toLowerCase().includes(query.toLowerCase())
        )
      );
      
    }
  }, [query, options]); // Зміна значення запиту або опцій призводить до фільтрації

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleOptionClick = (item) => {
    setSelectedItems([...selectedItems, item]);
    setQuery(""); // Очищаємо поле після вибору
    setIsOpen(false); // Закриваємо список після вибору
    onSelect(item); // Викликаємо функцію onSelect при виборі
  };

  const handleRemoveItem = (itemToRemove) => {
    setSelectedItems(selectedItems.filter((item) => item !== itemToRemove));
  };

  const handleFocus = () => {
    setIsOpen(true); // Відкриваємо список при фокусі на поле
  };

  const handleBlur = () => {
    // Закриваємо список, коли поле втрачає фокус
    setTimeout(() => setIsOpen(false), 100); // Додаємо таймер, щоб списки не зникали миттєво
  };

  return (
    <div className="relative w-full">
      <label className="md:text-lg">Music: (optional): </label>
      {/* Поле вводу */}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={handleFocus} // Викликається при натисканні на поле
        onBlur={handleBlur} // Викликається при втраті фокусу
        placeholder="Search music"
        className="w-full px-3 py-2 border rounded-lg"
      />

      {/* Список варіантів */}
      {isOpen && query && filteredOptions.length > 0 && (
        <div className="absolute top-full max-h-40 overflow-y-auto left-0 w-full bg-white border mt-1 rounded-lg shadow-lg z-10">
          {filteredOptions.map((option) => (
            <div
              key={option._id}
              className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option.title}
            </div>
          ))}
        </div>
      )}

      {/* Список обраних елементів */}
      <div className="mt-2 flex flex-wrap">
        {selectedItems.map((item) => (
          <span
            key={item._id}
            className="bg-blue-500 text-white px-2 py-1 rounded-full mr-2 mb-2"
          >
            {item.title}
            <button
              type="button"
              onClick={() => handleRemoveItem(item)}
              className="ml-2 text-sm text-white"
            >
              x
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SearchableInput;
