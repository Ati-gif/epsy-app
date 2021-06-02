# Getting started

## Steps to clone

1. git clone git@github.com:jimibue/starter_project_sum21.git <app_name_here>
2. cd <app_name_here>

### rails steps
1. bundle
2. rename database, in database.yml find and replace `change_db_name_here` to <app_name_here>
3. rails db:create db:migrate db:seed
4. rails s -p 3001

### react steps (in a separate terminal pane)
1. cd client  
2. yarn
3. yarn start

goto localhost:3000 to see react app
goto localhost:3001 to see rails app

### github steps
1. remove remote `git remote remove origin`
2. create new repo on github
3. add remote `git remote add <ssh_link_here>`
