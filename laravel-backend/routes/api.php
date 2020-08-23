<?php

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

/* Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
}); */
Route::post('/product','ProductController@search');
Route::get('/product_image','ProductImageController@show');
Route::post('/credit_debit', 'CreditDebitController@save');
Route::get('/credit_debit', 'CreditDebitController@save');


