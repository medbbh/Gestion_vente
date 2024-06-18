<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Log;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Commande;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function index()
    {
        return Product::all();
    }

    public function getMostSoldProducts()
    {
        // Retrieve the top 4 most sold products
        $mostSoldProducts = Commande::select('product_id', DB::raw('SUM(quantite) as total_quantity'))
            ->groupBy('product_id')
            ->orderBy('total_quantity', 'desc')
            ->take(4)
            ->get();

        // Fetch product details and attach total quantities sold
        $products = $mostSoldProducts->map(function ($item) {
            $product = Product::find($item->product_id);
            $product->total_quantity_sold = $item->total_quantity;
            return $product;
        });

        // Check if products are found
        if ($products->isNotEmpty()) {
            return response()->json($products);
        } else {
            return response()->json(['message' => 'No products found'], 404);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'prix' => 'required|numeric',
            'category' => 'required|string',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:190048',
        ]);

        $product = new Product($request->only(['name', 'prix', 'category', 'description']));

        if ($request->hasFile('image')) {
            $fileName = $request->file('image')->store('images', 'public');
            $product->image = $fileName;
        }

        $product->save();

        return response()->json($product, 201);
    }

    public function show($id)
    {
        return Product::findOrFail($id);
    }
    public function update(Request $request, $id)
    {
        Log::info("Updating product with ID: $id");
    
        try {
            // Validation
            $validatedData = $request->validate([
                'name' => 'nullable|string|max:255',
                'prix' => 'nullable|numeric',
                'category' => 'nullable|string|max:255',
                'description' => 'nullable|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',  // Max size as per typical config
            ]);
    
            // Find product or fail
            $product = Product::findOrFail($id);
    
            // Update non-file data
            $product->fill($validatedData);
    
            // Handle file upload
            if ($request->hasFile('image')) {
                $oldImage = $product->image;
                $product->image = $request->file('image')->store('images', 'public');
    
                // Delete old image after the new image has been saved
                if ($oldImage) {
                    Storage::disk('public')->delete($oldImage);
                }
            }
    
            // Save the product
            $product->save();
            Log::info("Product updated successfully: " . json_encode($product));
    
            // Return successful response
            return response()->json($product);
        } catch (ModelNotFoundException $e) {
            Log::error("Product not found with ID: $id", ['exception' => $e]);
            return response()->json(['message' => 'Product not found'], 404);
        } catch (\Exception $e) {
            Log::error("Error updating product: " . $e->getMessage(), ['exception' => $e]);
            return response()->json(['message' => 'Error updating product', 'error' => $e->getMessage()], 500);
        }
    }
    


    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }
        $product->delete();
        return response()->json(null, 204);
    }
}