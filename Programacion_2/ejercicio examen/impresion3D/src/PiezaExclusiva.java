import java.util.ArrayList;

public class PiezaExclusiva extends PiezaSimple{
    private double costoExclusivo;

    public PiezaExclusiva(String nombre, String descripcion, int cantidadPla, String color, int tiempo,
            double costoExclusivo) {
        super(nombre, descripcion, cantidadPla, color, tiempo);
        this.costoExclusivo = costoExclusivo;
    }

    @Override
    public ArrayList<Pieza> busqueda(Busqueda b) {
        return new ArrayList<Pieza>();
    }

    @Override
    public double costoPieza() {
        return super.costoPieza()+ this.costoExclusivo;
    }    
}
