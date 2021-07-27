import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsuarioService } from "./usuario.service";
@Injectable()
@ValidatorConstraint({ async: true })
export class IsNomeDeUsuarioUnicoConstraint implements ValidatorConstraintInterface {
    constructor(private UsuarioService: UsuarioService) {}
    validate(nomeDeUsuario: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        return !!!this.UsuarioService.buscaPorNomeDeUsuario(nomeDeUsuario)
    }
}


export function IsNomeDeUsuarioUnico(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsNomeDeUsuarioUnicoConstraint,
        });
    };
  }