import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl:'./header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  profile: any = {};
  editing: boolean = false;
  newPassword: string = '';
  confirmNewPassword: string = '';

  titre='Gestion de vente enlige'
  UserProfile!: User;
  constructor(public authService: AuthService,private router :Router) {
    this.authService.profileUser().subscribe((data: any) => {
      this.UserProfile = data;
    });
  }

  editProfile() {
    this.editing = true;
  }

  updateProfile() {
     // Vérifie si les nouveaux mots de passe correspondent
     if (this.newPassword !== this.confirmNewPassword) {
      console.error("Les nouveaux mots de passe ne correspondent pas");
      return;
    }

    // Met à jour le profil avec les nouvelles informations, y compris le mot de passe
    this.profile.newPassword = this.newPassword;
    this.authService.updateProfile(this.UserProfile).subscribe((data: any) => {
      console.log('Profil mis à jour avec succès');
      this.editing = false;
    }, (error: any) => {
      console.error('Erreur lors de la mise à jour du profil', error);
    });
  }

  cancelEdit() {
    this.editing = false;
    
  }

goToHome() {
    localStorage.clear()
    this.router.navigate(['']);

}


}
