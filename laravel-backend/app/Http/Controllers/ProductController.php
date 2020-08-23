<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function search(Request $request){

        $productName = $request->input('productName');
        $product = Product::where('name', 'like', $productName.'%')->get();
        return $product;
    }
}
