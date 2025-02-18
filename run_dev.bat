@echo off
echo Building frontend...
cd frontend
call npm run build

echo Starting Django server...
cd ../backend
python manage.py runserver 