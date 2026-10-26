/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.crud.sena.repositorio;
    
import org.springframework.data.repository.CrudRepository;
import com.crud.sena.modelo.ProductoModel;
import org.springframework.stereotype.Repository;

/*
La anotacion @Repository se encarga de indicar que esta clase sera la encargada de consultar y extraer los datos del servidor
permitiendo que la anotacion @Autowired pueda funcionar en nuestro controlador sin ningun problema
*/
/*
Despues indicarmos que la clase sera una interfaz que heredara la interfaz CrudRepository que es natica de Spring
la cual trae metodos para el funcionamiento de un CRUD completo ya programadas y listas para usar
*/
/*
Entre las flechas se le indicar el tipo de objeto que se usara o manipulara junto con el tipo de dato que sera el principal 
del modelo o de la tabla del servicio.
*/
@Repository
public interface ProductoRepository extends CrudRepository<ProductoModel, Integer>{
    
}
