import { UseInterceptors } from "@nestjs/common";
import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

interface ClassConstructor {
new (...args: any[]): {}
}
export function Serialize(dto: ClassConstructor) {
return UseInterceptors(new SerializerInterceptor(dto))
}
export class SerializerInterceptor implements NestInterceptor {
constructor(private dto: ClassConstructor) { }
intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
return next.handle().pipe(map((data: any) => {
return plainToClass(this.dto, data, { excludeExtraneousValues: true })
})) }
}



/*import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators"

export class SerializerInterceptor implements NestInterceptor {

intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
// code qui va s'exécuter avant que la requête soit gérée par le request handler de la route
console.log("code exécuter avant handler : " , context);
return next.handle().pipe(map((data: any) => {
//exécuter code avant que la réponse soit envoyée
console.log("code exécuter avant d'envoyer la réponse : " + data);
data.status = "status modifié par l'interceptor";
data.test =" valeur ajoutée par l'interceptor";
return data;
}))
}
}*/