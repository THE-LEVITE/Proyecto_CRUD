/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.crud.sena.controlador;

import com.crud.sena.modelo.ProductoModel;
import com.crud.sena.repositorio.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//RestController: Permite a la clase recibir peticiones Http y devolver las respuestas todas en una misma clase sin mas anotaciones incesarias
//como lo puede ser @ResponseBody que es la que contruye la respuesta en formato json, Es una combinacioni de @Controller y @ResponseBody
//RequestMapping: Se encarga de que en la url para mandar la peticion tenga un nuevo elemento que se deba de escribir/ en un navegador o en la aplicacion POSTMAN
//si antes para listar los productos se necesitaba /productos ahora con esta anotacion se necesita anotar /api/productos
@RestController
@RequestMapping("/api")
public class ProductoControlador {
    
    
    //Este permite realizar inyeccion de dependecias de manera automatica para realizar las consultas de cada metodo en especifico
    //Sin necesitadad de contruir clases de consultas complejas o de crear objetos para manipular la infomación que llega
    //Haciendo que la API solo reciba peticiones y retorne las respuestas sin ver o manipular la informacion del servidor.
    @Autowired
    public ProductoRepository productoRepositorio;   
    
    //Metodo encargado de traer todos los productos de la base de datos.
    //Iterable indica que puede o no puede traer productos sin dar ningun error.
    @GetMapping(value = "/productos")
    public Iterable<ProductoModel> getAllProductos(){        
        return productoRepositorio.findAll(); 
    }
    
    @PostMapping(value = "/productos/create")
    public ProductoModel guardarProducto(@RequestBody ProductoModel producto){
        return productoRepositorio.save(producto);
    }
    
    @DeleteMapping(value = "/productos/delete/{id}")
    public void eliminarProducto(@PathVariable Integer id){
        productoRepositorio.deleteById(id);
    }
    
    /*
    
    */    
    @PutMapping(value = "/productos/update/{id}")
    public ProductoModel modificarProducto(
            @PathVariable Integer id,
            @RequestBody ProductoModel producto) {
        
        ProductoModel productoExistente = productoRepositorio.findById(id).orElse(null);
        
        if (productoExistente == null){
            throw new RuntimeException("No se encontro el producto con ID: " + id);
        }
        producto.setId(id);
        return productoRepositorio.save(producto);
    }
      
}
