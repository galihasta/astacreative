<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'phone'   => 'nullable|string|max:50',
            'service' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        $contact = Contact::create($data);

        return response()->json([
            'success' => true,
            'id'      => $contact->id,
            'message' => 'Terima kasih! Tim kami akan menghubungi Anda segera.',
        ], 201);
    }

    public function index(): JsonResponse
    {
        return response()->json(
            Contact::latest()->get()
        );
    }
}
