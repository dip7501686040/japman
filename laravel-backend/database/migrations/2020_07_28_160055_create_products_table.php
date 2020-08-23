<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name', 200);
            $table->integer('instock');
            $table->string('batch', 100)->nullable();
            $table->double('mrp');
            $table->date('expiry')->nullable();
            $table->double('tax');
            $table->double('purchase_rate');
            $table->double('selling_rate');
            $table->double('discount');
            $table->string('free', 200)->nullable();
            $table->string('hsn', 100)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
