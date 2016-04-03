# File Name: submit.sh
#!/bin/bash
hexo g -d
git add .
git commit -am "update blog source"
git push origin source
