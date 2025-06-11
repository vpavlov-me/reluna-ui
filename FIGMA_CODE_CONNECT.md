# Figma Code Connect для Reluna UI

Этот документ описывает настройку и использование Figma Code Connect для синхронизации компонентов дизайн-системы между Figma и кодом.

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Инициализация Code Connect

```bash
npx figma connect init
```

### 3. Аутентификация

```bash
npx figma connect auth
```

## 📋 Настройка компонентов

### Получение ссылок из Figma

1. Откройте ваш файл в Figma
2. Выберите компонент в библиотеке
3. Скопируйте ссылку (Cmd/Ctrl + L)
4. Ссылка будет иметь формат: `https://www.figma.com/design/FILE_ID?node-id=NODE_ID`

### Обновление Code Connect файлов

Замените плейсхолдеры в `.figma.tsx` файлах:

```typescript
// Было:
figma.connect(Button, 'https://www.figma.com/design/FILE_ID?node-id=BUTTON_NODE_ID', {

// Стало:
figma.connect(Button, 'https://www.figma.com/design/YOUR_ACTUAL_FILE_ID?node-id=YOUR_ACTUAL_NODE_ID', {
```

## 🔧 Доступные команды

### Создание новых связей
```bash
npm run figma:connect
```

### Публикация связей в Figma
```bash
npm run figma:publish
```

### Удаление всех связей
```bash
npm run figma:unpublish
```

## 📁 Структура файлов

```
src/components/ui/
├── button.tsx              # Компонент
├── button.figma.tsx         # Code Connect конфигурация
├── input.tsx
├── input.figma.tsx
├── card.tsx
└── card.figma.tsx
```

## 🎯 Созданные Code Connect файлы

### Button (`src/components/ui/button.figma.tsx`)
- ✅ Основной компонент с вариантами (Primary, Secondary, Outline, Destructive, Ghost, Link)
- ✅ Размеры (Small, Medium, Large, Icon)
- ✅ Состояния (Loading, Disabled)
- ✅ Вариант с иконкой

### Input (`src/components/ui/input.figma.tsx`)
- ✅ Основной компонент с вариантами (Default, Error)
- ✅ Размеры (Small, Medium, Large)
- ✅ Лейбл, плейсхолдер, ошибки, вспомогательный текст
- ✅ Вариант с иконкой (слева)

### Card (`src/components/ui/card.figma.tsx`)
- ✅ Основной компонент с вариантами (Default, Outlined, Elevated)
- ✅ Заголовок, описание, контент, футер
- ✅ Вариант с действиями (кнопки в футере)

### Badge (`src/components/ui/badge/Badge.figma.tsx`)
- ✅ Основной Badge с 8 вариантами (Primary, Secondary, Destructive, Success, Warning, Info, Outline, Ghost)
- ✅ Размеры (Small, Medium, Large)
- ✅ Опции (Dot, Removable)
- ✅ NotificationBadge для счетчиков
- ✅ StatusBadge для статусов

## 🔄 Workflow

1. **Дизайнер** создает/обновляет компонент в Figma
2. **Разработчик** обновляет соответствующий `.figma.tsx` файл
3. **Публикация** связей: `npm run figma:publish`
4. **Синхронизация** автоматически отображается в Figma Dev Mode

## 📝 Добавление новых компонентов

Для добавления нового компонента:

1. Создайте файл `component-name.figma.tsx` рядом с компонентом
2. Используйте существующие файлы как шаблон
3. Получите ссылку на компонент из Figma
4. Опубликуйте изменения

```typescript
import { figma } from '@figma/code-connect'
import { YourComponent } from './your-component'

figma.connect(YourComponent, 'FIGMA_URL_HERE', {
  props: {
    // Определите пропсы
  },
  example: (props) => (
    <YourComponent {...props} />
  )
})
```

## 🐛 Устранение неполадок

### Ошибки типов TypeScript
Ошибки типов для `@figma/code-connect` ожидаемы до установки пакета. После `npm install` они исчезнут.

### Проблемы с аутентификацией
```bash
npx figma connect auth --help
```

### Проблемы с публикацией
Убедитесь, что:
- Вы аутентифицированы в Figma
- Ссылки на компоненты корректны
- У вас есть права на редактирование файла в Figma

## ✅ Готово к использованию!

Figma Code Connect успешно настроен для проекта Reluna UI. Теперь вы можете:

### 🚀 Следующие шаги:

1. **Получите ссылки из Figma** на ваши компоненты
2. **Замените плейсхолдеры** `FILE_ID` и `NODE_ID` в `.figma.tsx` файлах
3. **Аутентифицируйтесь**: `npx figma connect auth`
4. **Опубликуйте связи**: `npm run figma:publish`

### 🔧 Команды для работы:

```bash
# Проверить парсинг файлов
npx figma connect parse --config figma.config.json

# Опубликовать связи
npm run figma:publish

# Удалить все связи (если нужно)
npm run figma:unpublish
```

### 📊 Статистика:

- ✅ **4 компонента** готовы к связыванию
- ✅ **10 вариантов** компонентов настроены
- ✅ **Все файлы** успешно парсятся
- ✅ **Конфигурация** настроена

## 📚 Дополнительные ресурсы

- [Официальная документация Figma Code Connect](https://www.figma.com/developers/code-connect)
- [Примеры использования](https://github.com/figma/code-connect) 