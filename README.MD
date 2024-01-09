# Тестовое задание

## Стек

- Node.js
- Express.js
- MySQL

## Разработанные методы

Использована ORM (**sequelize**)  
Использован **JWT** и **bcrypt**  
Использован **multer**  
Разработан **сервисный слой**, чтобы "весь код не был в контроллерах"

- **Регистрация пользователя (POST /user/register)**  
  При регистрации пользователь указывает только имя, email и пароль. Поле lastName устанавиливает default value: "Unknown", поля gender и photo устанавливали null. При создании пользователя автоматически записывается дата и время в поле registrationDate. Используется JWT для основной информации и хэширование через bcrypt пароля.

- **Авторизация пользователя (POST /user/login)**  
  Стандартная авторизация по email и пароль.

- **Редактирование пользователя (PUT /profile/[id])**  
  При редактировании можно менять всю информацию кроме \_id, пароля и даты регистрации. Данный метод PUT принимает в себя form-data запрос. При получении файла он сохраняет только название файла в бд, а его записывает в папку со статикой uploads. Так же multer проверяет фото на размер файла до 10мб и на формат JPG или PNG.

- **Получение пользователя (GET /profile/[id])**  
  Стандартное получение информации об одном пользователе.

- **Получение всех пользователей с пагинацией (GET /profiles?page=1) с условием 10 записей на страницу**  
  Получение всех пользователей с пагинацией, а также сортировка их по дате регистрации.

## Валидация

Используется библиотека **express-validator**

- Валидация полей email и password при регистрации
- Валидация поля email при авторизации

## Примечания

В ТЗ не сказано, кто может редактировать пользователя и прочие условия. Поэтому, этим было решено пренебречь ( Я бы предполагал middleware для проверки авторизации пользователя, для изменения данных )

Переменные вынесены в **.env** файл

## Примеры запросов

### Регистрация

`POST http://localhost:3425/user/register`

Тело запроса:

```
{
    "email": "daniil@gmail.com",
    "firstName": "Daniil",
    "password": "12345678"
}
```

Результат:

```
{
    "userId": 13,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEzLCJmaXJzdE5hbWUiOiJEYW5paWwiLCJlbWFpbCI6ImRhbmlpbEBnbWFpbC5jb20iLCJpYXQiOjE3MDQ3OTQ5MDgsImV4cCI6MTcwNzM4NjkwOH0.YW44WCMMxZDwFaVuxuchsSKkOZ1Us8nmZDQM3Q37_kE"
}
```

### Авторизация

`POST http://localhost:3425/user/login`

Тело запроса:

```
{
    "email": "daniil@gmail.com",
    "password": "12345678"
}
```

Результат:

```
{
    "_id": 13,
    "firstName": "Daniil",
    "lastName": "Unknown",
    "email": "daniil@gmail.com",
    "gender": null,
    "photo": null,
    "registrationDate": "2024-01-09T10:08:28.000Z",
    "createdAt": "2024-01-09T10:08:28.000Z",
    "updatedAt": "2024-01-09T10:08:28.000Z",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEzLCJmaXJzdE5hbWUiOiJEYW5paWwiLCJlbWFpbCI6ImRhbmlpbEBnbWFpbC5jb20iLCJpYXQiOjE3MDQ3OTUxMjMsImV4cCI6MTcwNzM4NzEyM30.jJujqBULkIZiuYWz0JqlLYTSqkQYkZjJtCp9xZVe-Rk"
}
```

### Редактирование пользователя

`PUT http://localhost:3425/profile/13`

Тело запроса **form-data**:

```
photo: 1702916262267-24.png
gender: Male
```

Результат:

```
{
    "_id": 13,
    "firstName": "Daniil",
    "lastName": "Unknown",
    "email": "daniil@gmail.com",
    "gender": "Male",
    "photo": "photo-1704795321745-268457218.png",
    "registrationDate": "2024-01-09T10:08:28.000Z",
    "createdAt": "2024-01-09T10:08:28.000Z",
    "updatedAt": "2024-01-09T10:15:21.772Z"
}
```

### Получение пользователя

`GET http://localhost:3425/profile/13`

Результат:

```
{
    "_id": 13,
    "firstName": "Daniil",
    "lastName": "Unknown",
    "email": "daniil@gmail.com",
    "gender": "Male",
    "photo": "photo-1704795321745-268457218.png",
    "registrationDate": "2024-01-09T10:08:28.000Z",
    "createdAt": "2024-01-09T10:08:28.000Z",
    "updatedAt": "2024-01-09T10:15:21.000Z"
}
```

### Получение пользователей с пагинацией (10 на страницу)

`GET http://localhost:3425/profiles?page=1`

Результат:

```
[
    {
        "_id": 13,
        "firstName": "Daniil",
        "lastName": "Unknown",
        "email": "daniil@gmail.com",
        "gender": "Male",
        "photo": "photo-1704795321745-268457218.png",
        "registrationDate": "2024-01-09T10:08:28.000Z",
        "createdAt": "2024-01-09T10:08:28.000Z",
        "updatedAt": "2024-01-09T10:15:21.000Z"
    },
    {
        "_id": 12,
        "firstName": "dsaddss",
        "lastName": "Unknown",
        "email": "ddsaniixs@gmail.com",
        "gender": null,
        "photo": null,
        "registrationDate": "2024-01-08T23:01:59.000Z",
        "createdAt": "2024-01-08T23:01:59.000Z",
        "updatedAt": "2024-01-08T23:01:59.000Z"
    },
    {
        "_id": 11,
        "firstName": "dsad",
        "lastName": "Unknown",
        "email": "danii@gmail.com",
        "gender": null,
        "photo": null,
        "registrationDate": "2024-01-08T22:58:23.000Z",
        "createdAt": "2024-01-08T22:58:23.000Z",
        "updatedAt": "2024-01-08T22:58:23.000Z"
    },
    {
        "_id": 10,
        "firstName": "dsa",
        "lastName": "Unknown",
        "email": "john2ds211a2222ae@example.com",
        "gender": null,
        "photo": null,
        "registrationDate": "2024-01-08T22:41:20.000Z",
        "createdAt": "2024-01-08T22:41:20.000Z",
        "updatedAt": "2024-01-08T22:41:20.000Z"
    },
    {
        "_id": 9,
        "firstName": "nasd",
        "lastName": "Unknown",
        "email": "john2dsa2222ae@example.com",
        "gender": "Male",
        "photo": null,
        "registrationDate": "2024-01-08T22:20:25.000Z",
        "createdAt": "2024-01-08T22:20:25.000Z",
        "updatedAt": "2024-01-08T22:21:40.000Z"
    },
    {
        "_id": 8,
        "firstName": "dsad",
        "lastName": "Unknown",
        "email": "john22ae@example.com",
        "gender": null,
        "photo": null,
        "registrationDate": "2024-01-08T22:08:01.000Z",
        "createdAt": "2024-01-08T22:08:01.000Z",
        "updatedAt": "2024-01-08T22:10:26.000Z"
    },
    {
        "_id": 6,
        "firstName": "dsad",
        "lastName": "Unknown",
        "email": "john22dыsodsae@example.com",
        "gender": null,
        "photo": null,
        "registrationDate": "2024-01-08T22:07:28.000Z",
        "createdAt": "2024-01-08T22:07:28.000Z",
        "updatedAt": "2024-01-08T22:07:28.000Z"
    },
    {
        "_id": 4,
        "firstName": "Jыoh2n1",
        "lastName": "Unknown",
        "email": "john22dыoe@example.com",
        "gender": null,
        "photo": null,
        "registrationDate": "2024-01-08T20:05:51.000Z",
        "createdAt": "2024-01-08T20:05:51.000Z",
        "updatedAt": "2024-01-08T20:05:51.000Z"
    },
    {
        "_id": 3,
        "firstName": "John1",
        "lastName": "dsad",
        "email": "john2doe@example.com",
        "gender": "Male",
        "photo": "photo-1704755607125-966740641.png",
        "registrationDate": "2024-01-08T19:51:12.000Z",
        "createdAt": "2024-01-08T19:51:12.000Z",
        "updatedAt": "2024-01-08T23:13:27.000Z"
    },
    {
        "_id": 1,
        "firstName": "John",
        "lastName": "Doe",
        "email": "john22dыsoe@example.com",
        "gender": "Male",
        "photo": "1704749339208-1702915902573-12.png",
        "registrationDate": "2024-01-08T19:46:18.000Z",
        "createdAt": "2024-01-08T19:46:18.000Z",
        "updatedAt": "2024-01-08T21:28:59.000Z"
    }
]
```

`GET http://localhost:3425/profiles?page=2`

Результат:

```
[]
```
