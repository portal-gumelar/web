<?php

use App\Http\Controllers\Api\BeritaController;
use App\Http\Controllers\Api\KaryaController;
use Illuminate\Support\Facades\Route;

Route::get('/berita', [BeritaController::class, 'index']);
Route::get('/berita/{id}', [BeritaController::class, 'show']);
Route::post('/berita', [BeritaController::class, 'store']);

Route::get('/karya', [KaryaController::class, 'index']);
Route::post('/karya', [KaryaController::class, 'store']);
Route::post('/karya/{id}/like', [KaryaController::class, 'like']);
