<?php

use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\ContactController;
use Illuminate\Support\Facades\Route;

Route::get('/', fn () => response()->json(['message' => 'Asta Creative API is running']));

Route::post('/contact', [ContactController::class, 'store']);
Route::get('/contact', [ContactController::class, 'index']);

Route::post('/chat', [ChatController::class, 'chat']);
Route::get('/chat/{sessionId}', [ChatController::class, 'history']);
