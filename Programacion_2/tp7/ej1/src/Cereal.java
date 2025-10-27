import java.util.ArrayList;

public class Cereal extends Nombre{
    private ArrayList<Enfermedad> enfermedadesFrecuentes;

    public Cereal(String nombre){
        super(nombre);
        this.enfermedadesFrecuentes = new ArrayList<Enfermedad>();
    }

    public ArrayList<Enfermedad> getEnfermedadesFrecuentes() {
        ArrayList<Enfermedad> newEnfermedad = this.enfermedadesFrecuentes;
        return newEnfermedad;
    }

    public void setEnfermedadesFrecuentes(ArrayList<Enfermedad> enfermedadesFrecuentes) {
        this.enfermedadesFrecuentes = enfermedadesFrecuentes;
    }

    public void addEnfermedad(Enfermedad enfermedad){
        if(!this.enfermedadesFrecuentes.contains(enfermedad)){
            this.enfermedadesFrecuentes.add(enfermedad);
        }
    }

    public boolean quimicoConveniente(Quimico quimico){
        if(quimico.getCerealDesaconsejado().contains(this))return false;
        for (Enfermedad enfermedad : enfermedadesFrecuentes) {
           if(enfermedad.enfermedadTratada(quimico)) return true;
        }
        return false;
    }
}
