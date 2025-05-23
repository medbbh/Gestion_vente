<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\CommandeController;
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
    Route::get('/profile', [AuthController::class, 'userProfile']);
    Route::post('/refresh', [AuthController::class, 'refresh']);  
    Route::apiResource('products',ProductController::class);
    Route::get('mostSold', [ProductController::class, 'getMostSoldProducts']);

    Route::apiResource('stocks',StockController::class);
    Route::get('users', [UserController::class, 'index']);
    Route::put('/user/roleUpdate/{id}', [UserController::class, 'RoleUpdate']);
    Route::get('/UpdateProfile/{id}', [UserController::class, 'show']);
    Route::put('/UpdateProfile', [UserController::class, 'update'] );
    Route::apiResource('commandes',CommandeController::class);
    Route::get('commandes',[CommandeController::class, 'index']);
    Route::get('getcommandes/{id}',[CommandeController::class, 'getCommandes']);
    Route::put('statusUpdate/{id}', [CommandeController::class, 'statusUpdate']);
    Route::get('/user/montant/{id}', [UserController::class, 'getMontant']);
    Route::put('/user/editMontant/{id}', [UserController::class, 'editMontant']);
});

