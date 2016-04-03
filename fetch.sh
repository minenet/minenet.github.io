# File Name: fetch.sh
#!/bin/bash
git pull origin source
cd .deploy_git/
git pull
