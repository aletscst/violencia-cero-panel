export interface markersMap {
    id:number;
    descripcion: String;
    direccion: String;
    nombre: String;
    lat: number;
    long: number;
}
export interface MarkersList{
    status:String;
    data:markersMap[];
}
export interface addMarker{
    nombre:String;
    descripcion:String;
    direccion:String;
    lat:number;
    long:number;
}
export interface respStatus{
    estatus: any;
    id:number;
    status:boolean;
}
