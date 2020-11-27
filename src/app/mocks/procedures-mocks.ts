import { respData } from '../models/complaint-model';
import { ListProcedures, ObjProcedures } from '../models/procedures';

export const DATAPROCEDURES:ListProcedures[] = [
    {id:1,name:'CIRCULARES Y OFICIOS'},
    {id:2,name:'OTRAS DISPOSICIONES'},
    {id:3,name:'POLITICAS '},
    {id:4,name:'EVALUACION MENSUAL A LAS DELEGACIONES'},
    {id:5,name:'MANUAL DE PROCEDIMIENTOS DE LAS DELEGACIONES ESTATALES'},
    {id:6,name:'DEPARTAMENTO DE SEGUIMIENTO Y EVALUACION '},
    {id:7,name:'DIRECCION GENERAL DE DELEGACIONES'},
    {id:8,name:'EVALUACION MENSUAL A LAS DELEGACIONES'},
];
/*
export const DATACOMPLAINTRESP:respData = {
    id:1,
    idUsusario:55,
    descripcionProblema:'Aqui va el problema',
    tipoAyuda:'Que ayuda necesita',
    fechaSolicitud:'2020-11-28',
    denunciado:{
        id:1,
        idDenuncia:18954,
        nombres:'Jose Alberto',
        apellidoMaterno:'Celaya',
        apellidoPaterno:'Vargas',
        parentesco:'Desconocido',
        edad:28,
        ocupacion:'Desarrollador',
        domicilio:'Ixtapaluca Edo de Mexico',
        codigoPostal:'56577',
        tipoViolencia:'Creacion de SPA'
    },
    solicitante:{
        id:15,
        idDenuncia:18954,
        nombres:'Enrique',
        apellidoPaterno:'Pena',
        apellidoMaterno:'Nieto',
        genero:'Masculino',
        edad:50,
        telefono:'55-20-89-45-87',
        lugarNacimiento:'Quien sabe donde',
        domicilio:'Los pinos sn numero',
        codigoPostal:'78441',
        escolaridad:'Primaria',
        edoCivil:'Divorciado',
        ocupacion:'Ex-Presidente'
    }
}

export const OBJPROCEDURE:ObjProcedures = {
    id:1,
    titulo:'CIRCULARES Y OFICIOS',
    parrafos:[
        {
            subtitulo:'Como Levantar una queja',
            texto:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
        },
        {
            subtitulo:'Donde Levantar una queja',
            texto:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
        },
    ]
}*/