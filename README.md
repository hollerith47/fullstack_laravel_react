project created with
```bash
laravel new backend
```
created without breeze and so on

## Create Controller with request directly
```bash
php artisan make:controller Api/UserController --model=User --requests --resource --api
```

## create user resource
```bash
php artisan make:resource UserResource
```

## creating 50 users in database with seed
```php
// DatabaseSeeder.php
public function run(): void
    {
         \App\Models\User::factory(50)->create();
    }
```
then run the following command
```bash
php artisan db:seed
```

full project on https://www.youtube.com/watch?v=qJq9ZMB2Was
