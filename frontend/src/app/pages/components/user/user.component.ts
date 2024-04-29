import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  index = 0
  users: any[] | undefined;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsersData();
  }

  getUsersData() {
    this.userService.getUsers().subscribe(
      (res:any) => {
        this.users = res;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  roleUpdate(id:any){
    this.userService.roleUpdate(id).subscribe((res=>{
      this.getUsersData()
    }))
  }

}
