import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html',
  styleUrls: ['./home-nav.component.css']
})
export class HomeNavComponent implements OnInit {

  isCollapsed: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  showMenu() {
    if (this.isCollapsed) {
      let menu = document.getElementsByClassName("cellphone-menu")[0];
      menu.className = "cellphone-menu absolute";
      this.isCollapsed = false;
      return;
    }

    let menu = document.getElementsByClassName("cellphone-menu")[0];
    menu.className = "cellphone-menu display-none absolute";
    this.isCollapsed = true;

  }
}
