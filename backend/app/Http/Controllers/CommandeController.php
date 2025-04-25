<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Commande;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class CommandeController extends Controller
{
    public function index()
    {
        return Commande::all();
    }

    public function getCommandes($id)
    {
        // Validate the id to make sure it's an integer and a valid user id
        if (!User::find($id)) {
            return response()->json(['error' => 'Invalid user ID'], 400);
        }
    
        $commande = Commande::where('client_id', $id)->get();
        return response()->json($commande);
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

    public function statusUpdate(Request $request,$id)
    {
 
        if (Commande::where('id', $id)->exists()) {
            $commande = Commande::find($id);
            if($commande->statut == 'en attente'){
                $commande->statut = 'preparation de la commande';
            }
            else if($commande->statut == 'preparation de la commande'){
                $commande->statut = 'commande en route';
            }
            else if($commande->statut == 'commande en route'){
                $commande->statut = 'livré';
            }
            $commande->save();
            return response()->json([
                'message' => "Commande status  updated successfully, new status $commande->statut"
            ], 200);
        } else {
            return response()->json([
                'message' => 'Commande not found'
            ], 404);
        }
    }

    public function destroy($id)
    {
        $commande = Commande::findOrFail($id);
        $commande->delete();
        return response()->json(null, 204);
    }
}
