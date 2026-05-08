<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    use HasFactory;
    protected $fillable = ['nama_usaha', 'kategori', 'deskripsi', 'whatsapp', 'alamat', 'logo', 'is_active'];
}
