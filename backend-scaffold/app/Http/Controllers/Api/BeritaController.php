<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use Illuminate\Http\Request;

class BeritaController extends Controller
{
    public function index()
    {
        return response()->json(Berita::latest()->get());
    }

    public function show($id)
    {
        $berita = Berita::findOrFail($id);
        $berita->increment('views');
        return response()->json($berita);
    }

    public function store(Request $request)
    {
        $validated = $request.validate([
            'judul' => 'required|string|max:255',
            'kategori' => 'required|string',
            'konten' => 'required|string',
            'penulis' => 'required|string',
            'gambar' => 'nullable|string',
            'youtube_url' => 'nullable|string',
        ]);

        $berita = Berita::create($validated);
        return response()->json($berita, 201);
    }
}
