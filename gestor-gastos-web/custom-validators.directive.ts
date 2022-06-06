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
    return date < control.value  ? { maxDate: { value: control.value } } : null;
  };
}
