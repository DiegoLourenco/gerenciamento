<?php

use App\Client;
use App\Tag;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Client::class, 10)->create()
            ->each(function ($client) {
                $tags = Tag::inRandomOrder()->limit(5)->pluck('id');
                $client->tags()->attach($tags);
            });
    }
}
