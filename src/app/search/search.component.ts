import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  search(form: any) {
    console.log(form.match);
    let match: string = form.match;
    if (match && match.indexOf('/') > -1) {
      const url = form.match.split('/');
      match = url[url.length - 1];
    }
    this.router.navigate(['stats/' + match]);

  }

}
