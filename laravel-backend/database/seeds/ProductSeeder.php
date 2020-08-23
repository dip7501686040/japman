<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $names = [
            'ASHOKARISTA DUBAR 250ML',
            'ASHOKARISTA DUBAR 550ML',
            'ASHOKARISTA BAIDYANATH 500ML',
            'ASHOKARISTA BAIDYANATH 750ML',
            'BATCHINTAMANI BAIDYANATH TAB',
            'BATCHINTAMANI DUBAR TAB',
            'BATCHINTAMANI DAKA TAB',
            'CHINTARISTA DAKA 300ML',
            'PATRANGASAB DAKA 500ML',
            'DASHAMULARISTA DAKA 500ML',
            'INDULEKHA DAKA 300ML',
            'PATRANGASAB SANTI 300ML',
        ];
        foreach($names as $name){

            DB::table('products')->insert([
                'name' => $name,
                'instock' => rand(0, 10),
                'batch' => Str::random(4),
                'mrp' => rand(100*10, 150*10) / 10,
                'expiry' => date('Y-m-d', rand(20220101, 20221230)),
                'tax' => 18.00,
                'purchase_rate' => rand(90*10, 98*10)/10,
                'selling_rate' => rand(160*10, 180*10)/10,
                'discount' => 10.00,
                'free' => 'no',
                'hsn' => Str::random(6),
            ]);
        }
    }
}
