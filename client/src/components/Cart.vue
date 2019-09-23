<template>
  <div class="cart">
    <div>
      <div class="head">
        <h4>CART</h4>
        <router-link to="/shop">
          <i class="far fa-times-circle fa-2x"></i>
        </router-link>
      </div>
      <div class="body">
        <div class="card" v-for="(barang, index) in products" :key="index">
          <div class="img">
            <img :src="barang.photo" alt="product" />
          </div>
          <div class="text">
            <div class="info-atas">
              <h3>{{barang.name}}</h3>
              <h4>Size {{barang.size}}</h4>
              <h3>{{barang.price}}</h3>
            </div>
            <div class="btn-sold">
              <div class="qty">
                <a href="#" @click.prevent="decrement(index)">-</a>
                <p>{{barang.qty}}</p>
                <a href="#" @click.prevent="increment(index)">+</a>
              </div>
              <a href="#" style="font-size:10px; margin-left:5px">REMOVE</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button>CHECKOUT . {{total}}</button>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      products: [
        {
          name: "WOOD CAMO",
          size: 31,
          price: 315000,
          qty: 1,
          photo:
            "https://cdn.shopify.com/s/files/1/0067/1449/0998/products/IMG_7317_400x.jpg?v=1565780269"
        },
        {
          name: "WOOD NAVY",
          size: 33,
          price: 315000,
          qty: 1,
          photo:
            "https://cdn.shopify.com/s/files/1/0067/1449/0998/products/IMG_7317_400x.jpg?v=1565780269"
        },
        {
          name: "WOOD NAVY",
          size: 33,
          price: 315000,
          qty: 1,
          photo:
            "https://cdn.shopify.com/s/files/1/0067/1449/0998/products/IMG_7317_400x.jpg?v=1565780269"
        },
        {
          name: "WOOD NAVY",
          size: 33,
          price: 315000,
          qty: 1,
          photo:
            "https://cdn.shopify.com/s/files/1/0067/1449/0998/products/IMG_7317_400x.jpg?v=1565780269"
        },
        {
          name: "WOOD NAVY",
          size: 33,
          price: 315000,
          qty: 1,
          photo:
            "https://cdn.shopify.com/s/files/1/0067/1449/0998/products/IMG_7317_400x.jpg?v=1565780269"
        },
        {
          name: "WOOD NAVY",
          size: 33,
          price: 315000,
          qty: 1,
          photo:
            "https://cdn.shopify.com/s/files/1/0067/1449/0998/products/IMG_7317_400x.jpg?v=1565780269"
        }
      ],
      total: 0
    };
  },
  methods: {
    increment(index) {
      this.products[index].qty++;
      this.getTotal();
    },
    decrement(index) {
      if (this.products[index].qty > 1) {
        this.products[index].qty--;
      }
      this.getTotal();
    },
    getTotal() {
      this.total = 0;
      this.products.forEach(el => {
        this.total += el.price * el.qty;
      });
    }
  },
  created() {
    this.products.forEach(el => {
      this.total += el.price * el.qty;
    });
  }
};
</script>

<style scoped>
.body {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 75vh;
}
.cart {
  position: fixed;
  top: 78px;
  background-color: #fff;
  right: 0;
  width: 350px;
  height: 90vh;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

button {
  background-color: black;
  border: none;
  color: #fff;
  align-self: center;
  margin-bottom: 10px;
  width: 80%;
  height: 40px;
}

.head {
  display: flex;
  justify-content: space-between;
  padding: 5px 20px;
  width: 100%;
  height: 50px;
  align-items: center;
}

.card {
  margin-top: 5px;
  background-color: #efefef;
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.info-atas {
  margin-top: 10px;
  width: 200px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.info-atas h3,
.info-atas h4 {
  font-size: 14px;
  margin-bottom: 10px;
}

.btn-sold {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  width: 100px;
  margin-bottom: 20px;
  align-items: center;
}

.qty {
  border: 1px solid black;
  width: 120px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 20px;
}

.qty a {
  text-decoration: none;
}

.img {
  width: 150px;
}

.img img {
  width: 100%;
}

.text {
  padding-top: 10px;
  width: 100px;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
}

.qty {
  display: flex;
}
</style>