<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index(){
        $users = User::select('id','username', 'adresse', 'tel', 'email', 'role')->get();
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
}
