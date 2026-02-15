#!/bin/bash

# Portfolio Deployment Script
# This script prepares and deploys your portfolio to Vercel

echo "🚀 Portfolio Deployment Script"
echo "=============================="
echo ""

# Step 1: Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    exit 1
fi

echo "✅ Git repository found"
echo ""

# Step 2: Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Uncommitted changes detected. Committing..."
    git add .
    git commit -m "chore: optimize for Vercel deployment with SEO and performance improvements"
    echo "✅ Changes committed"
else
    echo "✅ No uncommitted changes"
fi

echo ""

# Step 3: Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin main
echo "✅ Pushed to GitHub"

echo ""
echo "=============================="
echo "🎉 Ready for Vercel Deployment!"
echo "=============================="
echo ""
echo "Next steps:"
echo "1. Go to https://vercel.com/new"
echo "2. Click 'Import Git Repository'"
echo "3. Select your GitHub repository"
echo "4. Click 'Deploy'"
echo ""
echo "Your site will be live in 2-5 minutes!"
echo ""
echo "After deployment:"
echo "1. Visit your Vercel URL"
echo "2. Verify everything works"
echo "3. Submit to Google Search Console"
echo "4. Submit to Bing Webmaster Tools"
echo ""
echo "📚 Documentation:"
echo "   - VERCEL_QUICK_START.md - Quick start guide"
echo "   - DEPLOYMENT_CHECKLIST.md - Step-by-step checklist"
echo "   - PERFORMANCE.md - Performance details"
echo ""
