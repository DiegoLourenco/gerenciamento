<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use Faker\Factory;
use App\Client;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(Client::class, function (Faker $faker) {
    $faker = Factory::create('pt_BR');
    return [
        'name' => $faker->name,
        'email' => $faker->safeEmail,
        'company' => $faker->company
    ];
});
