<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClosingCreditsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('closing_credits', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('credit_debit_id');
            $table->foreign('credit_debit_id')->references('id')->on('credit_debits');
            $table->string('type', 200);
            $table->double('amount', 10, 2);
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
        Schema::dropIfExists('closing_credits');
    }
}
