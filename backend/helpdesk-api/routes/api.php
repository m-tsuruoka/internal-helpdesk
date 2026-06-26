<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\InquiryController;
use Illuminate\Support\Facades\Route;

// 認証不要
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login',    [AuthController::class, 'login']);

// 認証必要
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me',      [AuthController::class, 'me']);

    Route::apiResource('inquiries', InquiryController::class)->only(['index', 'store', 'update','destroy']);
});

// 前レッスンの問い合わせルート（次のチュートリアルで auth:sanctum グループに移動）
// Route::apiResource('inquiries', InquiryController::class)
//     ->only(['index', 'store', 'update', 'destroy']);
//↑が原因で権限が無いと言われた。これのせいで一般ユーザと認識されていた。