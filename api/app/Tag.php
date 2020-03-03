<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    /**
     * The attributes
     */
    protected $fillable = [
        'name'
    ];

    /**
     * The clients that belong to the tag.
     */
    public function tags()
    {
        return $this->belongsToMany(Client::class, 'client_tag');
    }
}
