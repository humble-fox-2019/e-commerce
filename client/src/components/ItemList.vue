<template>
  <div id="itemCardBlanket" class="d-flex flex-wrap container justify-content-around">
    <b-card id="itemCard" class="text-wrap mr-3 mt-2 mb-2">
      <b-card-img
        id="itemImage"
        src="https://upload.wikimedia.org/wikipedia/id/b/b0/Persona_5_cover_art.jpg"
        height="300px"
        width="200px"
        alt="Image"
      ></b-card-img>

      <b-card-title id="itemTitle">Persona 5</b-card-title>

      <b-card-text
        id="itemCardDescription"
      >Description: Persona 5 takes place in modern-day Tokyo and follows the protagonist Joker following his transfer to Shujin Academy after being put on probation for an assault of which he was falsely accused.</b-card-text>

      <b-card-text id="itemCardPrice">Price: EUR 57.50</b-card-text>

      <!--Button Add to Cart is in special footer so it stays below no matter how long the item card is-->
      <template v-slot:footer>
        <b-button pill id="addToCartButton" href="#">Add to Cart</b-button>
        <b-button pill id="editItemButtonAdmin" href="#">Edit</b-button>
        <b-button pill id="deleteItemButtonAdmin" @click.prevent="showDeleteModal">Delete</b-button>
      </template>
    </b-card>

    <!--Example of second item-->

    <b-card id="itemCard" style="width: 20rem" class="text-wrap mr-3 mt-2 mb-2">
      <b-card-img
        id="itemImage"
        src="https://upload.wikimedia.org/wikipedia/en/f/f6/Rayman_Legends_Box_Art.jpg"
        height="300px"
        width="200px"
        alt="Image"
        style="margin-bottom: 20px"
      ></b-card-img>

      <b-card-title id="itemTitle">Rayman Legends</b-card-title>

      <b-card-text
        id="itemCardDescription"
      >Description: When Rayman, Globox, and the Teensies discover a mysterious tent filled with captivating paintings, they are suddenly transported to a series of mythical new worlds!</b-card-text>

      <b-card-text id="itemCardPrice">Price: EUR 47.20</b-card-text>

      <!--Button Add to Cart is in special footer so it stays below no matter how long the item card is-->
      <template v-slot:footer>
        <b-button pill href="#" id="addToCartButton">Add to Cart</b-button>
      </template>
    </b-card>

    <!--Example of third item-->

    <b-card id="itemCard" style="width: 20rem" class="text-wrap mr-3 mt-2 mb-2">
      <b-card-img
        id="itemImage"
        src="https://upload.wikimedia.org/wikipedia/en/d/d4/FIFA18cover.png"
        height="300px"
        width="200px"
        alt="Image"
        style="margin-bottom: 20px"
      ></b-card-img>

      <b-card-title id="itemTitle">FIFA 18</b-card-title>

      <b-card-text
        id="itemCardDescription"
      >Description: FIFA 18 is a sports game that simulates association football. The game features 52 fully licensed stadiums from 12 countries, including new stadiums, plus 30 generic fields for a total of 82. All 20 Premier League stadium are represented in the series.</b-card-text>

      <b-card-text id="itemCardPrice">Price: EUR 38.70</b-card-text>

      <!--Button Add to Cart is in special footer so it stays below no matter how long the item card is-->
      <template v-slot:footer>
        <b-button pill href="#" id="addToCartButton">Add to Cart</b-button>
      </template>
    </b-card>

    <!--Example of third item-->

    <b-card id="itemCard" style="width: 20rem" class="text-wrap mr-3 mt-2 mb-2">
      <b-card-img
        id="itemImage"
        src="https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg"
        height="300px"
        width="200px"
        alt="Image"
        style="margin-bottom: 20px"
      ></b-card-img>

      <b-card-title id="itemTitle">God of War 4</b-card-title>

      <b-card-text
        id="itemCardDescription"
      >Description: In order to teach his son how to survive in the world of Norse gods, Kratos must master the rage that has driven him for many years and embrace his newfound role as a father and a mentor.</b-card-text>

      <b-card-text id="itemCardPrice">Price: EUR 52.30</b-card-text>

      <!--Button Add to Cart is in special footer so it stays below no matter how long the item card is-->
      <template v-slot:footer>
        <b-button pill href="#" id="addToCartButton">Add to Cart</b-button>
      </template>
    </b-card>

    <!--Example of fourth item-->

    <b-card id="itemCard" style="width: 20rem" class="text-wrap mr-3 mt-2 mb-2">
      <b-card-img
        id="itemImage"
        src="https://upload.wikimedia.org/wikipedia/en/9/93/Horizon_Zero_Dawn.jpg"
        height="300px"
        width="200px"
        alt="Image"
        style="margin-bottom: 20px"
      ></b-card-img>

      <b-card-title id="itemTitle">Horizon Zero Dawn</b-card-title>

      <b-card-text
        id="itemCardDescription"
      >Description: Aloy, a hunter in a world overrun by machines, who sets out to uncover her past. The player uses ranged weapons, a spear, and stealth to combat mechanical creatures and other enemy forces.</b-card-text>

      <b-card-text id="itemCardPrice">Price: EUR 43.75</b-card-text>

      <!--Button Add to Cart is in special footer so it stays below no matter how long the item card is-->
      <template v-slot:footer>
        <b-button pill href="#" id="addToCartButton">Add to Cart</b-button>
      </template>
    </b-card>

    <!--Example of fifth item-->

    <b-card id="itemCard" style="width: 20rem" class="text-wrap mr-3 mt-2 mb-2">
      <b-card-img
        id="itemImage"
        src="https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg"
        height="300px"
        width="200px"
        alt="Image"
        style="margin-bottom: 20px"
      ></b-card-img>

      <b-card-title id="itemTitle">The Witcher 3: Wild Hunt</b-card-title>

      <b-card-text
        id="itemCardDescription"
      >Description: Geralt of Rivia, a monster hunter known as a witcher, is looking for his missing adopted daughter on the run from the Wild Hunt: an otherworldly force determined to capture and use her powers.</b-card-text>

      <b-card-text id="itemCardPrice">Price: EUR 39.50</b-card-text>

      <!--Button Add to Cart is in special footer so it stays below no matter how long the item card is-->
      <template v-slot:footer>
        <b-button pill href="#" variant="dark" id="addToCartButton">Add to Cart</b-button>
      </template>
    </b-card>
  </div>
</template>

<script>
export default {
  methods: {
    showDeleteModal() {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          if (result.value) {
            this.$swal.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            );
          }
        });
    }
  }
};
</script>

<style scoped>
#itemCard {
  width: 20rem;
  font-family: Nunito;
}

#itemImage {
  margin-bottom: 20px;
}

#addToCartButton {
  display: inline-block;
  background-image: linear-gradient(to bottom right, #09203f, #537895);
  border: none;
  box-shadow: 0px 10px 5px -5px #111;
}

#editItemButtonAdmin {
  display: inline-block;
  background-image: linear-gradient(to bottom right, #ffdd00, #fbb034);
  border: none;
  box-shadow: 0px 10px 5px -5px #111;
  color: #000000;
}

#deleteItemButtonAdmin {
  display: inline-block;
  background-image: linear-gradient(to bottom right, #ff0000, #990000);
  border: none;
  box-shadow: 0px 10px 5px -5px #111;
}
</style>