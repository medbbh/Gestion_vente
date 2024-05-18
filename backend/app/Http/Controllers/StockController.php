<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Log;
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

        $stock = new Stock($request->only(['product_id', 'quantite']));
    
         
        $stock->save();

        return response()->json($stock, 201);

    }
    public function show($id)
    {
        return Stock::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        Log::info("Updating stock with ID: $id");
        try {
            $validatedData = $request->validate([
                'product_id' => 'nullable|numeric',
                'quantite' => 'nullable|numeric',
            
            ]);

            // Find Stock or fail
            $stock = Stock::findOrFail($id);
    
            // Update non-file data
            $stock->fill($validatedData);
            
        
            $stock->save();  // Perform a single save operation
            Log::info("Stock updated successfully: " . json_encode($stock));
            return response()->json($stock, 200);
        } catch (ModelNotFoundException $e) {
            Log::error("Stock not found with ID: $id", ['exception' => $e]);
            return response()->json(['message' => 'Stock not found'], 404);
        } catch (\Exception $e) {
            Log::error("Error updating Stock: " . $e->getMessage(), ['exception' => $e]);
            return response()->json(['message' => 'Error updating stock', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        $stock= Stock::findOrFail($id);
        
        $stock->delete();
        return response()->json(null, 204);
    }


    

    
}
