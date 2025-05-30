<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;


class UserController extends Controller
{
    public function index(){
        $users = User::select('id','name', 'adress', 'phone', 'email', 'role','montant')->get();
        return response()->json($users,200);
     }
 
     public function RoleUpdate(Request $request,$id){
 
         if (User::where('id', $id)->exists()) {
             $user = User::find($id);
             $user->role = $user->role == 0 ? 1: 0 ;
             $user->timestamps = false;
             $user->save();
             return response()->json([
                 'message' => "User role updated successfully, new role $user->role"
             ], 200);
         } else {
             return response()->json([
                 'message' => 'User not found'
             ], 404);
         }
     }

     public function getMontant($id){
        $montant = User::select('montant')->where('id', $id)->get();
        return response()->json($montant);
     }
     public function editMontant(Request $request, $id)
    {
        // Validate the query parameter
        $validator = Validator::make($request->all(), [
            'new_montant' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $new_montant = $request->input('new_montant');
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found',
            ], 404);
        }

        if ($user->montant > $new_montant) {
            $user->montant = $user->montant - $new_montant;
            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'Montant updated successfully',
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Montant not sufficient',
            ], 400);
        }
    }
    
     //================Update pprofil =================
     public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }
        return response()->json($user);
    }
     public function update(Request $request)
    {
        $user = $request->user();
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'phone' => 'nullable|numeric',
            'adress' => 'nullable|string',
            'newPassword' => 'nullable|string|min:6',
        ]);

        if (isset($data['newPassword'])) {
            $data['password'] = Hash::make($data['newPassword']);
        }

        unset($data['newPassword']);

        $user->update($data);

        return response()->json(['message' => 'Profil mis à jour avec succès']);
    }
}
