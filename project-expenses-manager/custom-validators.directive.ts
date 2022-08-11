import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Project } from "src/app/project";

export function existOnListValidator(
  stringList: string[],
  validatorId: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value == null) return null;
    stringList = stringList.map(string => {return string.toLowerCase()})
    let controlString = control.value.toLowerCase();

    const exist = stringList.includes(controlString);
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
    if (control.value == null || control.value == "") return null;
    return !regex.test(control.value)
      ? { passRegex: { value: control.value } }
      : null;
  };
}

export function usernameRegexValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let regex = new RegExp('^[A-Za-z][A-Za-z0-9]*$');
    return !regex.test(control.value)
      ? { usernameRegex: { value: control.value } }
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