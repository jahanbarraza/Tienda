

const {faker} = require('@faker-js/faker');
const boom = require('@hapi/boom')

class ProductsService {

  constructor(){
    this.productos = [];
    this.generate();
  }

  generate() {
    const limit = 5;
    for (let index = 0; index < limit; index++) {
      this.productos.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(),10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean()
      });

    }
  }

  async create(data) {
    const newProducto = {
      id: faker.string.uuid(),
      ...data
    }
    this.productos.push(newProducto);
    return newProducto;
  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.productos);
      }, 5000)
    })
  }

  async findOne(id) {
   const producto = this.productos.find(item => item.id === id);
   if(!producto){
    throw boom.notFound('Producto no encontrado')
   }
   if (producto.isBlock){
    throw boom.conflict('Este producto esta Bloqueado')
   }
   return producto
  }

  async update(id, cambios) {
    const index = this.productos.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound("Producto no Encontrado");
    }
    const producto = this.productos[index];
    if (producto.isBlock){
      throw boom.conflict('No se puede Actualizar este producto por que esta Bloqueado')
    }
    this.productos[index] = {
      ...producto,
      ...cambios
    }
    return this.productos[index];
  }

  async delete(id) {
    const index = this.productos.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound("Producto no Encontrado");
    }
    this.productos.splice(index, 1); //splice nos permite eliminar despues de encontrarlo y la cantidad que va a eliminar
    return { id };
  }



}

module.exports = ProductsService;
