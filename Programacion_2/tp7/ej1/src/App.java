import java.util.ArrayList;

public class App {
  public static void main(String[] args) throws Exception {
    System.out.println("Hello, World!");
    ArrayList<Patologicos> patologicos = new ArrayList<>();
    ArrayList<Enfermedad> enfermedades = new ArrayList<>();
    ArrayList<Quimico> quimicos = new ArrayList<>();
    ArrayList<Cereal> cereales = new ArrayList<>();

    for (int i = 0; i < 10; i++) {
      Patologicos pato = new Patologicos("patologico_" + i);
      patologicos.add(pato);
    }

    for (int i = 0; i < 10; i++) {
      Enfermedad enf = new Enfermedad("enfermedad_" + i);
      for (int j = 0; j < 3; j++) {
        int numero = (int) (Math.random() * 10);
        enf.addSintomas(patologicos.get(numero));
      }
      enfermedades.add(enf);
    }

    for (int i = 0; i < 10; i++) {
      Cereal cere = new Cereal("cereal_" + i);
      for (int j = 0; j < 3; j++) {
        int numero = (int) (Math.random() * 10);
        cere.addEnfermedad(enfermedades.get(numero));
      }
      cereales.add(cere);
    }

    for (int i = 0; i < 10; i++) {
      Quimico quim = new Quimico("quimico_" + i);
      for (int j = 0; j < 3; j++) {
        int numero = (int) (Math.random() * 10);
        quim.addSintomas(patologicos.get(numero));
        quim.addCereal(cereales.get(numero));
      }
      quimicos.add(quim);
    }

    for (Cereal cereal : cereales) {
      for (Enfermedad enfermedad : cereal.getEnfermedadesFrecuentes()) {
        System.out.println("El " + cereal.getNombre() + " tiene las enfermedades frecuentes "
            + enfermedad.getNombre());
      }
      for (Quimico quimico : quimicos) {
        if (cereal.quimicoConveniente(quimico)) {
          System.out.println("El " + quimico.getNombre() + " es conveniente para " + cereal.getNombre());
        }
      }
    }
  }

}

/*
 
quimicos{
nombre
patologicos[]
cerealesdesaconsejados[]
}

patologicos{
nombre
}

enfermedad{
nombre
patologicos[]
}

cereal{
nombre
enfermedadesFrecuentes[]
}
 */