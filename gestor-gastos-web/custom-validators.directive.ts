import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function existOnListValidator(stringList: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const exist = stringList.includes(control.value);
    return exist ? { existOnList: { value: control.value } } : null;
  };
}

export function emptyFieldValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const empty = control.value === '' || control.value === null;
    return empty ? { emptyField: { value: control.value } } : null;
  };
}
