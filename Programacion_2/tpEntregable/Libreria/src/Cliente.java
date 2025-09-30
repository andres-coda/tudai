
import java.util.ArrayList;

public class Cliente {
  private String dni;
  private String nombre;
  private String direccion;
  private ArrayList<String> autores;
  private ArrayList<String> generos;
  private ArrayList<Items> compras;
  private float descuento;

  public Cliente(String dni, String nombre, String direccion, float descuento) {
    this.dni = dni;
    this.nombre = nombre;
    this.direccion = direccion;
    this.descuento = descuento;
    this.autores = new ArrayList<String>();
    this.generos = new ArrayList<String>();
    this.compras = new ArrayList<Items>();
  }

  public String getDni() {
    return dni;
  }

  public void setDni(String dni) {
    this.dni = dni;
  }

  public String getNombre() {
    return nombre;
  }

  public void setNombre(String nombre) {
    this.nombre = nombre;
  }

  public String getDireccion() {
    return direccion;
  }

  public void setDireccion(String direccion) {
    this.direccion = direccion;
  }

  public ArrayList<String> getAutores() {
    ArrayList<String> newAutores = new ArrayList<>(this.autores);
    return newAutores;
  }

  public void addAutor(String autor) {
    this.autores.add(autor);
  }

  public ArrayList<String> getGeneros() {
    ArrayList<String> newGeneros = new ArrayList<>(this.generos);
    return newGeneros;
  }

  public void addGeneros(String genero) {
    this.generos.add(genero);
  }

  public ArrayList<Items> getCompras() {
    ArrayList<Items> newCompras = new ArrayList<>(this.compras);
    return newCompras;
  }

  public void addCompras(Items compra) {
    this.compras.add(compra);
  }

  public float getDescuento() {
    return this.descuento;
  }

  public boolean comproItem(Items item) {
    return this.compras.contains(item);
  }

  public boolean esFavorito(Items item) {
    return this.autores.contains(item.getAutor());
  };

  public boolean esSuperFavorito(Items item) {
    if (esFavorito(item)) {
      for (String it : item.getGeneros()) {
        if (this.generos.contains(it)) {
          return true;
        }
      }
    }
    return false;
  };

  public void setDescuento(float descuento) {
    this.descuento = descuento;
  }

}

/*
 * Del cliente se
 * guarda su nombre y apellido, dni y dirección, una lista
 * de autores favoritos y una lista de géneros que le
 * gustan. También se guarda el listado de sus compras
 * (sean libros o revistas).
 * La librería les da descuentos a sus clientes: hay clientes normales que
 * reciben un 10% de
 * descuento, clientes frecuentes que reciben un 15% de descuento y clientes
 * socios que
 * reciben un 30% de descuento.
 * 
 */