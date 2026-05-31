<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
    private string $systemPrompt = <<<'PROMPT'
Anda adalah CS Asta Creative - customer service resmi dari agency digital marketing bernama "Asta Creative".

PROFIL AGENSI:
- Nama: Asta Creative
- Tagline: Smart Content Studio AI
- Layanan: pembuatan konten iklan, video kreator, manajemen sosial media berbasis AI
- Sub-layanan: AI Video Ads, AI Content Creator, AI Voice Over, AI Image Generation, Social Media Optimization
- Fokus: AI sebagai pusat optimasi konten kreatif
- Lokasi layanan: Indonesia (bilingual ID/EN)

GAYA BICARA:
- Ramah, profesional, helpful
- Default Bahasa Indonesia, switch ke English jika user pakai English
- Singkat (2-4 kalimat per balasan), gunakan emoji sewajarnya
- Jika ditanya harga, sebutkan "paket mulai dari Rp 2.500.000/bulan, tergantung kebutuhan, silakan isi form kontak untuk penawaran khusus"
- Selalu arahkan user ke form kontak di halaman Contact jika serius ingin booking

JANGAN menjawab pertanyaan di luar konteks Asta Creative dan digital marketing AI.
PROMPT;

    public function chat(Request $request): JsonResponse
    {
        $data = $request->validate([
            'session_id' => 'required|string',
            'message'    => 'required|string',
        ]);

        $apiKey = config('services.anthropic.key');

        if (! $apiKey) {
            return response()->json([
                'session_id' => $data['session_id'],
                'reply'      => 'Halo! 👋 Saya CS Asta Creative. Maaf, koneksi AI sedang sibuk. Silakan isi form kontak kami atau coba lagi sebentar lagi.',
            ]);
        }

        // Keep chat history in Laravel cache keyed by session
        $cacheKey = 'chat_' . $data['session_id'];
        $history  = cache()->get($cacheKey, []);

        $history[] = ['role' => 'user', 'content' => $data['message']];

        $response = Http::withToken($apiKey)
            ->timeout(30)
            ->post('https://api.anthropic.com/v1/messages', [
                'model'      => 'claude-sonnet-4-6',
                'max_tokens' => 512,
                'system'     => $this->systemPrompt,
                'messages'   => $history,
            ]);

        if ($response->failed()) {
            return response()->json([
                'session_id' => $data['session_id'],
                'reply'      => 'Halo! 👋 Saya CS Asta Creative. Maaf, koneksi AI sedang sibuk. Silakan isi form kontak kami atau coba lagi sebentar lagi.',
            ]);
        }

        $reply = $response->json('content.0.text', '');

        $history[] = ['role' => 'assistant', 'content' => $reply];
        cache()->put($cacheKey, $history, now()->addHours(2));

        return response()->json([
            'session_id' => $data['session_id'],
            'reply'      => $reply,
        ]);
    }

    public function history(string $sessionId): JsonResponse
    {
        $history = cache()->get('chat_' . $sessionId, []);

        return response()->json($history);
    }
}
