import java.util.ArrayList;

public class App {
  public static void main(String[] args) throws Exception {
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

    System.out.println("A juana le sale el libro 2"+ libro2.getPrecio(juana));
    System.out.println("Maria compro el libro 2"+ libro2.getPrecio(maria));
    System.out.println("A María le gusta el libro2"+ maria.esFavorito(libro2));
    System.out.println("A María le gusta mucho el libro2"+ maria.esSuperFavorito(libro2));

    
  }
}
