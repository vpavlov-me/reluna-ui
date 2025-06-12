# 🧪 Тестирование Figma Code Connect

## ✅ Что уже протестировано

### 📋 Локальное тестирование
- ✅ Все Code Connect файлы корректно парсятся
- ✅ Конфигурация `figma.config.json` работает
- ✅ Реальные Figma ссылки успешно обработаны
- ✅ Dry-run тест прошел успешно

### 🔗 Обновленные ссылки
Файл `src/components/ui/button.figma.tsx` обновлен с реальными данными:
- **File ID**: `EQEAUMKv2qzUnwp4l9oj0K`
- **Node ID**: `2-674` (основной Button)
- **Node ID**: `2-675` (Icon Button)

## 🔑 Для полного тестирования нужен Figma Access Token

### Как получить токен:

1. **Откройте Figma** → Settings → Account
2. **Перейдите в раздел** "Personal access tokens"
3. **Создайте новый токен** с правами на чтение/запись
4. **Скопируйте токен**

### Способы использования токена:

#### Вариант 1: Переменная окружения
```bash
export FIGMA_ACCESS_TOKEN="your_token_here"
# Или добавьте в .env файл (рекомендуется):
echo "FIGMA_ACCESS_TOKEN=your_token_here" >> .env
npm run figma:publish
```

#### Вариант 2: Параметр командной строки
```bash
npx figma connect publish --token "your_token_here"
```

#### Вариант 3: Интерактивная аутентификация
```bash
npx figma connect auth
# Следуйте инструкциям в браузере
```

## 🚀 Команды для тестирования

### 1. Проверка парсинга (работает без токена)
```bash
npx figma connect parse --config figma.config.json
```

### 2. Dry-run тест (работает без токена)
```bash
npx figma connect publish --dry-run
```

### 3. Создание Code Connect из Figma URL (нужен токен)
```bash
npx figma connect create "https://www.figma.com/design/EQEAUMKv2qzUnwp4l9oj0K?node-id=2-674" --token "your_token"
```

### 4. Публикация связей (нужен токен)
```bash
npm run figma:publish
# или
npx figma connect publish --token "your_token"
```

### 5. Удаление связей (нужен токен)
```bash
npm run figma:unpublish
# или
npx figma connect unpublish --token "your_token"
```

## 📊 Результаты тестирования

| Тест | Статус | Описание |
|------|--------|----------|
| Парсинг файлов | ✅ | Все 4 компонента парсятся без ошибок |
| Конфигурация | ✅ | `figma.config.json` работает корректно |
| Реальные ссылки | ✅ | Button обновлен с реальными Figma URL |
| Dry-run | ✅ | Тест публикации прошел успешно |
| Аутентификация | ⏳ | Требует Figma Access Token |
| Публикация | ⏳ | Требует Figma Access Token |

## 🎯 Следующие шаги

1. **Получите Figma Access Token** (см. инструкцию выше)
2. **Аутентифицируйтесь**: `npx figma connect auth`
3. **Опубликуйте связи**: `npm run figma:publish`
4. **Проверьте в Figma** Dev Mode - должен появиться код компонента

## 🔧 Готовые файлы для тестирования

- `src/components/ui/button.figma.tsx` - с реальными Figma ссылками
- `src/components/ui/input.figma.tsx` - готов к обновлению ссылок
- `src/components/ui/card.figma.tsx` - готов к обновлению ссылок
- `src/components/ui/badge/Badge.figma.tsx` - готов к обновлению ссылок

## 📝 Обновление других компонентов

Для обновления остальных компонентов замените плейсхолдеры:

```bash
# Найти все файлы с плейсхолдерами
grep -r "FILE_ID" src/components/ui/

# Заменить в конкретном файле
sed -i '' 's/FILE_ID/EQEAUMKv2qzUnwp4l9oj0K/g' src/components/ui/input.figma.tsx
```

---

**Figma Code Connect готов к полному тестированию! 🚀** 