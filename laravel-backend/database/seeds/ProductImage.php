<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductImage extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $images = [
            'a.jpg',
            'b.jpg',
            'c.jpg',
            'd.jpg',
            'e.jpg',
            'f.jpg',
            'g.jpg',
            'c.jpg',
            'd.jpg',
            'e.jpg',
            'f.jpg',
            'g.jpg',

        ];
         foreach($images as $key => $image){
             DB::table('product_images')->insert([
                'product_id' => $key+1,
                'image' => $image,
            ]);
         }
    }
}
