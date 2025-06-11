#!/bin/bash

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Reluna UI Publishing Script${NC}"
echo "=================================="

# Проверяем, что мы на main ветке
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
    echo -e "${RED}❌ Ошибка: Вы должны быть на main ветке для публикации${NC}"
    exit 1
fi

# Проверяем, что нет незакоммиченных изменений
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${RED}❌ Ошибка: Есть незакоммиченные изменения${NC}"
    git status
    exit 1
fi

# Получаем текущую версию
current_version=$(node -p "require('./package.json').version")
echo -e "${BLUE}📦 Текущая версия: ${current_version}${NC}"

# Спрашиваем тип релиза
echo -e "${YELLOW}Выберите тип релиза:${NC}"
echo "1) patch (0.1.0 -> 0.1.1)"
echo "2) minor (0.1.0 -> 0.2.0)"
echo "3) major (0.1.0 -> 1.0.0)"
echo "4) custom version"

read -p "Введите номер (1-4): " release_type

case $release_type in
    1)
        version_type="patch"
        ;;
    2)
        version_type="minor"
        ;;
    3)
        version_type="major"
        ;;
    4)
        read -p "Введите версию (например, 1.0.0): " custom_version
        version_type="$custom_version"
        ;;
    *)
        echo -e "${RED}❌ Неверный выбор${NC}"
        exit 1
        ;;
esac

echo -e "${BLUE}🔄 Обновляем зависимости...${NC}"
npm ci

echo -e "${BLUE}🧪 Запускаем тесты...${NC}"
npm run test:unit
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Тесты не прошли${NC}"
    exit 1
fi

echo -e "${BLUE}🔍 Проверяем типы...${NC}"
npm run type-check
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Ошибки типов${NC}"
    exit 1
fi

echo -e "${BLUE}🧹 Проверяем линтер...${NC}"
npm run lint
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Ошибки линтера${NC}"
    exit 1
fi

echo -e "${BLUE}🏗️ Собираем проект...${NC}"
npm run build:lib
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Ошибка сборки${NC}"
    exit 1
fi

# Обновляем версию
if [ "$release_type" = "4" ]; then
    npm version "$custom_version" --no-git-tag-version
else
    npm version "$version_type" --no-git-tag-version
fi

new_version=$(node -p "require('./package.json').version")
echo -e "${GREEN}✅ Версия обновлена до: ${new_version}${NC}"

# Коммитим изменения
git add package.json package-lock.json
git commit -m "chore: bump version to $new_version"

# Создаем тег
git tag "v$new_version"

echo -e "${YELLOW}📤 Пушим изменения в GitHub...${NC}"
git push origin main
git push origin "v$new_version"

echo -e "${GREEN}✅ Готово!${NC}"
echo -e "${BLUE}📋 Следующие шаги:${NC}"
echo "1. Перейдите на https://github.com/vpavlov-me/reluna-ui/releases"
echo "2. Создайте новый релиз с тегом v$new_version"
echo "3. GitHub Action автоматически опубликует пакет на npm"
echo ""
echo -e "${BLUE}🌐 После публикации пакет будет доступен:${NC}"
echo "npm install @reluna/ui@$new_version" 