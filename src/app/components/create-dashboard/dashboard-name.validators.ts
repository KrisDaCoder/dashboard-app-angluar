import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class DashboardNameValidators {

    static nameIsTaken( data: string[]): ValidatorFn {

        return(control: AbstractControl) : ValidationErrors | null => {

            if (data.includes(control.value as string)) {
                return {
                    nameIsTaken: true
                }
            }
    
            return null;

        }

    }

}