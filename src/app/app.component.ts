import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	statuses = ['Stable', 'Critical', 'Finished'];
	selectedStatus = 'Stable';
	signupName: FormGroup;
	forbiddenNames = ['Test1', 'Test2'];

	ngOnInit() {
		this.signupName = new FormGroup({
			'projectData': new FormGroup({
				'projectName': new FormControl(null, [Validators.required, this.forbiddenNamesValidator.bind(this)] ),
				'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmailValidator.bind(this))
			}),
			'stat': new FormControl('Stable')
		});

		this.signupName.patchValue({
			'projectData': {
				'projectName': 'ProjName',
				'email': 'test@test.com'
			}
		})
	}
	onSubmit() {
		console.log(this.signupName);
	}

	forbiddenNamesValidator(control: FormControl): {[s: string]: boolean} {
		if(this.forbiddenNames.indexOf(control.value) !== -1) {
			return {'nameIsForbidden': true}
		}
		return null;
	}

	forbiddenEmailValidator(control: FormControl) : Observable<any> | Promise<any> {
		const promise = new Promise((resolve, reject) => {
			setTimeout(() => {
				if(control.value === 'test2@test.com') {
					resolve({'emailIsInvalid': true})
				}
				else {
					resolve(null);
				}
			}, 500);
		});
		return promise;
	}
}
