export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            elements[elementName].append(...Object.values(indexes[elementName]).map(name => {
                const el = document.createElement('option');
                el.textContent = name;
                el.value = name;
                return el;
            }))
        })
    }

    const applyFiltering = (query, state, action) => {
        // код с обработкой очистки поля
        if (action && action.name === 'clear') {   // если кнопка clear. далее Если это кнопка с именем clear, тогда найдите input рядом с нашей кнопкой.                                                     
        const clearButton = action;              // сохраняем кнопку которая сработала                                                       
        const parentEl = clearButton.closest('.filter-wrapper');    // находим радительский элемент кнопки                                           
        const currentInput = parentEl.querySelector('input');       // в родителе находим <input>. Далее по заданию : Для найденного поля ввода сбросьте value и сделайте то же самое для соответствующего поля в state.                        
        if (currentInput) {
        currentInput.value = "";                                // очищаем поле <input>. Затем : Поле можно узнать через значение атрибута data-field кнопки.                                                                                                      
        const fieldName = clearButton.getAttribute('data-field');   // находим значение атрибута data-field кнопки и наконец ищем соответствующее поле в state и очищаем его :                                                                 
        if (fieldName in state) {
        state[fieldName] = "";                                  // и очищаем соответствующее поле в state                                                                 
        }}}
        // @todo: #4.5 — отфильтровать данные, используя компаратор
        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) { // ищем поля ввода в фильтре с непустыми данными
                    filter[`filter[${elements[key].name}]`] = elements[key].value; // чтобы сформировать в query вложенный объект фильтра
                }
            }
        })

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query; // если в фильтре что-то добавилось, применим к запросу
    }

    return {
        updateIndexes,
        applyFiltering
    }
}