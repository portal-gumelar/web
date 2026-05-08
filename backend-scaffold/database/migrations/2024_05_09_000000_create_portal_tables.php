<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('beritas', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->string('kategori');
            $table->text('konten');
            $table->string('gambar')->nullable();
            $table->string('youtube_url')->nullable();
            $table->string('penulis');
            $table->integer('views')->default(0);
            $table->timestamps();
        });

        Schema::create('karyas', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->string('jenis');
            $table->text('deskripsi');
            $table->string('penulis');
            $table->integer('likes')->default(0);
            $table->boolean('is_approved')->default(false);
            $table->timestamps();
        });

        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->string('nama_usaha');
            $table->string('kategori');
            $table->text('deskripsi');
            $table->string('whatsapp');
            $table->string('alamat');
            $table->string('logo')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('beritas');
        Schema::dropIfExists('karyas');
        Schema::dropIfExists('members');
    }
};
