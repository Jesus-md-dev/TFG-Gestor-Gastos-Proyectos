import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function existOnListValidator(stringList: string[],
    validatorId: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const exist = stringList.includes(control.value);
    return exist ? { [validatorId]: { value: control.value } } : null;
  };
}
