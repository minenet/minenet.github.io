# File Name: submit.sh
#!/bin/bash
hexo clean
hexo d -g
git add .
git commit -m "update blog source"
git push origin source
