set -e

npm run build

cd dist

git init
git add -A
git commit -m 'Deployed'

git push -f git@github.com:iiy4383/Vue_blog.git master:gh-pages

cd -