Vue.component('productDetails', {
  props: {
    details: {
      type: Object,
      required: true,
    }
  },
  template: `
    <div>
      <ul>
        <li v-for="detail in details">{{ detail }}</li>
      </ul>
    </div>
  `,
})

Vue.component('product', {
props: {
  premium: {
    type: Boolean,
    required: true,
  }
},
  template: `
    <div class="product">
      <div class="product-image">
        <img :src="image" >
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inStock">In Stock</p>
        <p class="disabledLabel" v-else>Out of Stock</p>
        <p>Shipping: {{ shipping }}</p>
        <productDetails :details="details" />
        <div
          v-for="variant in variants"
          :key="variant.variantId"
          class="color-box"
          :style="{ backgroundColor: variant.variantColor }"
          @mouseover="updateProduct(variant.variantImage)"
        >
        </div>

        <button 
          v-on:click="addToCart"
          :disabled="!inStock"
          :class="{ disabledButton: !inStock }"
        >
          Add to Cart
        </button>
        <button v-on:click="removeFromCart">Remove</button>
        <div class="cart">
          <p>cart ({{cart}})</p>
        </div>

      </div>
    </div>
  `,
  data() {
    return {
      brand: 'Vue Mastery',
      product: 'Socks',
      onSale: false,
      image: './assets/vmSocks-green-onWhite.jpg',
      inStock: true,
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      variants: [
        {
          variantId: 2234,
          variantColor: 'green',
          variantImage: './assets/vmSocks-green-onWhite.jpg',
        },
        {
          variantId: 2235,
          variantColor: 'blue',
          variantImage: './assets/vmSocks-blue-onWhite.jpg',
        },
      ],
      cart: 0,
    }
  }, 
  methods: {
    addToCart() {
      this.cart += 1;
    },
    updateProduct(variantImage) {
      this.image = variantImage;
    },
    removeFromCart() {
      if (this.cart > 0) {
        this.cart -= 1;
      }
    },
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product
    },
    shipping() {
      if (this.premium) {
        return "Free"
      }
      return 2.99
    }
  },
})

var app = new Vue({
  el: '#app',
  data: {
    premium: false,
  },
})