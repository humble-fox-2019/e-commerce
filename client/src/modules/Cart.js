export default {
    state: {
        cart: [],
        productId: "",
        quantity: null
    },
    mutations: {
        refreshCart(state, payload, rootState) {
            state.cart = []
            payload.forEach(el => state.card.push(el))
        }
    },
    actions: {
        addCart({ state, commit, rootState }) {
            axios.post(localhost + '/carts', {
                data: {
                    productId: state.productId,
                    quantity: state.quantity
                }
            })
                .then(({ data }) => {
                    console.log(data);
                    commit('refreshCart', data)
                }).catch((err) => {
                    console.log(err)
                });
        },
        getCart({ commit }) {
            axios.get(localhost + '/carts')
                .then(({ data }) => {
                    commit('refreshCart', data)
                }).catch(err => {
                    console.log(err);
                });
        },
        modifyCart({ commit }) {
            axios.put(localhost + '/carts')
                .then(({ data }) => {
                    commit('refreshCart', data)
                }).catch(err => console.log(err));
        },
        deleteCart() {
            axios.delete(localhost + '/carts')
                .then(({ data }) => console.log(data))
                .catch(err => console.log(err))
        }
    },
    getters: {}
}