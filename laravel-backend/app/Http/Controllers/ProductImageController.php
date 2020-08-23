<?php

namespace App\Http\Controllers;

use App\Product_image;
use Illuminate\Http\Request;

class ProductImageController extends Controller
{
    public function show(){

        return Product_image::all();
    }
}
