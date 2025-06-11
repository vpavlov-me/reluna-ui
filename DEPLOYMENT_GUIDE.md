# 🚀 Руководство по развертыванию Reluna UI

Это руководство поможет вам настроить автоматическое развертывание Storybook на GitHub Pages и публикацию пакета на npm.

## 📖 GitHub Pages (Storybook)

### 1. Включение GitHub Pages

1. Перейдите в настройки репозитория: `https://github.com/vpavlov-me/reluna-ui/settings`
2. Прокрутите до раздела **Pages**
3. В разделе **Source** выберите **GitHub Actions**
4. Сохраните настройки

### 2. Автоматическое развертывание

GitHub Action уже настроен в `.github/workflows/deploy-storybook.yml`. Он будет:

- ✅ Автоматически запускаться при push в main ветку
- ✅ Собирать Storybook
- ✅ Развертывать на GitHub Pages

**URL Storybook:** `https://vpavlov-me.github.io/reluna-ui`

### 3. Ручное развертывание

Если нужно развернуть вручную:

```bash
# Собрать Storybook
npm run build:storybook

# Файлы будут в папке storybook-static/
```

## 📦 NPM Публикация

### 1. Настройка npm токена

1. Зарегистрируйтесь на [npmjs.com](https://www.npmjs.com)
2. Создайте Access Token:
   - Перейдите в **Account Settings** → **Access Tokens**
   - Нажмите **Generate New Token** → **Classic Token**
   - Выберите **Automation** (для CI/CD)
   - Скопируйте токен

3. Добавьте токен в GitHub Secrets:
   - Перейдите в `https://github.com/vpavlov-me/reluna-ui/settings/secrets/actions`
   - Нажмите **New repository secret**
   - Name: `NPM_TOKEN`
   - Value: ваш npm токен

### 2. Автоматическая публикация

GitHub Action настроен в `.github/workflows/publish-npm.yml`. Он будет:

- ✅ Запускаться при создании GitHub Release
- ✅ Запускать тесты и проверки
- ✅ Собирать библиотеку
- ✅ Публиковать на npm

### 3. Процесс релиза

#### Вариант 1: Автоматический скрипт (рекомендуется)

```bash
# Запустить интерактивный скрипт публикации
./scripts/publish.sh
```

Скрипт выполнит:
- ✅ Проверку ветки и статуса git
- ✅ Запуск тестов и проверок
- ✅ Сборку проекта
- ✅ Обновление версии
- ✅ Создание git тега
- ✅ Push в GitHub

#### Вариант 2: Ручной процесс

```bash
# 1. Обновить версию
npm version patch  # или minor/major

# 2. Запустить тесты
npm run test:unit
npm run type-check
npm run lint

# 3. Собрать проект
npm run build:lib

# 4. Закоммитить и создать тег
git add .
git commit -m "chore: release v$(node -p "require('./package.json').version")"
git tag "v$(node -p "require('./package.json').version")"

# 5. Отправить в GitHub
git push origin main --tags
```

### 4. Создание GitHub Release

После push тега:

1. Перейдите на `https://github.com/vpavlov-me/reluna-ui/releases`
2. Нажмите **Create a new release**
3. Выберите созданный тег
4. Заполните описание релиза
5. Нажмите **Publish release**

GitHub Action автоматически опубликует пакет на npm!

### 5. Установка пакета

После публикации пакет будет доступен:

```bash
npm install @reluna/ui
```

```tsx
import { Button, Input, Card } from '@reluna/ui'
import '@reluna/ui/styles'

function App() {
  return (
    <Card>
      <Button variant="yellow">Click me</Button>
      <Input placeholder="Enter text" />
    </Card>
  )
}
```

## 🔧 Локальная разработка

### Запуск Storybook

```bash
npm run dev
# или
npm run storybook
```

### Сборка библиотеки

```bash
npm run build:lib
```

### Тестирование

```bash
npm run test:unit      # Юнит тесты
npm run test:a11y      # Тесты доступности
npm run test:e2e       # E2E тесты
npm run type-check     # Проверка типов
npm run lint           # Линтер
```

## 📊 Мониторинг

### GitHub Actions

Следите за статусом сборок:
- `https://github.com/vpavlov-me/reluna-ui/actions`

### npm статистика

Проверяйте статистику пакета:
- `https://www.npmjs.com/package/@reluna/ui`

### Bundle размер

Анализируйте размер бандла:

```bash
npm run analyze
```

## 🚨 Troubleshooting

### GitHub Pages не обновляется

1. Проверьте статус GitHub Action
2. Убедитесь, что Pages настроены на GitHub Actions
3. Проверьте права доступа в настройках репозитория

### npm публикация не работает

1. Проверьте NPM_TOKEN в GitHub Secrets
2. Убедитесь, что токен имеет права на публикацию
3. Проверьте, что пакет не существует с такой версией

### Ошибки сборки

1. Запустите локально: `npm run build:lib`
2. Проверьте TypeScript ошибки: `npm run type-check`
3. Исправьте линтер ошибки: `npm run lint:fix`

## 📝 Версионирование

Следуйте [Semantic Versioning](https://semver.org/):

- **patch** (0.1.0 → 0.1.1): Исправления багов
- **minor** (0.1.0 → 0.2.0): Новые функции (обратно совместимые)
- **major** (0.1.0 → 1.0.0): Критические изменения

## 🎯 Следующие шаги

1. ✅ Настройте GitHub Pages
2. ✅ Добавьте NPM_TOKEN в GitHub Secrets
3. ✅ Создайте первый релиз
4. ✅ Проверьте автоматическую публикацию
5. ✅ Поделитесь ссылкой на Storybook с командой! 