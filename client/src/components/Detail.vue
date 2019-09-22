<template>
  <div class="detail">
    <div class="img">
      <img
        src="https://cdn.shopify.com/s/files/1/0067/1449/0998/products/IMG_7317_400x.jpg?v=1565780269"
        alt="product"
      />
    </div>
    <div class="text">
      <div class="close">
        <router-link to="/shop">
          <i class="far fa-times-circle fa-2x"></i>
        </router-link>
      </div>
      <div class="info-atas">
        <h3 style="font-size:18px">WOOD CAMO</h3>
        <h3 style="font-size:16px">315.000</h3>
      </div>
      <div class="line">
        <hr />
      </div>
      <div class="info-bawah">
        <h4>Color Cream Camo</h4>
        <h4>Size 31</h4>
      </div>
      <div class="btn-sold">
        <div class="qty">
          <a href="#" @click.prevent="decrement">-</a>
          <p>{{count}}</p>
          <a href="#" @click.prevent="increment">+</a>
        </div>
        <p>SOLD OUT</p>
      </div>
      <button>ADD TO CART</button>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      count: 1
    };
  },
  methods: {
    increment() {
      this.count++;
    },
    decrement() {
      if (this.count > 1) {
        this.count--;
      }
    }
  }
};
</script>

<style scoped>
button {
  width: 200px;
  height: 40px;
  background-color: black;
  color: white;
  border: none;
}
.close {
  margin-top: 10px;
  width: 20px;
  align-self: flex-end;
}
.detail {
  position: fixed;
  z-index: 5;
  background-color: white;
  left: 16vw;
  top: 78px;
  width: 60vw;
  height: 60vh;
  display: flex;
  justify-content: center;
}

.info-atas {
  margin-top: 20px;
  height: 60px;
  width: 200px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.line {
  margin-top: 20px;
  margin-bottom: 20px;
}

.info-bawah {
  text-align: left;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
}

.btn-sold {
  display: flex;
  justify-content: space-between;
  width: 300px;
  margin-bottom: 20px;
  align-items: center;
}

.qty {
  border: 1px solid black;
  width: 200px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 40px;
}

.qty a {
  text-decoration: none;
}

.img {
  height: 100%;
}

.img img {
  width: 100%;
}

.text {
  width: 25vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
}

.qty {
  display: flex;
}
</style>