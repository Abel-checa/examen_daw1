const express = require('express');
const router = express.Router();
let productos = require('../productos.json')
const fs = require('fs');
const { log } = require('console');
/* GET home page. */
router.get('/products', (req, res, next)=>{
  res.json(productos)
});

router.get('/product/:id', (req, res, next)=>{
  const productFound = productos.find(p => p.id == req.params.id)
  if(productFound){
    res.json(productFound)
  }else{
    res.json({
      "msg": "product not found"
    })
  }
  
});

router.delete('/delete/:id',(req,res)=>{
  const productFound= productos.filter(p=>p.id !== parseInt(req.params.id))
  productos = productFound
  fs.writeFile('productos.json', JSON.stringify(productos), (error)=>{
    if(error)console.log(error);
  })
  console.log(productos)
  res.sendStatus(204)
  
})

router.post('/product',(req,res)=>{
  const {nombre,precio} = req.body
  const new_object = {
    id: productos.length,
    nombre: nombre,
    precio: precio
  }

  productos.push(new_object)
  fs.writeFile('productos.json', JSON.stringify(productos), (error)=>{
    if(error) res.sendStatus(404)
  })
  res.json(new_object)
  
})

router.put('/update/:id',(req,res)=>{
  const {id,nombre,precio} = req.body
  const new_object = {
    id: id,
    nombre: nombre,
    precio: precio
  }

  const productFound= productos.filter(p=>p.id !== parseInt(req.params.id))
  
  
  if(productFound){
    productFound.push(new_object)
    
    fs.writeFile('productos.json',JSON.stringify(productFound), (error)=>{
      if(error)console.log(error);
      else{
        res.json(productFound)
      }
    })
  }else{
    res.json({
      msg: "No se ha encontrado ..."
    })
  }

  // fs.writeFile('productos.json', JSON.stringify(productos), (error)=>{
  //   if(error)console.log(error);
  // })
  
})

module.exports = router;
