import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HelperService } from './helper.service';



describe('Testing Helper Service', () => {

  let helperService: HelperService;
  let formBuilder: FormBuilder;
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [FormBuilder, HelperService]
    });

    formBuilder = TestBed.get(FormBuilder);
    helperService = TestBed.get(HelperService);

    form = formBuilder.group({
      name: '',
      email: '',
      passwords: formBuilder.array([formBuilder.group({
        password: ['', [Validators.minLength(6)]],
        confirmPassword: ''
      })])
    });
  });


  it('should mark all form fields as touched', () => {
    helperService.markFormGroupTouched(form);
    expect(form.touched).toBeTruthy();
  });
});
