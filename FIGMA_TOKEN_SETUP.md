# 🔑 Настройка Figma Access Token для Code Connect

## ❌ Проблема с текущим токеном

Ваш токен `figd_AIsrCrnOG3EDGIjELOGkxpekvciqSg8CWXRg7z1T` имеет недостаточные права:

```
403 Invalid scope(s): Please ensure that you have selected both the 
File Read scope and the Code Connect Write scope when generating the token.
```

## ✅ Как создать правильный токен

### 1. Откройте Figma Settings
- Перейдите в **Figma** → **Settings** → **Account**
- Найдите раздел **"Personal access tokens"**

### 2. Создайте новый токен
- Нажмите **"Create new token"**
- Дайте токену понятное имя: `"Code Connect - Reluna UI"`

### 3. ⚠️ ВАЖНО: Выберите правильные scope'ы
Обязательно отметьте **ОБА** scope'а:
- ✅ **File Read** - для чтения данных компонентов
- ✅ **Code Connect Write** - для записи Code Connect связей

### 4. Скопируйте новый токен
- Сохраните токен в безопасном месте
- Токен будет показан только один раз!

## 🚀 Использование нового токена

```bash
# Установите новый токен
export FIGMA_ACCESS_TOKEN="your_new_token_here"

# Или добавьте в .env файл:
echo "FIGMA_ACCESS_TOKEN=your_new_token_here" >> .env

# Создайте Code Connect из реального компонента
npx figma connect create "https://www.figma.com/design/EQEAUMKv2qzUnwp4l9oj0K?node-id=2-674"

# Опубликуйте связи
npm run figma:publish
```

## 📋 Что уже готово

✅ **Инфраструктура настроена**:
- Figma Code Connect установлен
- Конфигурация `figma.config.json` работает
- 4 компонента с 7 вариантами готовы
- Все файлы корректно парсятся

✅ **Файлы обновлены**:
- Все плейсхолдеры заменены на реальный File ID
- Node ID настроены для тестирования
- Структура Code Connect файлов корректна

## 🎯 После получения правильного токена

1. **Найдите реальные компоненты** в вашем Figma файле
2. **Получите их Node ID** (правый клик → Copy link)
3. **Обновите Code Connect файлы** с правильными Node ID
4. **Опубликуйте связи**: `npm run figma:publish`

## 🔍 Как найти правильные Node ID

1. Откройте ваш Figma файл
2. Найдите компонент Button в библиотеке компонентов
3. Правый клик → **"Copy link"**
4. Из ссылки извлеките Node ID (часть после `node-id=`)
5. Обновите соответствующий `.figma.tsx` файл

---

**После создания токена с правильными scope'ами, Code Connect заработает полностью! 🚀** 