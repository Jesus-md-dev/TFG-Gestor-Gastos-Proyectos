import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Project } from "src/app/project";

export function existOnListValidator(
  stringList: string[],
  validatorId: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const exist = stringList.includes(control.value);
    return exist ? { [validatorId]: { value: control.value } } : null;
  };
}

export function isProjectAdminValidator(project: Project): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return project.admin == control.value
      ? { isProjectAdmin: { value: control.value } }
      : null;
  };
}

export function maxDateValidator(date: Date): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return date < control.value ? { maxDate: { value: control.value } } : null;
  };
}

export function passwordRegexValidator(minLength: number): ValidatorFn {  
  return (control: AbstractControl): ValidationErrors | null => {
    let regex = new RegExp(
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{' + minLength + ',}$'
    );
    return !regex.test(control.value)
      ? { regex: { value: control.value } }
      : null;
  };
}

export function stringHasCharValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return length > control.value.length
      ? { minLength: { value: control.value } }
      : null;
  };
}

export function stringHasNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return length > control.value.length
      ? { minLength: { value: control.value } }
      : null;
  };
}