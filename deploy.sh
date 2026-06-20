#!/bin/bash
# ============================================
# 部署脚本：将 Next.js 静态站点部署到 GitHub Pages
# 用法: bash deploy.sh
# ============================================

set -e

TARGET_REPO="https://github.com/Asuka01124/Asuka01124.github.io.git"
TARGET_BRANCH="gh-pages"
BUILD_DIR="out"
TEMP_DIR="/tmp/nim-gh-pages-deploy"
rm -rf "$TEMP_DIR"

echo "📦 Step 1: 构建静态文件..."
npm run build

echo ""
echo "📂 Step 2: 准备目标分支..."
if git clone --depth 1 --branch "$TARGET_BRANCH" "$TARGET_REPO" "$TEMP_DIR" 2>/dev/null; then
  echo "   已克隆现有 $TARGET_BRANCH 分支"
else
  echo "   $TARGET_BRANCH 分支不存在，初始化新仓库..."
  cd "$TEMP_DIR"
  git init
  git checkout -b "$TARGET_BRANCH"
  git remote add origin "$TARGET_REPO"
  cd "$OLDPWD"
fi

echo ""
echo "📋 Step 3: 清空旧文件，复制新文件..."
cd "$TEMP_DIR"
# 备份 README.md
cp README.md /tmp/readme-backup.md 2>/dev/null || true
# 用 git 方式清空所有文件（不破坏 .git）
git rm -rf . 2>/dev/null || true
git clean -fxd 2>/dev/null || true
# 复制构建产物
cp -r "$OLDPWD/$BUILD_DIR"/* .
touch .nojekyll
# 恢复 README.md
cp /tmp/readme-backup.md README.md 2>/dev/null || true

echo ""
echo "📝 Step 4: 提交并推送..."
git add -A
git commit -m "🚀 Deploy: $(date '+%Y-%m-%d %H:%M:%S')" || echo "没有新改动，跳过提交"
git push -u origin "$TARGET_BRANCH" 2>/dev/null || git push origin "$TARGET_BRANCH"

echo ""
echo "🧹 Step 5: 清理临时文件..."
cd "$OLDPWD"
rm -rf "$TEMP_DIR"

echo ""
echo "✅ 部署完成！稍等 1-2 分钟后访问 https://asuka01124.github.io/"
