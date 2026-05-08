<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Karya extends Model
{
    use HasFactory;
    protected $fillable = ['judul', 'jenis', 'deskripsi', 'penulis', 'likes', 'is_approved'];
}
