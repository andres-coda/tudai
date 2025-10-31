import java.util.ArrayList;

public class Paquete extends Elementos{
    private ArrayList<Elementos> elementos;    

    public Paquete(String id) {
        super(id);
        this.elementos = new ArrayList<Elementos>();
    }

    public void addElemento(Elementos elem){
        this.elementos.add(elem);
    }

    @Override
    public int calcularAntiguedad() {
        int suma=0;
        for (Elementos e : elementos) {
            int nuevaAntiguedad = e.calcularAntiguedad();
            if( nuevaAntiguedad > suma){
                suma = nuevaAntiguedad;
            }
        }
        return suma;
    }

    @Override
    public double calcularValor() {
        int suma = 0;
        for (Elementos e : elementos) {
            suma += e.calcularValor();
        }
        return suma;
    }
    
}
