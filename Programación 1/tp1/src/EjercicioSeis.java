/*
 Escribir un programa que pida se ingresen datos necesarios para
emitir una factura por la compra de dos artículos de librería (tipo
factura, número, nombre cliente, producto 1, importe 1, producto 2,
importe 2, importe total). Como salida debe imprimir por pantalla la
factura en un formato similar al del siguiente ejemplo:
Factura C N 249
Nombre: Juan Perez
Producto Importe
Lápiz 15.5
Papel 20.6
Importe total 36.1
 */
public class EjercicioSeis {
    public static void main(String[] args) {
        System.out.println("Tp 1: Coda Andrés");
        
        //Declaración de variables
        char tipoFactura;
        int numero;
        String cliente, productoUno, productoDos;
        double importeUno, importeDos;
        
        //Ingreso de usuario por teclado
        System.out.println("Ingrese el tipo de factura: ");
        tipoFactura = Utils.leerChar();
        System.out.println("Ingrese el número de factura: ");
        numero = Utils.leerInt();
        System.out.println("Ingrese el nombre del cliente: ");
        cliente = Utils.leerString();
        System.out.println("Ingrese el nombre del primer producto: ");
        productoUno = Utils.leerString();
        System.out.println("Ingrese el importe del primer producto: ");
        importeUno = Utils.leerDouble();
        System.out.println("Ingrese el nombre del segundo producto: ");
        productoDos = Utils.leerString();
        System.out.println("Ingrese el importe del segundo producto: ");
        importeDos = Utils.leerDouble();
        //Ejecución de programa
        
        //Salida
        System.out.println("Factura "+tipoFactura+" N° "+numero);
        System.out.println("Cliente: "+cliente);
        System.out.println("Producto            Importe");
        System.out.println(productoUno+"       "+importeUno);
        System.out.println(productoDos+"       "+importeDos);
        System.out.println("Importe total: "+(importeUno+importeDos));    } 
}
