#!/bin/bash

echo "🚀 GitHub Setup Script for Reluna UI"
echo "======================================"

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Этот скрипт поможет вам настроить GitHub репозиторий${NC}"
echo ""

# Проверяем, что мы в git репозитории
if [ ! -d ".git" ]; then
    echo -e "${RED}❌ Ошибка: Это не git репозиторий${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Git репозиторий найден${NC}"

# Проверяем статус git
echo -e "${BLUE}📊 Статус git:${NC}"
git status --short

echo ""
echo -e "${YELLOW}📝 Пожалуйста, выполните следующие шаги:${NC}"
echo ""

echo "1️⃣  Перейдите на https://github.com/new"
echo "2️⃣  Создайте новый репозиторий с именем: reluna-ui"
echo "3️⃣  Описание: 🎨 Reluna UI - Modern React component library with Figma Code Connect integration"
echo "4️⃣  Выберите Public или Private"
echo "5️⃣  НЕ добавляйте README, .gitignore или license"
echo "6️⃣  Нажмите 'Create repository'"
echo ""

read -p "Введите ваш GitHub username: " username
echo ""

if [ -z "$username" ]; then
    echo -e "${RED}❌ Username не может быть пустым${NC}"
    exit 1
fi

REPO_URL="https://github.com/$username/reluna-ui.git"

echo -e "${BLUE}🔗 URL репозитория: $REPO_URL${NC}"
echo ""

read -p "Репозиторий создан на GitHub? (y/n): " created

if [ "$created" != "y" ] && [ "$created" != "Y" ]; then
    echo -e "${YELLOW}⏸️  Создайте репозиторий на GitHub и запустите скрипт снова${NC}"
    exit 0
fi

echo ""
echo -e "${BLUE}🚀 Настраиваем удаленный репозиторий...${NC}"

# Добавляем remote origin
if git remote get-url origin >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Remote origin уже существует, обновляем...${NC}"
    git remote set-url origin "$REPO_URL"
else
    git remote add origin "$REPO_URL"
fi

echo -e "${GREEN}✅ Remote origin настроен: $REPO_URL${NC}"

# Переименовываем ветку в main (если нужно)
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
    echo -e "${BLUE}🔄 Переименовываем ветку в main...${NC}"
    git branch -M main
fi

echo ""
echo -e "${BLUE}📤 Отправляем код на GitHub...${NC}"

# Пушим код
if git push -u origin main; then
    echo ""
    echo -e "${GREEN}🎉 Успешно! Ваш проект загружен на GitHub!${NC}"
    echo ""
    echo -e "${BLUE}🔗 Ссылки:${NC}"
    echo "   📁 Репозиторий: https://github.com/$username/reluna-ui"
    echo "   📚 Storybook: http://localhost:6006"
    echo ""
    echo -e "${YELLOW}💡 Следующие шаги:${NC}"
    echo "   1. Настройте GitHub Pages для Storybook"
    echo "   2. Добавьте GitHub Actions для CI/CD"
    echo "   3. Настройте Figma Code Connect"
    echo "   4. Опубликуйте на npm (опционально)"
else
    echo ""
    echo -e "${RED}❌ Ошибка при отправке кода${NC}"
    echo -e "${YELLOW}💡 Возможные причины:${NC}"
    echo "   - Репозиторий не создан на GitHub"
    echo "   - Неправильный username"
    echo "   - Проблемы с аутентификацией"
    echo ""
    echo -e "${BLUE}🔧 Попробуйте выполнить команды вручную:${NC}"
    echo "   git remote add origin $REPO_URL"
    echo "   git branch -M main"
    echo "   git push -u origin main"
fi

echo ""
echo -e "${BLUE}📊 Финальная статистика проекта:${NC}"
echo "   📁 Файлов: $(find . -type f | wc -l | tr -d ' ')"
echo "   📝 Строк кода: $(find src -name "*.tsx" -o -name "*.ts" | xargs wc -l | tail -1 | awk '{print $1}')"
echo "   🧩 Компонентов: $(find src/components/ui -maxdepth 1 -type d | wc -l | tr -d ' ')"
echo "   📚 Stories: $(find stories -name "*.stories.tsx" | wc -l | tr -d ' ')" 