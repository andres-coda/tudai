public class Enfermedad extends Causas{
    public Enfermedad(String nombre){
        super(nombre);
    }

    public boolean enfermedadTratada(Quimico quimico){
        for(Patologicos sint : this.getSintomas()){
            if(!quimico.getSintomas().contains(sint)) return false;
        }
        return true;
    }

}
