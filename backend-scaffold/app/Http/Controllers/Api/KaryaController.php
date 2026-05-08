<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Karya;
use Illuminate\Http\Request;

class KaryaController extends Controller
{
    public function index()
    {
        return response()->json(Karya::where('is_approved', true)->latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request.validate([
            'judul' => 'required|string|max:255',
            'jenis' => 'required|string',
            'deskripsi' => 'required|string',
            'penulis' => 'required|string',
        ]);

        $karya = Karya::create($validated);
        return response()->json($karya, 201);
    }

    public function like($id)
    {
        $karya = Karya::findOrFail($id);
        $karya->increment('likes');
        return response()->json($karya);
    }
}
