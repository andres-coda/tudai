import java.util.ArrayList;
import java.util.Arrays;
import java.util.Random;

public class App {

    // 🔹 Genera una lista de Secciones con nombres base
    private static ArrayList<Seccion> agregarSeccion(String subnombre) {
        ArrayList<Seccion> categorias = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            String nombre = subnombre + "_" + i;
            Seccion seccion = new Seccion(nombre, "imagen_" + i);
            categorias.add(seccion);
        }
        return categorias;
    }

    // 🔹 Genera una noticia aleatoria
    private static Noticia crearNoticiaAleatoria(int i) {
        Random rand = new Random();
        ArrayList<String> palabrasClave = new ArrayList<>(Arrays.asList("politica", "deporte", "tecnologia", "arte"));
        String titulo = "Noticia_" + i;
        String introduccion = "Introducción de la noticia " + i;
        String texto = "Este es el contenido completo de la noticia número " + i + ". Tiene información variada.";
        String autor = "Autor_" + rand.nextInt(100);
        String link = "www.sitio.com/noticia" + i;

        return new Noticia(titulo, palabrasClave, introduccion, texto, autor, link);
    }

    // 🔹 Carga jerarquía de secciones con noticias
    public static void main(String[] args) {
        ArrayList<Seccion> categorias = agregarSeccion("Categoria");

        for (Seccion seccion : categorias) {
            // Cargar sub-secciones
            ArrayList<Seccion> secciones = agregarSeccion("Seccion");

            for (Seccion subSec : secciones) {
                // Cargar sub-sub-secciones
                subSec.addContenidoArray(agregarSeccion("sub-Seccion"));

                // Cargar noticias dentro de cada sub-sección
                for (int i = 0; i < 2; i++) {
                    subSec.addContenido(crearNoticiaAleatoria(i));
                }
            }

            // Agregar las secciones dentro de la sección principal
            seccion.addContenidoArray(secciones);
        }

        // ✅ Mostrar ejemplo de mapa de la primera categoría
        System.out.println("MAPA ESTRUCTURAL:");
        System.out.println(categorias.get(0).mapa());
    }
}
