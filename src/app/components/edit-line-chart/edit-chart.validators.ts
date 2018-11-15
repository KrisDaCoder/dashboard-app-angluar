import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class EditChartValidators {

    static validateColor(control: AbstractControl) : ValidationErrors | null {
        // const patternHex = /#[0-9a-f]{6}|#[0-9a-f]{3}/gi;
        // const patternRgb = /[R][G][B][A]?[(]([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])[)]/i;
        const fullColorsPattern = /(#([\da-f]{3}){1,2}|(rgb|hsl)a\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|(rgb|hsl)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/ig;

        if(fullColorsPattern.test(control.value as string) === false) {
            return {
                validateColor: true
            }
        }

        return null;
    }

}