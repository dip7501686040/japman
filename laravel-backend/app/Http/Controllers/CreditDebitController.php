<?php

namespace App\Http\Controllers;

use App\credit_debit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class CreditDebitController extends Controller
{
    public function save(Request $request)
    {
        $data = $request->input();
        $date = date_create($data['date']);
        $credit_debit_id = DB::table('credit_debits')->insertGetId(
            [
                'date' => date_format($date, "Y/m/d"),
                'opening_credit_total' => trim($data['openingCreditTotal']),
                'closing_credit_total' => trim($data['closingCreditTotal']),
                'closing_debit_total' => trim($data['closingDebitTotal']),
                'sell' => trim($data['todaySell']),
                'total_credit' => trim($data['totalCredit']),
                'calculated_credit' => trim($data['todayCalculatedCredit']),
                "created_at" =>  \Carbon\Carbon::now(), # new \Datetime()
                "updated_at" => \Carbon\Carbon::now(),  # new \Datetime()
            ]
        );
        foreach ($data['openingCreditInputs'] as $value) {
            DB::table('opening_credits')->insert(
                [
                    'credit_debit_id' => $credit_debit_id,
                    'type' => $value['type'],
                    'amount' => $value['amount'],
                    "created_at" =>  \Carbon\Carbon::now(), # new \Datetime()
                    "updated_at" => \Carbon\Carbon::now(),  # new \Datetime()
                ]
            );
        }
        foreach ($data['closingCreditInputs'] as $value) {

            DB::table('closing_credits')->insert(
                [
                    'credit_debit_id' => $credit_debit_id,
                    'type' => $value['type'],
                    'amount' => $value['amount'],
                    "created_at" =>  \Carbon\Carbon::now(), # new \Datetime()
                    "updated_at" => \Carbon\Carbon::now(),  # new \Datetime()
                ]
            );
        }
        foreach ($data['closingDebitInputs'] as $value) {

            DB::table('closing_debits')->insert(
                [
                    'credit_debit_id' => $credit_debit_id,
                    'type' => $value['type'],
                    'amount' => $value['amount'],
                    "created_at" =>  \Carbon\Carbon::now(), # new \Datetime()
                    "updated_at" => \Carbon\Carbon::now(),  # new \Datetime()
                ]
            );
        }
        return response([
            'message' => 'inserted'
        ], Response::HTTP_CREATED);
        // $arr = array();
        // foreach($data['openingCreditInputs'] as $key => $value){
        //     $temp = $value['amount'];
        // }
        // return $temp;
    }
}
