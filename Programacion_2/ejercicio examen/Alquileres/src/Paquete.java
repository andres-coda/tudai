import java.util.ArrayList;

public class Paquete extends Elemento{
    private ArrayList<Elemento> elementos;    

    public Paquete(String id) {
        super(id);
        this.elementos = new ArrayList<Elemento>();
    }

    public void addElemento(Elemento elem){
        this.elementos.add(elem);
    }

    @Override
    public int getAntiguedad() {
        int mayor=0;
        for (Elemento e : elementos) {
            int nuevaAntiguedad = e.getAntiguedad();
            if( nuevaAntiguedad > mayor){
                mayor = nuevaAntiguedad;
            }
        }
        return mayor;
    }

    @Override
    public double calcularValor() {
        int suma = 0;
        for (Elemento e : elementos) {
            suma += e.calcularValor();
        }
        return suma;
    }

    @Override
    public double calcularAlquiler() {
        double suma = 0;
        for (Elemento e : elementos) {
            suma += e.calcularAlquiler();
        }
        return suma;
    }

    public ArrayList<Elemento> getElementos() {
        ArrayList<Elemento> newElemento = elementos;
        return newElemento;
    }

    public void setElementos(ArrayList<Elemento> elementos) {
        this.elementos = elementos;
    }
    
}
