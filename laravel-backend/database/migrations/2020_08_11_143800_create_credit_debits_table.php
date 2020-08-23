<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCreditDebitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('credit_debits', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->double('opening_credit_total', 10, 2);
            $table->double('closing_credit_total', 10, 2);
            $table->double('closing_debit_total', 10, 2);
            $table->double('sell', 10, 2);
            $table->double('total_credit', 10, 2);
            $table->double('calculated_credit', 10, 2);
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
        Schema::dropIfExists('credit_debits');
    }
}
