<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Stock;
use App\Models\Product;

class StockController extends Controller
{
    public function index()
    {
        return Stock::all();

    }

    public function store(Request $request){
         $request ->validate([
            
            'product_id'=>'required|numeric',
            'quantite'=>'required|numeric',
             
 
         ]);

         $stock = new Stock;
         $stock->product_id =$request->product_id;
         $stock->quantite =$request->quantite;
         
         $stock->save();

         return response()->json($stock, 201);

         }

         public function update(Request $request, $id)
         {
             $stock = Stock::findOrFail($id);
      
             $validatedData = $request->validate([
                 'product_id' => 'required|numeric',
                 'quantite' => 'required|numeric',
                
             ]);
     
             // Manually assign fields to check each for issues
             
             $stock->product_id= $validatedData['product_id'];
             $stock->quantite= $validatedData['quantite'];
             // Use null coalescing for nullable fields
     
            
             $stock->save();  // Perform a single save operation
     
             return response()->json($stock, 200);
         }

         public function destroy($id)
    {
        $stock= Stock::findOrFail($id);
        
        $stock->delete();
        return response()->json(null, 204);
    }


    

    
}
