const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

//Creamos la Clase
class CategoriaService {

  constructor(){
    this.categorias = [];
    this.generate();
  }

  generate() {
    const limit = 5;
    for (let index = 0; index < limit; index++) {
      this.categorias.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(),10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean()
      });

    }
  }

  async create( data ) {
    const newCategoria = {
      id: faker.string.uuid(),
      ...data
    }
    this.categorias.push(newCategoria);
    return newCategoria
  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout( () => {
        resolve(this.categorias);
      }, 5000)
    })
  };

  async findOne( id ) {
    const categoria = this.categorias.find(item => item.id === id);
    if(!categoria) {
      throw boom.notFound('Categoria no Encontrada');
    }
    if (categoria.isBlock) {
      throw boom.conflict('Esta Categoria esta Bloqueada')
    }
    return categoria
  }

  async update(id, cambios) {
    const index = this.categorias.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Categoria no encontrada')
    }
    const categoria = this.categorias[index];
    if (categoria.isBlock) {
      throw boom.conflict('No se puede actualizar este producto por que esta bloqueado')
    }
    this.categorias[index] = {
      ...categoria,
      ...cambios
    }
    return this.categorias[index];
  }

  async delete(id) {
    const index = this.categorias.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Categoria no Encontrada');
    }
    this.categorias.splice(index, 1); //splice nos permite eliminar despues de encontrar y la cantidad que va a eliminar
    return { id };
  }

}

module.exports = CategoriaService;
