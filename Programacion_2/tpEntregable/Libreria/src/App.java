import java.util.ArrayList;

public class App {
  public static void main(String[] args) throws Exception {
    Libreria libreria = new Libreria();

    ArrayList<String> generos = new ArrayList<>();

    for (int i = 0; i < 10; i++) {
      generos.add("Genero " + i);
    }

    Items libro = new Libro("libro 1", 15, "autor 1", "52", "Resulta que...", generos);
    Items libro2 = new Libro("libro 2",15, "autor 1", "52", "Resulta que...", generos);    
    
    Items libro3 = new Libro("libro 3", 15, "autor 2", "52", "Resulta que...", generos);
    Items libro4 = new Libro("libro 4", 15, "autor 2", "52", "Resulta que...", generos);
    Items revista = new Libro("revista 1", 15, "autor 1", "52", "Resulta que...", generos);
    Items revista2 = new Libro("revista 2", 15, "autor 1", "52", "Resulta que...", generos);

    Items revista3 = new Libro("revista 3", 15, "autor 2", "52", "Resulta que...", generos);

    Items revista4 = new Libro("revista 4", 15, "autor 2", "52", "Resulta que...", generos);

    Cliente juana = new Cliente("1251215", "Juana", "Las hiedras 215", 0.15F);
    Cliente marcos = new Cliente("1254215", "Marcos", "Los Sauses 215", 0.1F);
    Cliente maria = new Cliente("1251315", "María", "Las hiedras verdes 215", 0.3F);

    libreria.addInventario(libro);
    libreria.addInventario(libro2);
    libreria.addInventario(libro3);
    libreria.addInventario(libro4);
    libreria.addInventario(revista);
    libreria.addInventario(revista2);
    libreria.addInventario(revista3);
    libreria.addInventario(revista4);

    libreria.addClientes(juana);
    libreria.addClientes(marcos);
    libreria.addClientes(maria);

    maria.addAutor("autor 1");

    maria.addGeneros(generos.get(0));
    maria.addCompras(libro);

    System.out.println("El libro2 le sale a Juana $"+ libro2.getPrecio(juana));
    System.out.println("El libro2 le sale a Marcos $"+ libro2.getPrecio(marcos));
    System.out.println("El libro2 le sale a Maria $"+ libro2.getPrecio(maria));

    if (maria.comproItem(libro2)) {
      System.out.println("Maria compro el libro 2") ;
    } else {
      System.out.println("Maria no compro el libro 2") ;
    }
    if (maria.esFavorito(libro2)) {
      System.out.println("A María le gusta el libro2, porque le gusta el autor");
    } else {      
      System.out.println("A María no le gusta el libro2, porque el autor no le gusta o lo desconoce");
    }

    if (maria.esSuperFavorito(libro2)) {
      System.out.println("A María le encanta el libro2, porque le gusta el autor, y uno de sus generos");
    } else {
      System.out.println("A María no le gusta el libro2, porque no le gusta el autor, o no le gustan los generos del libro");
    }

    marcos.addAutor("autor 1");

    ArrayList<Cliente> clientesGustosos = libreria.clientesGustosos(libro);

    for(Cliente cliente : clientesGustosos){
      System.out.println("Al cliente "+cliente.getNombre()+" le gusta el libro "+libro.getNombre());
    }



    
  }
}
