public class App {
    public static void main(String[] args) throws Exception {
        System.out.println("Hello, World!");
    }
}


/*

Elementos abstractos{
    id

    
    metodo valor = valor sumatoria valor elementos
    antiguedad = antiguedad mayor de sus elementos
}

ElementosAlquiler extends Elementos{
    valor
    antiguedad en meses
    descripcion
}
 
Computadoras extends ElementosAlquiler{
    calcular monto de alquiler
}

Escritorios{
    calcular monto de alquiler
}

Ipresora{
    calcular monto de alquiler
}

elementoEnvejecimiento extends Elementos{
    id
    antiguedad obsoleta
    Paquete elementos[]

    metodo valor cambia segun fecha
}

paquete extends Elementos{
    id
    elementos[]

    metodo valor = valor sumatoria valor elementos
    antiguedad = antiguedad mayor de sus elementos
}

Clientes{
    nombre
    apellido
    dni
    elmentos alquilados[] sin repetidos
}

imprime listado de clientes ordenados por criterios (
    elementos alquilados demayor a menor
    alfabetico apellido
    dni
)
 */