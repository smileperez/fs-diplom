<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Информация о Приложении "FS-APP"

Ключевые версии ПО:
├── PHP Version - 8.2.4
├── Laravel Framework Version - 10.23.1
├── Node.js Version - 20.5.1
├── NPM Version - 10.1.0

Процесс создания Приложения:
1. Разворачивание Laravel Framework
2. Разворачивание Vite с уклоном в React
3. Порт Vite был изменен на :3000
4. Установлен пакет Tailwind.css
5. Устанволен плагин @tailwindcss/forms
6. Установлен пакет иконок Heroicons
7. Установлен пакет стилей Headless UI
8. Установлен пакет React-router-dom
9. Установлен пакет Axios


Установленные NPM пакеты в целом:
react@\fs-app\react
├── @headlessui/react@1.7.17
├── @heroicons/react@2.0.18
├── @tailwindcss/forms@0.5.6
├── @types/react-dom@18.2.7
├── @types/react@18.2.21
├── @vitejs/plugin-react@4.0.4
├── autoprefixer@10.4.15
├── axios@1.5.0
├── eslint-plugin-react-hooks@4.6.0
├── eslint-plugin-react-refresh@0.4.3
├── eslint-plugin-react@7.33.2
├── eslint@8.49.0
├── postcss@8.4.29
├── react-dom@18.2.0
├── react-router-dom@6.16.0
├── react@18.2.0
├── tailwindcss@3.3.3
└── vite@4.4.9

Инструкция по запуску приложения:
| № | Действие | Подробности |
|:- |:----------------|:--------------|
| 1 | Установка XAMPP сервера | https://www.apachefriends.org/ru/index.html |
| 2 | Запускаем веб-сервер apache и базу данных mysql         | Cell 6        |
| 3 | Установка Composer, не забываем установить галку "Прописать PATH PHP"         | Cell 9        |




Установка Composer, не забываем установить галку "Прописать PATH PHP"

Клонирование репозитория в XAMPP в папку htdocs через git

В корневой папке приложения запускаем команду

В корневой папке проекта файл .env.example переименовываем в .env

Проверяем файл в корневой папке проекта .env на корректность, например что адрес, логин, пароль БД стоит корректный

Делаем миграцию БД

В папке приложения запускаем команду

Проверить, что Laravel запустился корректно
