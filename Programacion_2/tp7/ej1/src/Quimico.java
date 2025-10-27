import java.util.ArrayList;

public class Quimico extends Causas {
    private ArrayList<Cereal> cerealDesaconsejado;

    public Quimico(String nombre){
        super(nombre);
        this.cerealDesaconsejado = new ArrayList<Cereal>();
    }

    public void addCereal(Cereal cereal){
        if (!this.getCerealDesaconsejado().contains(cereal)){
            this.cerealDesaconsejado.add(cereal);
        }
    }

    public ArrayList<Cereal> getCerealDesaconsejado() {
        ArrayList<Cereal> newCereales = this.cerealDesaconsejado;
        return newCereales;
    }

    public void setCerealDesaconsejado(ArrayList<Cereal> cerealDesaconsejado) {
        this.cerealDesaconsejado = cerealDesaconsejado;
    }
    
}
