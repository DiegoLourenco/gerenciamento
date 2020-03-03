<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    /**
     * The attributes
     * 
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'company'
    ];

    /**
     * The tags that belong to the client.
     */
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'client_tag');
    }
}
