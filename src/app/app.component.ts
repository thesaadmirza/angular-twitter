import { Component } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [NgbRatingConfig]
})
export class AppComponent {
  title = "AngularForm";
  currentRate = 0;
  AngForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    config: NgbRatingConfig
  ) {
    // customize default values of rating
    config.max = 5;
    this.createContactForm();
  }
  createContactForm() {
    this.AngForm = this.formBuilder.group({
      content: [""],
      url: [""],
      rating: [this.currentRate]
    });
  }

  onSubmit() {
    this.AngForm.value.rating = this.currentRate;
    this.http.post("urlHere", this.AngForm.value).subscribe(responseData => {
      console.log(responseData);
      //redirect or whatever
    });
    console.log("Your form data : ", this.AngForm.value);
  }
}
