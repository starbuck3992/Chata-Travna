<?php

use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\FieldController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

//Public
Route::post('/reservations', [ReservationController::class, 'store']);
Route::get('/reservations', [ReservationController::class, 'index']);
Route::get('/fields', [FieldController::class, 'index']);


//Admin
Route::group(['middleware' => ['auth:sanctum']], function () {
Route::get('/admin/reservations', [ReservationController::class, 'index']);
Route::post('/admin/fields', [FieldController::class, 'update']);
});
