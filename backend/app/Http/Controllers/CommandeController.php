<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Commande;
use Illuminate\Support\Facades\Auth;

class CommandeController extends Controller
{
    public function index()
    {
        return Commande::all();
    }

    public function store(Request $request)
{
    $request->validate([
        'client_id' => 'required|numeric',
        'product_id' => 'required|numeric',
        'quantite' => 'required|numeric',
        'montant_total' => 'required|numeric',
    ]);

    $commande = new Commande($request->only([
    'client_id',
    'product_id',
    'quantite',
    'montant_total'
]));

    $commande->save();

    return response()->json($commande, 201);
}





    public function show($id)
    {
        return Commande::findOrFail($id);
    }

    public function destroy($id)
    {
        $commande = Commande::findOrFail($id);
        $commande->delete();
        return response()->json(null, 204);
    }
}
