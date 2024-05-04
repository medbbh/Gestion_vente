<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        return Product::all();
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
        $product = Product::findOrFail($id);
 
        $validatedData = $request->validate([
            'name' => 'required|string',
            'prix' => 'required|numeric',
            'category' => 'required|string',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:190048',
        ]);

        // Manually assign fields to check each for issues
        $product->name = $validatedData['name'];
        $product->prix = $validatedData['prix'];
        $product->category = $validatedData['category'];
        $product->description = $validatedData['description']; // Use null coalescing for nullable fields

        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $product->image = $request->file('image')->store('images', 'public');
        }

        $product->save();  // Perform a single save operation

        return response()->json($product, 200);
    }


    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        if ($product->image) {
            Storage::delete($product->image);
        }
        $product->delete();
        return response()->json(null, 204);
    }
}

