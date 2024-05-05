<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
<<<<<<< HEAD
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
=======
    Route::post('/refresh', [AuthController::class, 'refresh']);  

    Route::apiResource('products',ProductController::class);
>>>>>>> 676a1d85de98e64bc203663cf87939ac427decca
    
    Route::get('users', [UserController::class, 'index']);
    Route::put('/user/roleUpdate/{id}', [UserController::class, 'RoleUpdate']);
    
});
Route::apiResource('products', ProductController::class);

