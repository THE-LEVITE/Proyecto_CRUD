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


@RestController
@RequestMapping("/api")
public class ProductoControlador {
    
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
