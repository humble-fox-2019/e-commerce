const host = process.env.VUE_APP_SERVER_URL

export default {
    state: {
        admin: true,
        login: true,
        username: "tigor",
        userEmail: "tigor.hutasuhut@gmail.com",
        form: {
            username: "",
            email: "",
            password: ""
        }
    },
    mutations: {
        logout(state) {
            state.admin = false;
            state.login = false;
            state.cart = []
        },
        login(state, payload) {
            payload.role === 'Admin' ? state.admin = true : state.admin = false;
            state.login = true;
            state.username = payload.username;
            state.userEmail = payload.email;
        }
    },
    actions: {
        register({ state, commit }) {
            axios.post('/users/', {
                data: {
                    username: state.form.username,
                    email: state.form.email,
                    password: state.form.password
                }
            }).then((newUser) => {
                localStorage.setItem('token', newUser.token)
                localStorage.setItem('username', newUser.username)
                localStorage.setItem('email', newUser.email)
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    getters: {
        gravatar() {
            const base = 'https://www.gravatar.com/avatar/'
            const hash = md5(store.state.userEmail)
            return base + hash
        }
    }

}