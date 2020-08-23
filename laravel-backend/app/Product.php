<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'instock', 'batch', 'mrp', 'expiry', 'tax', 'purchase_rate',
    'selling_rate', 'discount', 'free', 'hsn'];

    public function product_images(){

        return $this->hasMany(Product_image::class);
    }
}
