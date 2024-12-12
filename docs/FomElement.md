# FormElement

## Атрибуты

- **handler** (строка): URL-адрес или имя обработчика для отправки формы.
- По умолчанию: /test.
- **reusable** (логический): Если установлен, форма может быть отправлена повторно.
- **reset-after-submit** (логический): Если установлен, поля формы сбрасываются после успешной отправки.
- **success-title** (строка): Заголовок сообщения об успешной отправке.
- **success-message** (строка): Текст сообщения об успешной отправке.
- **error-message** (строка): Сообщение, отображаемое при ошибке отправки.

## Методы

#### `checkValidity()`

Проверяет валидность всех полей формы. Если все поля валидны, активирует кнопку отправки формы.

Пример:

```ts
const formElement = document.querySelector('e-form')
formElement.checkValidity()
```

#### `result`

Геттер, возвращающий результат последней отправки формы.

Пример:

```ts
const formElement = document.querySelector('e-form')
console.log(formElement.result)
```

## События

`FormElement` генерирует следующие события:

- **formSubmit**: Событие отправки формы. Вызывается перед отправкой.

  Пример:

  ```ts
  document.querySelector('e-form').addEventListener('formSubmit', (event) => {
    console.log('Форма отправлена', event)
  })
  ```

- **formSuccess**: Событие успешной отправки формы.

  Пример:

  ```ts
  document.querySelector('e-form').addEventListener('formSuccess', (event) => {
    console.log('Форма успешно отправлена', event)
  })
  ```

- **formError**: Событие ошибки при отправке формы.

  Пример:

  ```ts
  document.querySelector('e-form').addEventListener('formError', (event) => {
    console.error('Ошибка при отправке формы', event)
  })
  ```
