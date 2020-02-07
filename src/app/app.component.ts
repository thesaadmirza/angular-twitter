import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
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
  reg = "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?";
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
      content: ["", Validators.required],
      url: ["", [Validators.required, Validators.pattern(this.reg)]],
      rating: [this.currentRate]
    });
  }

  onSubmit() {
    this.AngForm.value.rating = this.currentRate;
    console.log("Your form data : ", this.AngForm);
    this.http.post("urlHere", this.AngForm.value).subscribe(responseData => {
      console.log(responseData);
      //redirect or whatever
    });
  }
}
